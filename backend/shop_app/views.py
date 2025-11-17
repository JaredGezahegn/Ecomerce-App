from django.shortcuts import render
#from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Product,Cart,CartItem
from .serializers import CartSerializer,ProductSerializer,DetailedProductSerializer, CartItemSerializer, SimpleCartSerializer, UserSerializer
from rest_framework.response import Response
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
    product= Product.objects.get(slug=slug)
    serializer= DetailedProductSerializer(product)
    return Response(serializer.data) 
@api_view(["POST"])
def add_item(request):
    try:
          cart_code = request.data.get("cart_code")
          product_id= request.data.get("product_id")

          cart, created = Cart.objects.get_or_create(cart_code=cart_code)
          product= Product.objects.get(id=product_id)

          cartitem, created= CartItem.objects.get_or_create(cart=cart, product=product)
          cartitem.quantity=1
          cartitem.save()

          serializer= CartItemSerializer(cartitem)
          return Response({"data": serializer.data, "message": "CartItem Created Successfully"}, status=201)
    except Exception as e:
         return Response({"error": str(e)}, status=400)
   
   
   
@api_view(['GET'])
def product_in_cart(request):
     cart_code=request.query_params_get("cart_code")
     product_id=request.query_params_get("product_id")

     cart= Cart.objects.get(cart_code=cart_code)
     product=Product.objects.get(id=product_id)

     product_exists_in_cart= CartItem.objects.filter(cart=cart, product=product).exists()

     return Response({'product_in_cart': product_exists_in_cart})
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
          cartitem= cartitem.objects.get(id=cartitem_id)
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
     return Response(serializer.data)
