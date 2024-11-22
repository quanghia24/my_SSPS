# Generated by Django 5.1.2 on 2024-11-17 21:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buy', '0002_alter_purchaseorder_price'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchaseorder',
            name='user',
        ),
        migrations.AddField(
            model_name='purchaseorder',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='user.user', to_field='user_id'),
            preserve_default=False,
        ),
    ]