from django.urls import path
from .views import set_printer_status

urlpatterns = [
    # Route for the function-based view
    path('<int:pk>/set_status/', set_printer_status, name='set_printer_status'),
]
