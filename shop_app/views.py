from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
# Create your views here.
@api_view(["GET"])
def products(request):
    products= Product.objects.all()
    serializers= ProductSerializer(products, many=True)
    return Response(serializers.data)
