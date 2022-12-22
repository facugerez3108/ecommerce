from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'compare_price',
            'category',
            'created_at',
            'quantity',
            'sold',
            'image',
            'get_thumbnail'
        ]