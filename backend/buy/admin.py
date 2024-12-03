from django.contrib import admin
from .models import PurchaseOrder, PaperPrice

# Register your models here.
admin.site.register(PurchaseOrder)
admin.site.register(PaperPrice)
