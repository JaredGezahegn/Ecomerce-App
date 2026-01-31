from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Cart, CartItem
from .serializers import (
    CartSerializer,
    ProductSerializer,
    DetailedProductSerializer,
    CartItemSerializer,
    SimpleCartSerializer,
    UserSerializer
)



def home(request):
  return render(request, 'home.html')


@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
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
        context={
            "similar_products": similar_products,
            "request": request
        }
    )

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def add_item(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)
   
   
    print("REQUEST DATA:", request.data)

    if not cart_code or not product_id:
        return Response(
            {"error": "cart_code and product_id are required"},
            status=400
        )

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

    return Response(
        {"message": "Item added to cart successfully", "cart_item": serializer.data},
        status=201
    )


@api_view(["GET"])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    if not cart_code or not product_id:
        return Response(
            {"error": "cart_code and product_id are required"},
            status=400
        )

    try:
        cart = Cart.objects.get(cart_code=cart_code)
    except Cart.DoesNotExist:
        return Response({"product_in_cart": False})

    exists = CartItem.objects.filter(
        cart=cart,
        product_id=product_id
    ).exists()

    return Response({"product_in_cart": exists})

@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = get_object_or_404(Cart, cart_code=cart_code, paid=False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)

@api_view(['GET'])
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
        if quantity < 1:
            return Response({"error": "quantity must be at least 1"}, status=400)
    except:
        return Response({"error": "quantity must be a number"}, status=400)

    try:
        cartitem = CartItem.objects.get(id=cartitem_id)
    except CartItem.DoesNotExist:
        return Response({"error": "CartItem not found"}, status=404)

    cartitem.quantity = quantity
    cartitem.save()

    serializer = CartItemSerializer(cartitem)
    return Response({"data": serializer.data, "message": "Cart item updated successfully!"})


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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    return Response({"username": request.user.username})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)




'''from django.shortcuts import render
#from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Product,Cart,CartItem
from .serializers import CartSerializer,ProductSerializer,DetailedProductSerializer, CartItemSerializer, SimpleCartSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


# Create your views here.
def home(request):
    return render(request, 'home.html')

#def home(request):
    #return HttpResponse("Welcome to Shoppit!")

@api_view(["GET"])
def products(request):
    products= Product.objects.all()
    serializers= ProductSerializer(products, many=True)
    return Response(serializers.data)
@api_view(["GET"])
def product_detail(request, slug):
    product = get_object_or_404(
        Product.objects.select_related("dimensions", "meta").prefetch_related("reviews"),
        slug=slug
    )

   
    similar_products = Product.objects.filter(
        category=product.category
    ).exclude(id=product.id)[:10]
 

    
    serializer = DetailedProductSerializer(
        product,
        context={
            "similar_products": similar_products,
            "request": request
        }
    )

    return Response(serializer.data, status=status.HTTP_200_OK)

 
@api_view(["POST"])
def add_item(request):
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)  

    
    if not cart_code or not product_id:
        return Response(
            {"error": "cart_code and product_id are required"},
            status=400
        )

 
    try:
        quantity = int(quantity)
        if quantity < 1:
            return Response({"error": "quantity must be at least 1"}, status=400)
    except:
        return Response({"error": "quantity must be a number"}, status=400)

    
    cart, _ = Cart.objects.get_or_create(cart_code=cart_code)
    product = get_object_or_404(Product, id=product_id)

  
    cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        cartitem.quantity += quantity
    else:
        cartitem.quantity = quantity

    cartitem.save()

    serializer = CartItemSerializer(cartitem)
    return Response(
        {
            "message": "Item added to cart successfully",
            "cart_item": serializer.data
        },
        status=201
    )

   
   
   
@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    if not cart_code or not product_id:
        return Response(
            {"error": "cart_code and product_id are required"},
            status=400
        )

    cart = get_object_or_404(Cart, cart_code=cart_code)
    product = get_object_or_404(Product, id=product_id)

    product_exists_in_cart = CartItem.objects.filter(
        cart=cart,
        product=product
    ).exists()

    return Response({"product_in_cart": product_exists_in_cart})
@api_view(['GET'])
def get_cart_stat(request):
     cart_code=request.query_params.get("cart_code")
     cart=Cart.objects.get(cart_code=cart_code, paid=False)
     serializer= SimpleCartSerializer(cart)
     return Response(serializer.data)
@api_view(['GET'])
def get_cart(request):
     cart_code=request.query_params.get("cart_code")
     cart=Cart.objects.get(cart_code=cart_code, paid=False)
     serializer=CartSerializer(cart)
     return Response(serializer.data)
@api_view(['PATCH'])
def update_quantity(request):
    try:
          cartitem_id= request.data.get("item_id")
          quantity = request.data.get("quantity")
          quantity=int(quantity)
          
          if quantity <= 0:
              # Remove item if quantity is 0 or less
              cartitem = CartItem.objects.get(id=cartitem_id)
              cartitem.delete()
              return Response({"message": "Item removed from cart successfully!"})
          
          cartitem= CartItem.objects.get(id=cartitem_id)
          cartitem.quantity=quantity
          cartitem.save()
          serializer = CartItemSerializer(cartitem)
          return Response({"data":serializer.data, "message": "Cartitem updated successfully!"})
    except Exception as e:
         return Response({'error':str(e)}, status=400)

@api_view(['POST'])
def import_products(request):
    from .serializers import DetailedProductSerializer

    products = request.data.get('products', [])
    results = []

    for item in products:
        serializer = DetailedProductSerializer(data=item)
        if serializer.is_valid():
            serializer.save()
            results.append({'name': item['title'], 'status': 'imported'})
        else:
            results.append({'name': item.get('title', 'Unknown'), 'errors': serializer.errors})

    return Response(results)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
     user= request.user
     return Response({"username": user.username})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
     user=request.user
     serializer= UserSerializer(user)
     return Response(serializer.data)'''
