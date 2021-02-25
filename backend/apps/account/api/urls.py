from django.urls import path
from .views import(
	Registration,
    CustomObtainAuthToken,
    UserList,
)
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from django.urls import path, include, re_path

router = routers.DefaultRouter()
router.register(r'users', UserList, 'user')

urlpatterns = [
    # Authorization
	path('login/', CustomObtainAuthToken.as_view(), name="login"),
    path('register/', Registration.as_view(), name="register"),

    # User queries
    path('admin/', include(router.urls)),
]