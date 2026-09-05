import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Camera, Check } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyCard({ property, layout = 'grid' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const isListLayout = layout === 'list';

  return (
    <div
      className={`group bg-white rounded border border-[#E5E7EB] hover:border-[#002F34] transition-colors duration-150 overflow-hidden ${
        isListLayout ? 'flex flex-col sm:flex-row' : 'flex flex-col'
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-[#F3F4F6] ${isListLayout ? 'sm:w-2/5 shrink-0 aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]'}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
          loading="lazy"
        />

        {/* Photo Count */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1">
          <Camera className="w-3 h-3" />
          <span>{property.images.length}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#4B5563] hover:text-rose-600 transition-colors shadow-2xs"
          aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Purpose Tag */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <span className="bg-[#002F34] text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
            For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
          </span>
          {property.verified && (
            <span className="bg-[#16A34A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-0.5">
              <Check className="w-2.5 h-2.5" />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Property Details Column */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5 text-left">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-0.5">
            <h3 className="text-lg font-extrabold text-[#002F34] tracking-tight">
              {property.priceFormatted}
            </h3>
            <span className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider">
              {property.propertyType}
            </span>
          </div>

          {/* High-Density Inline Specs */}
          <div className="text-xs font-bold text-[#1F2937] mb-1">
            {property.bedrooms > 0 && <span>{property.bedrooms} beds</span>}
            {property.bedrooms > 0 && property.bathrooms > 0 && <span className="mx-1.5 text-[#9CA3AF]">·</span>}
            {property.bathrooms > 0 && <span>{property.bathrooms} baths</span>}
            {property.areaSqFt > 0 && <span className="mx-1.5 text-[#9CA3AF]">·</span>}
            {property.areaSqFt > 0 && <span>{property.areaSqFt.toLocaleString()} sqft</span>}
          </div>

          {/* Title & Location */}
          <Link to={`/properties/${property.id}`} className="block group-hover:text-[#002F34] transition-colors">
            <h4 className="text-xs font-semibold text-[#4B5563] line-clamp-1 leading-snug">
              {property.title}
            </h4>
          </Link>

          <div className="flex items-center gap-1 text-[#6B7280] text-[11px] mt-0.5 truncate">
            <MapPin className="w-3 h-3 text-[#9CA3AF] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>

        {/* Subtle Footer */}
        <div className="pt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#6B7280]">
          <span>{property.postedBy || 'Owner'} · {property.postedAgo}</span>
          <Link to={`/properties/${property.id}`} className="btn-tertiary text-[11px]">
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
