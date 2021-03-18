from django.urls import path, include, re_path
from rest_framework import routers
from .views import(
	COAList,
)

router = routers.DefaultRouter()
router.register(r'', COAList, 'coa')

urlpatterns = [
    # COA queries
    path('admin/', include(router.urls)),
]