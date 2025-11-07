from rest_framework import serializers
from .models import Product, Cart, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields= ["id", "name","slug","image", "description", "category","price"]

class DetailedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'image',
            'description',
            'price',
            'category',
        ]

    def get_similar_products(self, product):
         products=Product.objects.filter(category=product.category).exclude(id=product.id)
         serializer= ProductSerializer(products, many=True)
         return serializer.data
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields= ["id", "cart_code", "created_at", "modified-at"]
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    cart= CartSerializer(read_only=True)
    class meta:
        model= CartItem
        fields= ["id","quantity","product","cart"]
        


