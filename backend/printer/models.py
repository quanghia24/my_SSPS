from django.db import models
import json

# Create your models here.
class Printer(models.Model):
    status   = models.CharField(max_length=1, choices=(('1', 'available'), ('2', 'occupied'), ('3', 'offline')), default='1')
    image    = models.TextField(blank=True)
    model    = models.CharField(max_length=100) # e123
    brand    = models.CharField(max_length=100) # dell hp sony 
    location = models.CharField(max_length=200) # H6-103

    allow_types = models.JSONField(default=list, blank=True) # {'pdf', 'docs', 'word'} json string type

    def __str__(self):
        return self.location + " " + self.brand + " " + self.model
    
    def add_allow_types(self, filetypes):
        types = filetypes.split()  # This will be a Python list
        current_types = json.loads(self.allow_types) if self.allow_types else []
        for type in types:
            if type not in current_types:
                current_types.append(type)

        self.allow_types = current_types
        self.save()

    # def get_files(self) -> list:
    #     return json.loads(self.filenames)

