from django.db import models

# Create your models here.

class Printer(models.Model):
    model = models.CharField(max_length = 100) #Model máy in
    brand = models.CharField(max_length = 100) #Hãng máy in
    location = models.CharField(max_length = 100) # Vị trí máy in (VD: H6-103)
    allowed_types = models.JSONField()  # Lưu danh sách như ["pdf", "docx", "xls"]
    status = models.CharField(max_length = 50, choices = [('active', 'Active'), ('inactive', 'Inactive')], default = 'active') #Trạng thái
    image = models.URLField(max_length = 200, blank = True, null = True) #Ảnh minh họa tùy chọn

    def __str__(self):
        return f"{self.model} - {self.brand}"
