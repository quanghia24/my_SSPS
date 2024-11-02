from django.db import models
from user.models import Student

# Create your models here.
class print_order(models.Model):
    side = models.CharField(max_length=1, choices=(('1', 'single'), ('2', 'double')))     
    page_side = models.CharField(max_length=1, choices=(('3', 'A3'), ('4', 'A4')))
    orientation = models.CharField(max_length=10, choices=(('portrait', 'portrait'), ('landscape', 'landscape')))
    time_start = models.DateTimeField(auto_now_add=True)
    time_end = models.DateTimeField(null=True)
    status = models.CharField(max_length=10, choices=(('success', 'success'), ('failed', 'failed'), ('pending', 'pending')))
    # pages_to_be_printed = models.CharField(max_length=64, null=True)
    
    num_pages_printed = models.IntegerField(null=True)
    student_id = models.ForeignKey(Student, related_name='orders_users', on_delete=models.CASCADE)



