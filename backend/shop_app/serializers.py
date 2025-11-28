from rest_framework import serializers
from .models import Product, Cart, CartItem, Dimensions, MetaInfo, Review
from rest_framework.fields import ImageField
from django.contrib.auth import get_user_model


# Nested serializers for rich product data
class DimensionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimensions
        fields = '__all__'

class MetaInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaInfo
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

# Basic product serializer (used in cart items, listings)
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "thumbnail", "description", "category", "price"]

# Detailed product serializer (for product detail view)
class DetailedProductSerializer(serializers.ModelSerializer):
    dimensions = DimensionsSerializer()
    meta = MetaInfoSerializer()
    reviews = ReviewSerializer(many=True)
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'thumbnail', 'images', 'description', 'price',
            'discountPercentage', 'rating', 'stock', 'tags', 'brand', 'sku', 'weight',
            'dimensions', 'warrantyInformation', 'shippingInformation', 'availabilityStatus',
            'reviews', 'returnPolicy', 'minimumOrderQuantity', 'meta', 'category','similar_products'
        ]

    def get_similar_products(self, obj):
        products = Product.objects.filter(category=product.category).exclude(id=product.id)[:4]
        serializer = ProductSerializer(products, many=True)
        return serializer.data

# Cart item serializer
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:  # ✅ fixed typo from "meta" to "Meta"
        model = CartItem
        fields = ["id", "quantity", "product", "total"]

    def get_total(self, cartitem):
        return cartitem.product.price * cartitem.quantity

# Full cart serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "cart_code", "items", "sum_total", "num_of_items", "created_at", "modified_at"]

    def get_sum_total(self, cart):
        return sum(item.product.price * item.quantity for item in cart.items.all())

    def get_num_of_items(self, cart):
        return sum(item.quantity for item in cart.items.all())

# Simple cart serializer
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "cart_code", "num_of_items"]  # ✅ fixed typo from "cart-code"

    def get_num_of_items(self, cart):
        return sum(item.quantity for item in cart.items.all())
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= get_user_model()
        fields= ["id","username","first_name","last_name","email", "city", "state", "address", "phone"]