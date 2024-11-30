from django.db import models
from user.models import User


class PaperPrice(models.Model):
    price = models.FloatField(default=200)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Current Paper Price: {self.price}"
    
# Create your models here.
class PurchaseOrder(models.Model):
    purchase_time = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
    price = models.FloatField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    total_amount = models.FloatField(default=0, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.price:
            current_price = PaperPrice.objects.last()  # Get the latest price
            if not current_price:
                raise ValueError("Paper price is not set. Please contact the administrator.")
            self.price = current_price.price
        # Calculate the total_amount before saving the instance
        self.total_amount = self.price * self.amount
        super(PurchaseOrder, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.name} bought {self.amount}, paid {self.total_amount}"
