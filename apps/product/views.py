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
            product = Product.objects.get(id=productId)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)