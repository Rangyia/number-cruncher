from django.contrib import admin
from django.urls import path, include, re_path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    re_path(r'^', views.FrontendAppView.as_view())
]
