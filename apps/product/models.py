from django.db import models
from datetime import datetime
from apps.category.models import Category

class product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits = 6, decimal_places =2)
    compare_price = models.DecimalField(max_digits = 6, decimal_places = 2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    image = models.ImageField(upload_to='photos/%Y/%m/',)

    def __str__(self):
        return self.name