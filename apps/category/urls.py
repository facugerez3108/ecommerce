from urllib.parse import urlparse
from django.urls import path
from .views import listCategoryView

urlpatterns = [
    path('categories' , listCategoryView.as_view()),
]

