from rest_framework import serializers
from .models import Product, Cart, CartItem, Dimensions, MetaInfo, Review
from rest_framework.fields import ImageField
from django.contrib.auth import get_user_model
from decimal import Decimal


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
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)
    class Meta:
        model = Review
        fields = '__all__'

# Basic product serializer (used in cart items, listings)
class ProductSerializer(serializers.ModelSerializer):
    price_display = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "thumbnail", "description", "category", "price", "price_display"]

    def get_price_display(self, obj):
        price = obj.price.quantize(Decimal('0.01'))
        s = format(price, 'f').rstrip('0').rstrip('.')
        return f"{s} birr"

# Detailed product serializer (for product detail view)
class DetailedProductSerializer(serializers.ModelSerializer):
    dimensions = DimensionsSerializer()
    meta = MetaInfoSerializer()
    reviews = ReviewSerializer(many=True)
    similar_products = serializers.SerializerMethodField()
    price_display = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'thumbnail', 'images', 'description', 'price', 'price_display',
            'discountPercentage', 'rating', 'stock', 'tags', 'brand', 'sku', 'weight',
            'dimensions', 'warrantyInformation', 'shippingInformation', 'availabilityStatus',
            'reviews', 'returnPolicy', 'minimumOrderQuantity', 'meta', 'category','similar_products',
        ]

    def get_price_display(self, obj):
        price = obj.price.quantize(Decimal('0.01'))
        s = format(price, 'f').rstrip('0').rstrip('.')
        return f"{s} birr"

    '''def get_similar_products(self, obj):
       return ProductSerializer(
        Product.objects.filter(category=obj.category).exclude(id=obj.id)[:4],
        many=True
    ).data '''
    def get_similar_products(self, obj):
        # Fetch similar products from context (set in the view)
        similar = self.context.get("similar_products", [])
        return ProductSerializer(similar, many=True, context=self.context).data


# Cart item serializer
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:  
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
        model = get_user_model()
        # Keep fields small and explicit to avoid leaking sensitive data
        fields = ["id", "username", "first_name", "last_name", "email", "city", "state", "address", "phone"]


class RegistrationSerializer(serializers.ModelSerializer):
    # Accept password confirmation and do strong validation using Django's
    # password validators for production-ready rules.
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "email",
            "username",
            "password",
            "password2",
            "first_name",
            "last_name",
            "city",
            "state",
            "address",
            "phone",
        ]

    def validate_email(self, value):
        User = get_user_model()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_username(self, value):
        User = get_user_model()
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value

    def validate(self, data):
        # Confirm passwords match
        if data.get("password") != data.get("password2"):
            raise serializers.ValidationError({"password": "Passwords do not match."})

        # Use Django's built-in password validators for production-quality checks
        from django.contrib.auth.password_validation import validate_password
        validate_password(data.get("password"))

        return data

    def create(self, validated_data):
        validated_data.pop("password2", None)
        password = validated_data.pop("password")
        User = get_user_model()
        user = User(**validated_data)
        # Use set_password to hash using configured PASSWORD_HASHERS
        user.set_password(password)
        user.save()
        return user