from django.urls import path
from .views import Account, CreateStaffView, CreateAdminView, CreateManagerView

urlpatterns = [
    path('create-staff', CreateStaffView.as_view()),
    path('create-manager', CreateManagerView.as_view()),
    path('create-admin', CreateAdminView.as_view())
]