from django.db import models

# Create your models here.
class Student(models.Model):
    student_id     = models.CharField(max_length=10, null=True, blank=True, unique=True)
    image          = models.ImageField(upload_to='users/', null=True, blank=True)
    name           = models.CharField(max_length=40, null=True, blank=True)
    email          = models.EmailField(max_length=40, unique=True)
    password       = models.CharField(max_length=20)
    day_of_birth   = models.DateField(null=True, blank=True)
    phone_number   = models.CharField(max_length=10, null=True, blank=True)
    balance        = models.IntegerField(null=True, blank=True)
    last_signed_in = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class SPSO(models.Model):
    spso_id        = models.CharField(max_length=10, null=True, blank=True, unique=True)
    image          = models.ImageField(upload_to='users/', null=True, blank=True)
    name           = models.CharField(max_length=40, null=True, blank=True)
    email          = models.EmailField(max_length=40, unique=True)
    password       = models.CharField(max_length=20)
    day_of_birth   = models.DateField(null=True, blank=True)
    phone_number   = models.CharField(max_length=10, null=True, blank=True)
    last_signed_in = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
