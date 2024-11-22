from django.db import models
from user.models import User
from printer.models import Printer
from PyPDF2 import PdfReader
from datetime import datetime


# Create your models here.
class print_order(models.Model):
    file_name = models.CharField(max_length=125, blank=True, null=True)
    file_to_be_printed = models.FileField(upload_to='files/')
    
    status = models.CharField(max_length=7, choices=(('success', 'success'), ('failed', 'failed'), ('pending', 'pending')), default='pending')

    orientation = models.CharField(max_length=10, choices=(('portrait', 'portrait'), ('landscape', 'landscape')), default='portrait')
    sided = models.CharField(max_length=6, choices=(('single', 'single'), ('double', 'double')), default='single')    
    page_side = models.CharField(max_length=2, choices=(('A3', 'A3'), ('A4', 'A4')), default='A4')
    copies = models.IntegerField(default=1)

    timer_start = models.DateTimeField(auto_now_add=True)
    timer_end = models.DateTimeField(blank=True, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    printer = models.ForeignKey(Printer, on_delete=models.CASCADE)
    page_cost = models.IntegerField(default=0, blank=True)

        
    def save(self, *args, **kwargs):
        if self.status == 'success' and not self.timer_end:
            self.timer_end = datetime.now()

        super(print_order, self).save(*args, **kwargs)


    def __str__(self):
        return f"{self.file_name} by {self.user.name}"


    