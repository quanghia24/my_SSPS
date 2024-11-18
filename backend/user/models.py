from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator



# Create your models here.
class User(models.Model):
    email_validator = RegexValidator(
        regex=r'^[a-zA-Z0-9._%+-]+@hcmut\.edu\.vn$',
        message="Email must end with @hcmut.edu.vn"
    )

    email = models.EmailField(
        unique=True,  # Đảm bảo email là duy nhất
        validators=[email_validator],  # Sử dụng validator đã định nghĩa
        max_length=255
    )

    #working
    user_id = models.CharField(max_length=10, unique=True)
    username = models.CharField(max_length=40, unique=True)
    name = models.CharField(max_length=40)
    password = models.CharField(max_length=20)
    image = models.ImageField(upload_to='users/', null=True, blank=True)
    day_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=10, null=True, blank=True)
    balance = models.IntegerField(default=100)
    last_signed_in = models.DateTimeField(auto_now_add=True)

    # role
    is_superuser = models.CharField(max_length=20, default='customer')  # or 'admin'

    def __str__(self):
        return self.name + " " + self.is_superuser