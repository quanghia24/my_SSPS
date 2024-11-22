from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.models import AbstractUser, Group, Permission



# Create your models here.
class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Change this to a unique name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',  # Change this to a unique name
        blank=True
    )
    def create_user(self, email,username = None, password=None):
        if not email:
            raise ValueError('Users must have an email')

        email = self.normalize_email(email)
        user = self.model(email=email, username = username)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    balance = models.IntegerField(default=0)
    phone_number = models.CharField(max_length=10,null=True)
    dob = models.DateField(null=True)
    faculty = models.CharField(max_length=100,null=True)
    mssv = models.CharField(max_length=6,null=True, unique=True)
    last_signed_in = models.DateTimeField(null=True, blank=True)
    images = models.TextField(blank=True)
    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"Email: {self.email}, Username: {self.username}, MSSV: {self.mssv}, Faculty: {self.faculty}, Phone: {self.phone_number}, Balance: {self.balance},Images:{self.images}"

