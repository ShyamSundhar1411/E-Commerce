from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . serializers import ProductSerializer
from . models import Product
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products',
        '/api/products/<id>',
        '/api/products/reviews',
        '/api/products/top',
        '/api/products/<id>/update',
        '/api/products/<id>/delete',
        '/api/products/create',
        '/api/products/upload',
    ]
    return Response(routes)
@api_view(['GET'])
def getProducts(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product, many = True)
    return Response(serializer.data)
@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product,many = False)
    return Response(serializer.data)
