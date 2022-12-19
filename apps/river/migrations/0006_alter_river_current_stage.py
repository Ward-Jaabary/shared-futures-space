# Generated by Django 4.0.6 on 2022-12-15 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('river', '0005_remove_actstage_dates_chat_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='river',
            name='current_stage',
            field=models.CharField(choices=[('envision', 'Envision'), ('plan', 'Plan'), ('act', 'Act'), ('reflect', 'Reflect'), ('finished', 'Finished')], default=None, max_length=8, null=True),
        ),
    ]