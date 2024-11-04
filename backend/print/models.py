from django.db import models
from user.models import User
from printer.models import Printer
from PyPDF2 import PdfReader
from datetime import datetime


# Create your models here.
class print_order(models.Model):
    status = models.CharField(max_length=7, choices=(('success', 'success'), ('failed', 'failed'), ('pending', 'pending')))
    file_to_be_printed = models.FileField(upload_to='files/')

    orientation = models.CharField(max_length=10, choices=(('portrait', 'portrait'), ('landscape', 'landscape')), default='portrait')
    sided = models.CharField(max_length=6, choices=(('single', 'single'), ('double', 'double')), default='single')    
    page_side = models.CharField(max_length=2, choices=(('A3', 'A3'), ('A4', 'A4')), default='A4')
    copies = models.IntegerField(default=1)

    timer_start = models.DateTimeField(auto_now_add=True)
    timer_end = models.DateTimeField(blank=True, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    printer = models.ForeignKey(Printer, on_delete=models.CASCADE)

    page_cost = models.IntegerField(default=0, blank=True)

    # def calculate_page_count(self):
    #     if not self.file_to_be_printed:
    #         return 0
        
    #     # Open the file and count the pages
    #     try:
    #         with self.file_to_be_printed.open('rb') as file:
    #             pdf_reader = PdfReader(file)
    #             num_pages = len(pdf_reader.pages)
    #             return num_pages
    #     except Exception as e:
    #         print(f"Error reading file: {e}")
    #         return 0
        
    # def calculate_total_cost(self):
    #     num_pages = self.calculate_page_count()
        
    #     if num_pages == 0:
    #         return 0
        
    #     total_cost = num_pages * self.copies

    #     # Adjust cost based on sided and page size
    #     if(self.sided == 'double' and self.page_size == 'A3'):
    #         pass
    #     elif self.sided == 'double':
    #         total_cost = (total_cost + 1) // 2
    #     elif self.page_size == 'A3':
    #         total_cost = total_cost * 2

    #     return total_cost
        
    def save(self, *args, **kwargs):
        # self.page_cost = self.calculate_total_cost()

        # if(self.page_cost > self.user.balance):
        #     self.status = 'failed'

        # Set `timer_end` to the current time if the status is 'success'
        if self.status == 'success' and not self.timer_end:
            self.timer_end = datetime.now()

        super(print_order, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.name + "\'s order"

    