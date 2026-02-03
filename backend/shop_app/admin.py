from django.contrib import admin
from .models import Product, Cart, CartItem, Dimensions, MetaInfo, Review, Transaction

# Register all models
admin.site.register([Product, Cart, CartItem, Dimensions, MetaInfo, Review, Transaction])