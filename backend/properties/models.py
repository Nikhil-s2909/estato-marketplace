from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, default='Kerala')
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}, {self.city}"

class PropertyAmenity(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Property(models.Model):
    LISTING_TYPE_CHOICES = (
        ('buy', 'For Sale'),
        ('rent', 'For Rent'),
    )

    PROPERTY_TYPE_CHOICES = (
        ('apartment', 'Apartment'),
        ('house', 'House/Villa'),
        ('plot', 'Plot/Land'),
        ('commercial', 'Commercial'),
        ('office', 'Office Space'),
        ('shop', 'Shop/Retail'),
    )

    POSTED_BY_CHOICES = (
        ('Owner', 'Owner'),
        ('Builder', 'Builder'),
        ('Agent', 'Agent'),
    )

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties', null=True, blank=True)
    title = models.CharField(max_length=255)
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPE_CHOICES, default='buy')
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES, default='apartment')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location_text = models.CharField(max_length=255)
    city = models.CharField(max_length=100, default='trivandrum')
    bedrooms = models.IntegerField(default=0)
    bathrooms = models.IntegerField(default=0)
    area_sqft = models.IntegerField(default=0)
    furnishing = models.CharField(max_length=50, default='semi-furnished')
    parking = models.CharField(max_length=100, default='Available')
    status = models.CharField(max_length=50, default='Ready to Move')
    posted_by = models.CharField(max_length=20, choices=POSTED_BY_CHOICES, default='Owner')
    description = models.TextField(blank=True)
    verified = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    amenities = models.ManyToManyField(PropertyAmenity, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.property.title}"

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'property')

    def __str__(self):
        return f"{self.user.username} saved {self.property.title}"
