from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    #Products
    path('',views.getRoutes,name = "routes"),
    path('products/topproducts/',views.topProducts,name = "topProducts"),
    path('products/<str:pk>/create/reviews/',views.createReview,name =  "createreview"),
    path('products',views.getProducts,name = "products"),
    path('products/upload/',views.uploadImage,name = "imageupload"),
    path('products/<str:pk>',views.getProduct,name = "product"),
    path('products/delete/<str:pk>/',views.deleteProduct,name = "deleteproduct"),
    path('products/create/',views.createProduct,name = "createproduct"),
    path('products/update/<str:pk>/',views.UpdateProduct,name = "updateproduct"),
    #Users
    path('users/',views.getUsers,name = "users"),
    path('users/register/',views.registerUser,name = "registerUser"),
    path('users/login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/',views.getUserProfile,name = "userprofile"),
    path('users/profile/update/',views.UpdateUserProfile,name = "userprofileupdate"),
    path('users/<str:pk>/delete/',views.deleteUser,name = "deleteuser"),
    path('users/<str:pk>/',views.getUserById,name = "getuserbyid"),
    path('users/<str:pk>/update/',views.updateUser,name = "updateUser")
]
