from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class meta:
        moddel=Product
        fields= ["id", "name","slujg","image", "description", "category","price"]