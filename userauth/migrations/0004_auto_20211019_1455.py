# Generated by Django 3.2.8 on 2021-10-19 14:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0003_auto_20211019_1454'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='display_name',
            field=models.CharField(help_text='Will be shown alongside entries', max_length=30, null=True, verbose_name='Display name'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='post_code',
            field=models.CharField(max_length=8, null=True, verbose_name='Post code'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='year_of_birth',
            field=models.PositiveIntegerField(null=True, validators=[django.core.validators.MinValueValidator(1900), django.core.validators.MaxValueValidator(2021)], verbose_name='Year of birth'),
        ),
    ]
