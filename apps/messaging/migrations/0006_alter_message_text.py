# Generated by Django 4.0.6 on 2022-12-01 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0005_message_hidden_reason'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='text',
            field=models.CharField(blank=True, max_length=2000),
        ),
    ]
