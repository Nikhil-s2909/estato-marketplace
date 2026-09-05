import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { usePropertyContext } from '../context/PropertyContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { properties } = usePropertyContext();
  const { favorites } = useFavorites();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#1F2937] flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            Saved Properties
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            {savedProperties.length} properties saved for your quick reference
          </p>
        </div>

        {savedProperties.length > 0 && (
          <Link to="/properties" className="btn-secondary py-1.5 px-3 text-xs">
            <Search className="w-3.5 h-3.5" />
            <span>Explore More</span>
          </Link>
        )}
      </div>

      {/* Grid or Empty State */}
      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center space-y-3 max-w-sm mx-auto my-8">
          <Heart className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-sm font-bold text-[#1F2937]">No saved properties yet</h3>
          <p className="text-xs text-[#64748B]">Explore real estate listings and tap the heart icon on any property card to save it.</p>
          <Link to="/properties" className="btn-primary py-2 px-4 text-xs font-bold">
            Explore Properties
          </Link>
        </div>
      )}

    </div>
  );
}
