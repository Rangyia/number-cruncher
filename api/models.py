from django.db import models
from datetime import datetime    

"""
User models
"""
class User(models.Model):

    # Account Details
    username = models.CharField('username', max_length=50)
    password = models.CharField('password', max_length=50)
    active = models.BooleanField('active', default=True)

    # Name Details
    first_name = models.CharField('first_name', max_length=50)
    last_name = models.CharField('last_name', max_length=50)
    dob = models.DateField('dob')
    address = models.CharField('first_name', max_length=255)
    user_img = models.CharField('first_name', max_length=255)

    # Permission Roles
    staff = models.BooleanField('staff', default=True)
    manager = models.BooleanField('manager', default=False)
    admin = models.BooleanField('admin', default=False)

    # Account Dates
    password_created_at = models.DateTimeField('password_created_date', default=datetime.now)
    suspension_start_date = models.DateTimeField('suspension_start_date', default=datetime.now)
    suspension_end_date = models.DateTimeField('suspension_end_date', default=datetime.now)
    
    # To string
    def __str__(self):
        return self.username

