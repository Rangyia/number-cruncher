from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from rest_framework.authtoken.models import Token

class MyAccountManager(BaseUserManager):
	def create_user(self, email, username, password=None):
		if not email:
			raise ValueError('Users must have an email address')
		if not username:
			raise ValueError('Users must have a username')

		user = self.model(
			email=self.normalize_email(email),
			username=username,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, username, password):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
			username=username,
		)
		user.is_staff = True
		user.is_admin = True
		user.is_superuser = True
		user.save(using=self._db)
		return user

class Account(AbstractBaseUser):
    # Account
    email = models.EmailField(verbose_name="email", max_length=60, unique=True, null=True)
    username = models.CharField(verbose_name="username", max_length=30, unique=True, null=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)

    # Suspension Dates
    suspended_start_date = models.DateField('suspend start date', default=None)
    suspended_end_date = models.DateField('suspend end date', default=None)

    # Details
    first_name = models.CharField('first name', max_length=50, null=True)
    last_name = models.CharField('last name', max_length=50, null=True)
    date_of_birth = models.DateField('date of birth', null=True)
    address = models.CharField('address', max_length=255, null=True)
    avatar = models.CharField('avatar', max_length=255, null=True)

    # Permissions
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Required fields
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    # Objects used for creating a user
    objects = MyAccountManager()

    def __str__(self):
        return self.username

	# For checking permissions. to keep it simple all super user have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_superuser

	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
        return True

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)