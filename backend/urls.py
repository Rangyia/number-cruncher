# Django 
from django.contrib import admin
from django.urls import path, include

# Views
urlpatterns = [
    path('', include('api.urls')),
]
