# Generated by Django 5.1.1 on 2024-11-17 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("printer", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="printer",
            name="image",
            field=models.URLField(blank=True, null=True),
        ),
    ]