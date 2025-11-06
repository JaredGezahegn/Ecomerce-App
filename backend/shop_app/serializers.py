from rest_framework import serializers
from .models import Product, Cart, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class meta:
        model=Product
        fields= ["id", "name","slug","image", "description", "category","price"]

class DetailProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
         model= Product
         fields= ["id","name","price","slug","image","description","similar_products"]

    def get_similar_products(self, product):
         products=Product.objects.filter(category=product.category).exclude(id=product.id)
         serializer= ProductSerializer(products, many=True)
         return serializer.data
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        field= ["id", "cart_code", "created_at", "modified-at"]
class CartItemserializer(serializers.ModelSerializer):
    class meta:
        model= CartItem
        fields= ["id","quantity","product","cart"]
        


