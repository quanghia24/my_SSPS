from django.db import models

# Create your models here.
class User(models.Model):

    user_id        = models.CharField(max_length=10, unique = True)
    name           = models.CharField(max_length=40)
    email          = models.EmailField()
    password       = models.CharField(max_length=20)
    image          = models.ImageField(upload_to='users/', null=True, blank=True)
    day_of_birth   = models.DateField(null=True, blank=True)
    phone_number   = models.CharField(max_length=10, null=True, blank=True)
    balance        = models.IntegerField(default=100)
    last_signed_in = models.DateTimeField(auto_now_add=True)
    
    # role 
    allowed_rule   = models.CharField(max_length=20, default='customer') # or 'admin'

    def __str__(self):
        return self.name + " " + self.allowed_rule
    
