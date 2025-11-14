from django.db import models
from django.utils.text import slugify
from django.conf import settings

# Related Models
class Dimensions(models.Model):
    width = models.FloatField()
    height = models.FloatField()
    depth = models.FloatField()

class MetaInfo(models.Model):
    createdAt = models.DateTimeField()
    updatedAt = models.DateTimeField()
    barcode = models.CharField(max_length=50)
    qrCode = models.URLField()

class Review(models.Model):
    rating = models.IntegerField()
    comment = models.TextField()
    date = models.DateTimeField()
    reviewerName = models.CharField(max_length=100)
    reviewerEmail = models.EmailField()

# Main Product Model
class Product(models.Model):
    CATEGORY = (
        ("Electronics", "ELECTRONICS"),
        ("Groceries", "GROCERIES"),
        ("Clothing", "CLOTHING"),
        ("Beauty", "BEAUTY"),
    )

    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    images = models.JSONField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discountPercentage = models.FloatField(blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    stock = models.IntegerField(blank=True, null=True)
    tags = models.JSONField(blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    sku = models.CharField(max_length=50, blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    dimensions = models.OneToOneField(Dimensions, on_delete=models.CASCADE, null=True, blank=True)
    warrantyInformation = models.CharField(max_length=100, blank=True, null=True)
    shippingInformation = models.CharField(max_length=100, blank=True, null=True)
    availabilityStatus = models.CharField(max_length=50, blank=True, null=True)
    reviews = models.ManyToManyField(Review, blank=True)
    returnPolicy = models.CharField(max_length=100, blank=True, null=True)
    minimumOrderQuantity = models.IntegerField(blank=True, null=True)
    meta = models.OneToOneField(MetaInfo, on_delete=models.CASCADE, null=True, blank=True)
    category = models.CharField(max_length=15, choices=CATEGORY, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            unique_slug = base_slug
            counter = 1
            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)

# Cart and CartItem remain unchanged except for a small fix
class Cart(models.Model):
    cart_code = models.CharField(max_length=11, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.cart_code

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # ✅ lowercase fix
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart {self.cart.id}"