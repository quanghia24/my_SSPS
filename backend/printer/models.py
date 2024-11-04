from django.db import models

# Create your models here.
class Printer(models.Model):
    status = models.CharField(max_length=1, choices=(('1', 'available'), ('2', 'occupied'), ('3', 'offline')))
    image = models.ImageField(upload_to='printer/', null=True)
    model = models.CharField(max_length=100) # e123
    brand = models.CharField(max_length=100) # dell hp sony 
    location = models.CharField(max_length=200) # H6-103

    allow_types = models.TextField(null=True) # {'pdf', 'docs', 'word'} json string type

    def __str__(self):
        return self.location + " " + self.brand + " " + self.model
    