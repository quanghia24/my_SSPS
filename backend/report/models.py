from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from user.models import User
# Create your models here.

class Report(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    date_created = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(User, to_field='user_id', on_delete=models.CASCADE)

    def __str__(self):
        return self.title + " | reviewed by " + self.user_id.user_id