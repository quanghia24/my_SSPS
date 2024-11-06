# Generated by Django 5.1.2 on 2024-11-04 20:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='purchase_order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_time', models.DateTimeField(auto_now_add=True)),
                ('amount', models.IntegerField()),
                ('price', models.FloatField(default=2.25)),
                ('status', models.CharField(choices=[('unpaid', 'Unpaid'), ('paid', 'Paid')], default='unpaid', max_length=10)),
                ('total_amount', models.FloatField(blank=True, default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user')),
            ],
        ),
    ]