from django.contrib import admin
from .models import print_order
from .models import print_file
# Register your models here.
admin.site.register(print_order)
admin.site.register(print_file)