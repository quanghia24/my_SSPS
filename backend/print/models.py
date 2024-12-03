from django.db import models
from user.models import User
from printer.models import Printer
from datetime import datetime


# Create your models here.

class print_file(models.Model):
    file = models.FileField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"File {self.file} | by {self.user.name}"


class print_order(models.Model):
    file = models.ForeignKey(print_file, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    printer = models.ForeignKey(Printer, on_delete=models.CASCADE)


    order_name = models.CharField(max_length=125, blank=True, null=True)
    status = models.CharField(max_length=7, choices=(('success', 'success'), ('failed', 'failed'), ('pending', 'pending')), default='pending')
    orientation = models.CharField(max_length=10, choices=(('portrait', 'portrait'), ('landscape', 'landscape')), default='portrait')
    sided = models.CharField(max_length=6, choices=(('single', 'single'), ('double', 'double')), default='single')    
    page_side = models.CharField(max_length=2, choices=(('A3', 'A3'), ('A4', 'A4')), default='A4')
    copies = models.IntegerField(default=1)
    timer_start = models.DateTimeField(auto_now_add=True)
    timer_end = models.DateTimeField(blank=True, null=True)
    page_cost = models.IntegerField(default=0, blank=True)

        
    def save(self, *args, **kwargs):
        if self.status == 'success' and not self.timer_end:
            self.timer_end = datetime.now()

        super(print_order, self).save(*args, **kwargs)


    def __str__(self):
        return f"{self.order_name} by {self.user.name}"




    