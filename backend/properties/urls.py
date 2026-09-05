from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, LocationViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'locations', LocationViewSet, basename='location')
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),
]
