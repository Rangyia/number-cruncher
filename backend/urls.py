from django.contrib import admin
from django.urls import path, include, re_path
from api.views import FrontendAppView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # re_path(r'^', FrontendAppView.as_view())
]