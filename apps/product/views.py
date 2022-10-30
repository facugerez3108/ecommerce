from unicodedata import category
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


class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        
        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be a integer'}, status=status.HTTP_400_BAD_REQUEST)
        
        search = data['search']

        # chequea si hay inputs en la busqueda 
        if len(search) == 0:
            # muestra todos los productos si no hay inputs en la busqueda
            return Response(
                search_results = Product.objects.order_by('-date_created').all())
        else:
            # si hay inputs en la busqueda, muestra los productos que coincidan con la busqueda
            search_results = Product.objects.filter
            (Q(description__contains=search) | Q(name__contains=search)).order_by('-date_created').all()
        
        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True)
            return Response({'search_results': search_results.data}, status=status.HTTP_200_OK)

        # Chequear si no existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        category = Category.objects.get(id=category_id)

        # Si la categoria tiene padre, filtrar SOLO por la categoria y no el padre
        if category.parent:
            search_results = search_results.order_by('-sold').filter(category=category)
        else:
            # Si la categoria no tiene padre ni hijos, filtrar solo por la categoria
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by('-date_created').filter(category=category)
            else:
                categories = Category.objects.filter(parent=category)
                filtered_categories = [category]

                for cat in categories:
                    filtered_categories.append(cat)
                
                filtered_categories = tuple(filtered_categories)

                search_results = search_results.order_by('-date_created').filter(category__in=filtered_categories)
        
        search_results = ProductSerializer(search_results, many=True)
        return Response({'search_results': search_results.data}, status=status.HTTP_200_OK)


class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be a integer'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Existe producto id
        if not Product.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'Product does not exist with this id'}, status=status.HTTP_404_NOT_FOUND)
        
        category = Product.objects.get(id=product_id).category

        if Product.objects.filter(category=category).exist():
            # Si la categoria tiene padre, filtrar SOLO por la categoria y no el padre
            if category.parent:
                related_products = Product.objects.order_by('-sold').filter(category=category)
            
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = related_products.order_by('-sold').filter(category=category)

                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)
                    
                    filtered_categories = tuple(filtered_categories)

                    related_products = related_products.order_by('-sold').filter(category__in=filtered_categories)

            # Excluir el producto que estamos viendo
            related_products = related_products.exclude(id=product_id)
            related_products = ProductSerializer(related_products, many=True)

            if len(related_products.data) > 3:
                return Response({'related_products': related_products.data[:3]}, status=status.HTTP_200_OK)
            elif len(related_products.data) > 0:
                return Response({'related_products': related_products.data}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'No related products found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(
                {'error': 'No related products found'}, status=status.HTTP_404_NOT_FOUND)


class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try: 

            category_id = int(data['category_id'])
        except:
            
            return Response(
                {'error': 'Category ID must be a integer'}, status=status.HTTP_400_BAD_REQUEST)

        price_range = data['price_range']
        sort_by = data['sort_by']

        if not (sort_by == 'date_created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
            sort_by = 'date_created'
        
        order = data['order']

        ## Si categoryID es = 0, filtrar todas las categorias

        if category_id == 0:
            product_result = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)

            if category.parent:
                product_result = Product.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    product_result = Product.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)
                    
                    filtered_categories = tuple(filtered_categories)

                    product_result = Product.objects.filter(category__in=filtered_categories)
        
        # Filtro por precio

        if price_range == '1000 - 3000':
            product_result = product_result.filter(price__lte=1000)
            product_result = product_result.filter(price__lte=3000)
        elif price_range == '3000 - 5000':
            product_result = product_result.filter(price__gte=3000)
            product_result = product_result.filter(price__lte=5000)
        elif price_range == '5000 - 10000':
            product_result = product_result.filter(price__gte=5000)
            product_result = product_result.filter(price__lte=10000)
        elif price_range == '10000 - 20000':
            product_result = product_result.filter(price__gte=10000)
            product_result = product_result.filter(price__lte=20000)
        elif price_range == 'More than 20000':
            product_result = product_result.filter(price__gte=20000)
        
        # Filtro por orden

        if order == 'asc':
            product_result = product_result.order_by(sort_by)
        elif order == 'desc':
            sort_by = '-' + sort_by
            product_result = product_result.order_by(sort_by)
        else:
            product_result = product_result.order_by(sort_by)
        

        product_result = ProductSerializer(product_result, many=True)

        if len(product_result.data) > 0:
            return Response(
                {'filtered_products': product_result.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products found'}, status=status.HTTP_404_NOT_FOUND)
