from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.parsers import BaseParser
import json

from .models import Product, Cart, CartItem, Transaction
from .serializers import (
    CartSerializer,
    ProductSerializer,
    DetailedProductSerializer,
    CartItemSerializer,
    SimpleCartSerializer,
    UserSerializer,
    RegistrationSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from decimal import Decimal
import uuid
import requests

BASE_URL = "http://localhost:5173"


class JSONTextParser(BaseParser):
    """Parser that accepts text/plain and attempts to parse JSON from it."""
    media_type = 'text/plain'

    def parse(self, stream, media_type=None, parser_context=None):
        raw = stream.read().decode('utf-8')
        try:
            return json.loads(raw)
        except Exception:
            return {"text": raw}


@api_view(["GET"])
def home(request):
    return Response({"message": "Welcome to SHOPPIT API", "status": "running"})


# ------------------ PRODUCTS ------------------

@api_view(["GET"])
@permission_classes([AllowAny])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def product_detail(request, slug):
    product = get_object_or_404(
        Product.objects.select_related("dimensions", "meta")
        .prefetch_related("reviews"),
        slug=slug
    )
    similar_products = Product.objects.filter(
        category=product.category
    ).exclude(id=product.id)[:10]

    serializer = DetailedProductSerializer(
        product,
        context={"similar_products": similar_products, "request": request}
    )
    return Response(serializer.data, status=status.HTTP_200_OK)


# ------------------ CART ------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def add_item(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)

    if not cart_code or not product_id:
        return Response({"error": "cart_code and product_id are required"}, status=400)

    try:
        quantity = int(quantity)
        if quantity < 1:
            return Response({"error": "quantity must be at least 1"}, status=400)
    except:
        return Response({"error": "quantity must be a number"}, status=400)

    cart, _ = Cart.objects.get_or_create(cart_code=cart_code)
    product = get_object_or_404(Product, id=product_id)
    cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)

    cartitem.quantity = cartitem.quantity + quantity if not created else quantity
    cartitem.save()

    serializer = CartItemSerializer(cartitem)
    return Response({"message": "Item added to cart successfully", "cart_item": serializer.data}, status=201)


@api_view(["GET"])
@permission_classes([AllowAny])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    if not cart_code or not product_id:
        return Response({"error": "cart_code and product_id are required"}, status=400)

    try:
        cart = Cart.objects.get(cart_code=cart_code)
    except Cart.DoesNotExist:
        return Response({"product_in_cart": False})

    exists = CartItem.objects.filter(cart=cart, product_id=product_id).exists()
    return Response({"product_in_cart": exists})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['PATCH'])
def update_quantity(request):
    cartitem_id = request.data.get("item_id")
    quantity = request.data.get("quantity")

    if not cartitem_id or quantity is None:
        return Response({"error": "item_id and quantity are required"}, status=400)

    try:
        quantity = int(quantity)
        cartitem = CartItem.objects.get(id=cartitem_id)

        if quantity <= 0:
            cartitem.delete()
            return Response({"message": "Item removed from cart successfully!"})

        cartitem.quantity = quantity
        cartitem.save()
        serializer = CartItemSerializer(cartitem)
        return Response({"data": serializer.data, "message": "Cart item updated successfully!"})

    except CartItem.DoesNotExist:
        return Response({"error": "CartItem not found"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
def import_products(request):
    items = request.data.get('products', [])
    results = []

    for item in items:
        serializer = ProductSerializer(data=item)
        if serializer.is_valid():
            serializer.save()
            results.append({"name": item.get("title"), "status": "imported"})
        else:
            results.append({"name": item.get("title"), "errors": serializer.errors})

    return Response(results)


# ------------------ USER ------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    return Response({"username": request.user.username})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = get_user_model().USERNAME_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["username"] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({"user": UserSerializer(self.user).data})
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# ------------------ PAYMENTS ------------------

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    tx_ref = str(uuid.uuid4())
    cart_code = request.data.get("cart_code")
    if not cart_code:
        return Response({"error": "cart_code is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart = Cart.objects.get(cart_code=cart_code, paid=False)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found or already paid"}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    amount = sum((item.quantity * item.product.price for item in cart.items.all()), Decimal("0.00"))
    tax = Decimal("15.00")
    total_amount = amount + tax
    currency = "ETB"
    redirect_url = f"{BASE_URL}/payment_status/"

    transaction = Transaction.objects.create(
        ref=tx_ref,
        cart=cart,
        amount=total_amount,
        currency=currency,
        user=user,
        status='pending'
    )

    flutterwave_payload = {
        "tx_ref": tx_ref,
        "amount": str(total_amount),
        "currency": currency,
        "redirect_url": redirect_url,
        "customer": {
            "email": getattr(user, "email", ""),
            "name": getattr(user, "username", ""),
            "phonenumber": getattr(user, "phone", "")
        },
        "customizations": {"title": "Shoppit Payment"},
    }

    headers = {
        "Authorization": f"Bearer {settings.FLUTTERWAVE_SECRET_KEY}",
        "Content-Type": "application/json",
    }

    try:
        resp = requests.post("https://api.flutterwave.com/v3/payments", json=flutterwave_payload, headers=headers, timeout=10)
        resp.raise_for_status()
    except requests.exceptions.RequestException as e:
        transaction.status = "failed"
        transaction.save()
        return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

    return Response({"tx_ref": tx_ref, "flutterwave": resp.json()}, status=resp.status_code)


@api_view(["GET", "POST"])
def payment_callback(request):
    status_param = request.GET.get("status") or request.data.get("status")
    tx_ref = request.GET.get("tx_ref") or request.data.get("tx_ref")
    transaction_id = request.GET.get("transaction_id") or request.data.get("transaction_id")

    if not tx_ref or not transaction_id:
        return Response({"error": "tx_ref and transaction_id are required"}, status=status.HTTP_400_BAD_REQUEST)

    if status_param != "successful":
        return Response({"message": "payment was not successful"}, status=status.HTTP_400_BAD_REQUEST)

    headers = {"Authorization": f"Bearer {settings.FLUTTERWAVE_SECRET_KEY}"}

    try:
        resp = requests.get(f"https://api.flutterwave.com/v3/transactions/{transaction_id}/verify", headers=headers, timeout=10)
        resp.raise_for_status()
    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

    resp_data = resp.json()
    if resp_data.get("status") != "success":
        return Response({"message": "failed to verify with flutterwave", "response": resp_data}, status=status.HTTP_400_BAD_REQUEST)

    try:
        transaction = Transaction.objects.get(ref=tx_ref)
    except Transaction.DoesNotExist:
        return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

    data = resp_data.get("data", {})
    try:
        amount_received = Decimal(str(data.get("amount")))
    except Exception:
        amount_received = None

    if data.get("status") == "successful" and amount_received == transaction.amount and data.get("currency") == transaction.currency:
        transaction.status = "successful"
        transaction.save()

        cart = transaction.cart
        cart.paid = True
        if not cart.user and transaction.user:
            cart.user = transaction.user
        cart.save()

        return Response({"message": "payment successful", "subMessage": "You have successfully made payment for your cart items."}, status=status.HTTP_200_OK)

    return Response({"message": "payment verification failed", "details": data}, status=status.HTTP_400_BAD_REQUEST)
