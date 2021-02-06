from django.db import models

class Account(models.Model):
    # Attributes
    username = models.EmailField(
        verbose_name='email address',
        max_length=100,
        unique=True,
    )
    password = models.CharField('password', max_length=50)
    first_name = models.CharField('first_name', max_length=100)
    last_name = models.CharField('last_name', max_length=100)
    dob = models.DateField()
    address = models.CharField(null=True, max_length=100, blank=True)

    # Roles
    staff = models.BooleanField(default=True)
    manager = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username
