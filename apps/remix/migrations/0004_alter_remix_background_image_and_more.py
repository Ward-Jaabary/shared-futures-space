# Generated by Django 4.2.3 on 2024-05-01 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("remix", "0003_rename_container_remixbackgroundimage_idea"),
    ]

    operations = [
        migrations.AlterField(
            model_name="remix",
            name="background_image",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="background_image",
                to="remix.remixbackgroundimage",
            ),
        ),
        migrations.AlterField(
            model_name="remixbackgroundimage",
            name="idea",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="background_images",
                to="remix.remixidea",
            ),
        ),
    ]
