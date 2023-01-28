from django.urls import path
from .views import AddItemView, GetItemsView, GetItemTotalView, GetTotalView, UpdateItemView, EmptyCartView, SynchCartView, RemoveItemView

urlpatterns = [
    path('cart-items', GetItemsView.as_view()),
    path('add-item', AddItemView.as_view()),
    path('get-total', GetTotalView.as_view()),
    path('get-item-total', GetItemTotalView.as_view()),
    path('update-item', UpdateItemView.as_view()),
    path('remove-items', RemoveItemView.as_view()),
    path('empty-cart', EmptyCartView.as_view()),
    path('sync', SynchCartView.as_view()),

]