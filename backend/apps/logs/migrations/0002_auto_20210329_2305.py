# Generated by Django 3.1.6 on 2021-03-30 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='log',
            name='log_date',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='time'),
        ),
    ]
