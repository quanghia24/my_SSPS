# Generated by Django 5.1.2 on 2024-11-18 02:37

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255, unique=True, validators=[django.core.validators.RegexValidator(message='Email must end with @hcmut.edu.vn', regex='^[a-zA-Z0-9._%+-]+@hcmut\\.edu\\.vn$')])),
                ('user_id', models.CharField(max_length=10, unique=True)),
                ('name', models.CharField(max_length=40)),
                ('username', models.CharField(max_length=40)),
                ('password', models.CharField(max_length=20)),
                ('image', models.ImageField(blank=True, null=True, upload_to='users/')),
                ('day_of_birth', models.DateField(blank=True, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=10, null=True)),
                ('balance', models.IntegerField(default=100)),
                ('last_signed_in', models.DateTimeField(auto_now_add=True)),
                ('is_superuser', models.CharField(default='customer', max_length=20)),
            ],
        ),
    ]
