# Generated by Django 4.0.6 on 2023-06-15 10:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("area", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="area",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="areas/images/"),
        ),
    ]