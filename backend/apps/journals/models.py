from django.db import models

# Create your models here.
class Journal(models.Model):
    status = models.IntegerField(verbose_name='status', default=True)
    coa = models.IntegerField(verbose_name='coa', null=True)
    user = models.IntegerField(verbose_name='user', null=True)
    debit = models.FloatField(verbose_name="debit", default=0.00, null=True)
    credit = models.FloatField(verbose_name="credit", default=0.00, null=True)
    amount = models.FloatField(verbose_name="amount", default=0.00, null=True)
    date = models.DateField(verbose_name='date', auto_now_add=True, null=True)
    source = models.CharField(verbose_name='source', max_length=255, null=True)
    comment = models.CharField(verbose_name='comment', max_length=255, null=True)

    def __str__(self):
        return self.name
