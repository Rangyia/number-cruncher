# Generated by Django 3.1.6 on 2021-03-31 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journals', '0003_auto_20210331_1150'),
    ]

    operations = [
        migrations.AddField(
            model_name='journal',
            name='user',
            field=models.IntegerField(null=True, verbose_name='coa'),
        ),
    ]
