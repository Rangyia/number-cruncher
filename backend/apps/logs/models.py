from django.db import models

# Event Logs for COA Changes
class Log(models.Model):
    log_date = models.DateTimeField(verbose_name='time', auto_now_add=True, null=True)
    coa = models.IntegerField(verbose_name='coa', null=True)
    user = models.IntegerField(verbose_name='user', null=True)
    img_before = models.CharField(verbose_name="img_before", max_length=255, null=True)
    img_after = models.CharField(verbose_name="img_after", max_length=255, null=True)

    def __str__(self):
        return self.name
