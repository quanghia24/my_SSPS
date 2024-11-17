from django.db import models
from user.models import Student
# Create your models here.

class Report(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    rating = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)
    
    user = models.ForeignKey(User, related_name='reported_users', on_delete=models.CASCADE)

    def __str__(self):
        return self.title + " | reviewed by " + self.user.user_id