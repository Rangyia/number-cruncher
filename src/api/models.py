from django.db import models

"""
User models
"""
class User(models.Model):

    # Account
    username = models.CharField('username', max_length=50)
    password = models.CharField('password', max_length=50)
    created_at = models.DateTimeField('created_at')

    # Details
    first_name = models.CharField('first_name', max_length=50)
    last_name = models.CharField('last_name', max_length=50)
    dob = models.DateField('dob')

    # Roles
    staff = models.BooleanField('staff', default=True)
    manager = models.BooleanField('manager', default=False)
    admin = models.BooleanField('admin', default=False)
    
    # To string
    def __str__(self):
        return self.username

