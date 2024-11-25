from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from user.models import User
# Create your models here.

class Report(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title + " | reviewed by " + self.user.user_id