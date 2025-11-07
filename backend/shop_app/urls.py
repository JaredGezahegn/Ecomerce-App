from django.urls import path
from . import views

urlpatterns= [
    #path("", views.home, name="home"),
    path("", views.home, name="home"),
    path("products",views.products, name="products"),
    path("product_detail/<slug:slug>", views.product_detail, name="product_detail"),
    path("add_item/", views.add_item, name="add-item"),

]