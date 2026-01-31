from django.urls import path
from . import views
from .views import import_products
urlpatterns= [
    #path("", views.home, name="home"),
    path("", views.home, name="home"),
    path("products",views.products, name="products"),
    path("product_detail/<slug:slug>", views.product_detail, name="product_detail"),
    path("add_item/", views.add_item, name="add_item"),
    path("product_in_cart", views.product_in_cart, name= "product_in_cart"),
    path("get_cart_stat", views.get_cart_stat, name="get_cart_stat"),
    path("get_cart", views.get_cart, name="get_cart"),
    path("update_quantity/", views.update_quantity, name="update_quantity"),
    path("import-products/", import_products),
    path("get_username", views.get_username, name="get_username"),
    path("user_info/", views.user_info, name="user_info"),
    path("register/", views.register, name="register"),
    path("initiate_payment/", views.initiate_payment, name="initiate_payment"),
    path("payment_callback/", views.payment_callback, name="payment_callback")
]