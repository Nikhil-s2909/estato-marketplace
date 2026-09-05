import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Heart, Share2, Bed, Bath, Square, Check, Map } from 'lucide-react';
import PropertyGallery from '../components/PropertyGallery';
import SellerCard from '../components/SellerCard';
import PropertyCard from '../components/PropertyCard';
import { usePropertyContext } from '../context/PropertyContext';
import { useFavorites } from '../context/FavoritesContext';

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties } = usePropertyContext();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [copied, setCopied] = useState(false);

  const property = properties.find((p) => p.id === id) || properties[0];
  const favorite = isFavorite(property.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.propertyType === property.propertyType || p.city === property.city))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      
      {/* Title & Price Bar */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-[#E5E7EB] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold">
            <span className="bg-[#002F34] text-white uppercase px-1.5 py-0.5 rounded">
              For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
            </span>
            {property.verified && (
              <span className="bg-[#16A34A] text-white px-1.5 py-0.5 rounded inline-flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" />
                Verified
              </span>
            )}
            <span className="bg-[#F9FAFB] text-[#002F34] border border-[#E5E7EB] px-1.5 py-0.5 rounded uppercase">
              {property.propertyType}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-[#002F34] tracking-tight leading-snug">
            {property.title}
          </h1>

          <div className="flex items-center gap-1 text-[#6B7280] text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#002F34] shrink-0" />
            <span className="font-bold text-[#002F34]">{property.location}</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="text-2xl font-black text-[#002F34]">
            {property.priceFormatted}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-bold transition-colors ${
                favorite
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-[#002F34] border-[#E5E7EB] hover:bg-[#F9FAFB]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorite ? 'fill-rose-600' : ''}`} />
              <span>{favorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#002F34] text-xs font-bold"
            >
              <Share2 className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: LEFT 65%, RIGHT 35% */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Gallery */}
          <PropertyGallery images={property.images} />

          {/* Overview Metadata Table */}
          <div className="bg-white rounded border border-[#E5E7EB] p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-[#002F34] uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5">
              Property Overview
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Bedrooms</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block">{property.bedrooms || 'N/A'}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Bathrooms</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block">{property.bathrooms || 'N/A'}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Super Area</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block">{property.areaSqFt ? `${property.areaSqFt.toLocaleString()} sqft` : 'N/A'}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Status</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block truncate">{property.status}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Furnishing</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block capitalize truncate">{property.furnishing}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Parking</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block truncate">{property.parking}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Floor Level</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block truncate">{property.floor || 'Ground'}</span>
              </div>
              <div className="p-2 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                <span className="text-[#6B7280] block text-[9px] uppercase font-bold">Age</span>
                <span className="font-bold text-[#002F34] text-xs mt-0.5 block truncate">{property.age || 'Ready'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded border border-[#E5E7EB] p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-[#002F34] uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5">
              Description
            </h3>
            <p className="text-xs text-[#1F2937] leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white rounded border border-[#E5E7EB] p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-[#002F34] uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5">
              Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-bold text-[#002F34]">
              {property.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1.5 p-1.5 bg-[#F9FAFB] rounded border border-[#E5E7EB]">
                  <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-white rounded border border-[#E5E7EB] p-3.5 space-y-2">
            <h3 className="text-xs font-bold text-[#002F34] uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5">
              Location Map
            </h3>
            <div className="bg-[#F9FAFB] rounded border border-[#E5E7EB] h-40 flex flex-col items-center justify-center text-[#6B7280] text-xs p-3 text-center space-y-1">
              <Map className="w-5 h-5 text-[#002F34]" />
              <span className="font-bold text-[#002F34]">{property.location}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Seller Card */}
        <div className="lg:col-span-1 sticky top-16">
          <SellerCard seller={property.seller} />
        </div>

      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
          <h2 className="text-sm font-bold text-[#002F34]">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
