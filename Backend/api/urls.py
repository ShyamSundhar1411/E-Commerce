from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from . import views
urlpatterns = [
    path('',views.getRoutes,name = "routes"),
    path('products',views.getProducts,name = "products"),
    path('products/<str:pk>',views.product,name = "singleproduct")

]
