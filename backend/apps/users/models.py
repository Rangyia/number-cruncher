# accounts/models.py
from django.db import models
from datetime import datetime    
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    # Name Details
    first_name = models.CharField('first_name', max_length=50)
    last_name = models.CharField('last_name', max_length=50)
    dob = models.DateField('dob', default=datetime.now)
    address = models.CharField('first_name', max_length=255)
    user_img = models.CharField('first_name', max_length=255)

    # Permission Roles
    staff = models.BooleanField('staff', default=True)
    manager = models.BooleanField('manager', default=False)
    admin = models.BooleanField('admin', default=False)

    # Account Dates -> Change these to date fields
    password_created_at = models.DateTimeField('password_created_date', default=datetime.now)
    suspension_start_date = models.DateTimeField('suspension_start_date', default=datetime.now)
    suspension_end_date = models.DateTimeField('suspension_end_date', default=datetime.now)

    def __str__(self):
        return self.username