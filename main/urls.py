from django.urls import path
from main import views

urlpatterns = [
    path('', views.hello_world, name='hello_world'),
]