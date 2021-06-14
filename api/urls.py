from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    #Products
    path('',views.getRoutes,name = "routes"),
    path('products',views.getProducts,name = "products"),
    path('products/<str:pk>',views.getProduct,name = "product"),
    #Users
    path('users',views.getUsers,name = "users"),
    path('users/register/',views.registerUser,name = "registerUser"),
    path('users/login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.getUserProfile,name = "userprofile"),
    path('users/profile/update',views.UpdateUserProfile,name = "userprofileupdate"),
]
