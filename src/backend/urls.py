# Django 
from django.contrib import admin
from django.urls import path, include

# Views
urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('api.urls')),
]
