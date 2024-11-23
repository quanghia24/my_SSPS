from django.db import models
from user.models import User

# Create your models here.
class PurchaseOrder(models.Model):
    purchase_time = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
    price = models.FloatField(default=2.25)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    total_amount = models.FloatField(default=0, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Calculate the total_amount before saving the instance
        self.total_amount = self.price * self.amount
        super(PurchaseOrder, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.name} bought {self.amount}, paid {self.total_amount}"
