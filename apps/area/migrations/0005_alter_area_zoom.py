# Generated by Django 4.2.3 on 2024-03-14 10:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("area", "0004_area_zoom"),
    ]

    operations = [
        migrations.AlterField(
            model_name="area",
            name="zoom",
            field=models.FloatField(default=12),
        ),
    ]
