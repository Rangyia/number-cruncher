from django.db import models

# Create your models here.
class Journal(models.Model):
    is_active = models.BooleanField(verbose_name='active', default=True)
    name = models.CharField(verbose_name="name", max_length=30, null=True)
    number = models.CharField(verbose_name="number", max_length=30, unique=True, null=True)
    description = models.CharField(verbose_name="description", max_length=255, null=True)
    normal_side = models.CharField(verbose_name="normal_side", max_length=255, null=True)
    category = models.CharField(verbose_name="category", max_length=255, null=True)
    subcategory = models.CharField(verbose_name="subcategory", max_length=255, null=True)
    initial_balance = models.FloatField(verbose_name="initial balance", default=0.00, null=True)
    debit = models.FloatField(verbose_name="debit", default=0.00, null=True)
    credit = models.FloatField(verbose_name="credit", default=0.00, null=True)
    balance = models.FloatField(verbose_name="balance", default=0.00, null=True)
    date_added = models.DateField(verbose_name='date joined', auto_now_add=True, null=True)
    user_id = models.IntegerField(verbose_name='user_id', null=True)
    order = models.CharField(verbose_name='order', max_length=255, null=True)
    statement = models.CharField(verbose_name='statement', max_length=10, null=True)

    def __str__(self):
        return self.name
