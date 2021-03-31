from django.urls import path, include, re_path
from rest_framework import routers
from .views import(
	JournalList,
)

router = routers.DefaultRouter()
router.register(r'', JournalList, 'journals')

urlpatterns = [
    # COA queries
    path('admin/', include(router.urls)),
]