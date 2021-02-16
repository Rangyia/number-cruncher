# accounts/admin.py
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('username', 'first_name', 'last_name', 'dob', 'address', 'user_img', 'staff', 'manager', 'admin', 'password_created_at', 'suspension_start_date', 'suspension_end_date')

admin.site.register(CustomUser, CustomUserAdmin)