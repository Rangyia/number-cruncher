from django.urls import path
from .views import(
	registration_view,
    CustomObtainAuthToken,
)
from rest_framework.authtoken.views import obtain_auth_token
app_name = 'account'

urlpatterns = [
	path('login/', CustomObtainAuthToken.as_view(), name="login"),
    path('register/', registration_view, name="register"),
]