from django.db import models
from user.models import Student
# Create your models here.
class purchase_order(models.Model):
    purchase_time = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
    price = models.FloatField()
    status = models.CharField(max_length=10, choices=[('unpaid', 'Unpaid'), ('paid', 'Paid')], default='unpaid')
    student_id = models.ForeignKey(Student, related_name="purchase_orders", on_delete=models.CASCADE)

    