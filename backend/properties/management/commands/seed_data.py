from django.core.management.base import BaseCommand
from properties.models import Property, PropertyImage, PropertyAmenity, Location

class Command(BaseCommand):
    help = 'Seeds initial property marketplace data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding real estate data...')

        # Amenities
        amenities_data = [
            'Parking', 'Lift', '24x7 Security', 'Balcony',
            'Power Backup', 'Gym', 'Swimming Pool', 'Clubhouse'
        ]
        amenity_objs = {}
        for name in amenities_data:
            obj, _ = PropertyAmenity.objects.get_or_create(name=name)
            amenity_objs[name] = obj

        # Locations
        loc1, _ = Location.objects.get_or_create(name='Kowdiar', city='Trivandrum', state='Kerala')
        loc2, _ = Location.objects.get_or_create(name='Edapally', city='Kochi', state='Kerala')

        # Property 1
        p1, _ = Property.objects.get_or_create(
            title='Modern 3 BHK Luxury Apartment in Kowdiar',
            defaults={
                'listing_type': 'buy',
                'property_type': 'apartment',
                'price': 9500000,
                'location_text': 'Kowdiar, Trivandrum',
                'city': 'trivandrum',
                'bedrooms': 3,
                'bathrooms': 3,
                'area_sqft': 1850,
                'furnishing': 'semi-furnished',
                'parking': 'Covered (1 Slot)',
                'status': 'Ready to Move',
                'posted_by': 'Owner',
                'description': 'Beautifully crafted 3 BHK luxury apartment in Kowdiar.',
                'verified': True,
                'featured': True,
            }
        )
        p1.amenities.set([amenity_objs['Parking'], amenity_objs['Lift'], amenity_objs['Gym']])
        PropertyImage.objects.get_or_create(
            property=p1,
            image_url='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            is_primary=True
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))
