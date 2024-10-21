# Generated by Django 4.2.3 on 2024-10-20 22:05

import django.db.models.deletion
import modelcluster.contrib.taggit
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("taggit", "0005_auto_20220424_2025"),
        ("resources", "0005_resource_location_exact"),
    ]

    operations = [
        migrations.CreateModel(
            name="CustomTag",
            fields=[
                (
                    "tag_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="taggit.tag",
                    ),
                ),
            ],
            options={
                "verbose_name": "Tag",
                "verbose_name_plural": "Tags",
            },
            bases=("taggit.tag",),
        ),
        migrations.AlterField(
            model_name="resource",
            name="tags",
            field=modelcluster.contrib.taggit.ClusterTaggableManager(
                blank=True,
                help_text="A comma-separated list of tags.",
                through="resources.ResourceTag",
                to="resources.CustomTag",
                verbose_name="Tags",
            ),
        ),
        migrations.AlterField(
            model_name="resourcetag",
            name="tag",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(app_label)s_%(class)s_items",
                to="resources.customtag",
            ),
        ),
        migrations.AlterUniqueTogether(
            name="resourcetag",
            unique_together={("content_object", "tag")},
        ),
    ]