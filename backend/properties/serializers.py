from rest_framework import serializers
from .models import Property, PropertyImage, PropertyAmenity, Location, Favorite

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image_url', 'is_primary']

class PropertyAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAmenity
        fields = ['id', 'name']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'city', 'state', 'image_url']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    amenities = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=PropertyAmenity.objects.all(),
        required=False
    )

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'listing_type', 'property_type', 'price',
            'location_text', 'city', 'bedrooms', 'bathrooms', 'area_sqft',
            'furnishing', 'parking', 'status', 'posted_by', 'description',
            'verified', 'featured', 'amenities', 'images', 'created_at'
        ]

class FavoriteSerializer(serializers.ModelSerializer):
    property_details = PropertySerializer(source='property', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'property', 'property_details', 'created_at']
