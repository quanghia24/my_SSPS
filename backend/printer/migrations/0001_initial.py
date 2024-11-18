# Generated by Django 5.1.2 on 2024-11-18 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Printer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('1', 'available'), ('2', 'occupied'), ('3', 'offline')], max_length=1)),
                ('image', models.ImageField(null=True, upload_to='printer/')),
                ('model', models.CharField(max_length=100)),
                ('brand', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=200)),
                ('allow_types', models.TextField(null=True)),
            ],
        ),
    ]
