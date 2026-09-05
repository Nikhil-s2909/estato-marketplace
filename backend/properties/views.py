from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Property, Location, PropertyAmenity, Favorite
from .serializers import (
    PropertySerializer,
    LocationSerializer,
    PropertyAmenitySerializer,
    FavoriteSerializer
)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        listing_type = self.request.query_params.get('listing_type')
        if listing_type and listing_type != 'all':
            queryset = queryset.filter(listing_type=listing_type)
            
        city = self.request.query_params.get('city')
        if city:
            queryset = queryset.filter(city__iexact=city)

        property_type = self.request.query_params.get('property_type')
        if property_type:
            queryset = queryset.filter(property_type=property_type)

        min_price = self.request.query_params.get('min_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        max_price = self.request.query_params.get('max_price')
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        bedrooms = self.request.query_params.get('bedrooms')
        if bedrooms:
            queryset = queryset.filter(bedrooms=bedrooms)

        verified = self.request.query_params.get('verified')
        if verified == 'true':
            queryset = queryset.filter(verified=True)

        return queryset

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.AllowAny]
