from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include, re_path
from . import views

urlpatterns = [
    # DJANGO ADMIN URL
    path('admin/', admin.site.urls),

    # REST_FRAMEWORK URLS
    path('api/account/', include('account.api.urls')),
    path('api/coa/', include('coa.api.urls')),

    # FRONTEND URL
    re_path(r'^', views.FrontendAppView.as_view())
]
