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
    def create_user(self, email, password=None, name=None, user_id=None):
        if not email:
            raise ValueError('Users must have an email')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, user_id = user_id)

        user.set_password(password)
        user.save(using=self._db)

        return user

    # def create_superuser(self, email, username, password):
    #     user = self.create_user(email, username, password)
    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

class User(AbstractBaseUser, PermissionsMixin):
    name = models.TextField(null=True)
    email = models.EmailField(max_length=255, unique=True)
    user_id = models.CharField(max_length=7,null=True, unique=True)
    # username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    balance = models.IntegerField(default=100)
    phone_number = models.CharField(max_length=10, default="", null=True)
    dob = models.DateField(auto_now_add=True)
    faculty = models.CharField(max_length=100, default="Computer Science and Engineering")
    last_signed_in = models.DateTimeField(auto_now_add=True)
    images = models.TextField(blank=True)
    objects = UserProfileManager()
    money_spent = models.FloatField(default=0)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email.split('@')[0]} | {self.user_id} | Balance: {self.balance} | Spent: {self.money_spent} | Faculty of {self.faculty}"

