from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from apps.category.models import Category

import django.db.models import Q

class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be a integer'}, status=status.HTTP_400_BAD_REQUEST)
        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Product does not exist'}, status=status.HTTP_404_NOT_FOUND)

class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name' or sortBy == 'sold'):
            sortBy = 'date_created'
        
        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6
        else:
            try:
                limit = int(limit)
            except:
                return Response(
                    {'error': 'Limit must be a integer'}, status=status.HTTP_400_BAD_REQUEST)
            
            if limit <= 0:
                limit = 6
            
            """ if (order == 'asc' or order == 'desc') and sortBy == 'sold':
                limit = 100 """

            if order == 'desc':
                sortBy = '-' + sortBy
                products = Product.objects.order_by(sortBy).all()[:int(limit)]
            elif order == 'asc':
                products = Product.objects.order_by(sortBy).all()[:int(limit)]
            else:
                products = Product.objects.order_by(sortBy).all()
            
            products = ProductSerializer(products, many=True)

            if products:
                return Response({'products': products.data}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'No products found'}, status=status.HTTP_404_NOT_FOUND)

            
