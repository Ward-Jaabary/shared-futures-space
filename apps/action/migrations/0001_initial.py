# Generated by Django 4.0.6 on 2022-11-09 16:41

import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Action",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("uuid", models.UUIDField(default=uuid.uuid4)),
                ("kind", models.CharField(max_length=200)),
                ("result", models.CharField(max_length=10, null=True)),
                ("param_str", models.CharField(max_length=2000, null=True)),
            ],
        ),
    ]
