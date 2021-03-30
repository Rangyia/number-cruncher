from django.urls import path, include, re_path
from rest_framework import routers
from .views import(
	LogList,
)

router = routers.DefaultRouter()
router.register(r'', LogList, 'logs')

urlpatterns = [
    # COA queries
    path('admin/', include(router.urls)),
]