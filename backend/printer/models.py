from django.db import models
import json

class Printer(models.Model):
    model = models.CharField(max_length = 100) #Model máy in
    brand = models.CharField(max_length = 100) #Hãng máy in
    location = models.CharField(max_length = 100) # Vị trí máy in (VD: H6-103)
    status = models.CharField(max_length = 50, choices = [('active', 'Active'), ('inactive', 'Inactive')], default = 'active') #Trạng thái
    image = models.URLField(max_length = 200, blank = True, null = True) #Ảnh minh họa tùy chọn
    frequency = models.IntegerField(default = 0, blank = True, null = True)
    printed_papers = models.IntegerField(default = 0, blank = True, null = True)
    allowed_types = models.JSONField(default=list, blank=True)  # Lưu danh sách như ["pdf", "docx", "xls"]

    def add_type(self, filetype: str):
    # Kiểm tra kiểu dữ liệu của allowed_types là list, nếu không thì chuyển nó thành list
        if isinstance(self.allowed_types, list):
            if filetype not in self.allowed_types:
                self.allowed_types.append(filetype)
        else:
            # Nếu là dict hoặc kiểu khác, chuyển thành list và thêm filetype
            self.allowed_types = [filetype]
        self.save()

    def __str__(self):
        return f"{self.model} - {self.brand} [{self.status}]" 

