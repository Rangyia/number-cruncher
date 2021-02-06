from django.urls import path
from .views import UserView, CreateUserView, GetUser

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('get-user', GetUser.as_view())
]