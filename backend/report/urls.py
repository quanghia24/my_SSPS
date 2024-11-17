from django.urls import path, include
from .views import report_view



urlpatterns = [
    path('', report_view, name='report-views'),
]
