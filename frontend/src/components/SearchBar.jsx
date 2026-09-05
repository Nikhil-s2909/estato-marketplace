import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2 } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

export default function SearchBar({ compact = false }) {
  const navigate = useNavigate();
  const { filters, updateFilters } = usePropertyContext();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/properties');
  };

  return (
    <div className="bg-white rounded border border-[#E5E7EB] p-3 text-left shadow-2xs">
      
      {/* Segmented Controls */}
      <div className="flex items-center gap-1 mb-2.5 border-b border-[#F3F4F6] pb-2">
        <button
          type="button"
          onClick={() => updateFilters({ listingType: 'buy' })}
          className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
            filters.listingType === 'buy'
              ? 'bg-[#002F34] text-white'
              : 'bg-[#F9FAFB] text-[#4B5563] hover:text-[#002F34] border border-[#E5E7EB]'
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => updateFilters({ listingType: 'rent' })}
          className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
            filters.listingType === 'rent'
              ? 'bg-[#002F34] text-white'
              : 'bg-[#F9FAFB] text-[#4B5563] hover:text-[#002F34] border border-[#E5E7EB]'
          }`}
        >
          Rent
        </button>
        <button
          type="button"
          onClick={() => updateFilters({ listingType: 'all' })}
          className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
            filters.listingType === 'all'
              ? 'bg-[#002F34] text-white'
              : 'text-[#6B7280] hover:text-[#002F34]'
          }`}
        >
          All
        </button>
      </div>

      {/* Main Search Inputs Row */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        
        {/* Location Select */}
        <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 py-1.5 focus-within:border-[#002F34]">
          <MapPin className="w-3.5 h-3.5 text-[#002F34] shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-[9px] uppercase font-bold text-[#6B7280]">Location</label>
            <select
              value={filters.city}
              onChange={(e) => updateFilters({ city: e.target.value })}
              className="bg-transparent text-xs font-bold text-[#002F34] focus:outline-none cursor-pointer w-full"
            >
              <option value="">All Locations</option>
              <option value="trivandrum">Trivandrum</option>
              <option value="kochi">Kochi</option>
              <option value="calicut">Calicut</option>
              <option value="kollam">Kollam</option>
              <option value="kottayam">Kottayam</option>
            </select>
          </div>
        </div>

        {/* Property Type Select */}
        <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 py-1.5 focus-within:border-[#002F34]">
          <Building2 className="w-3.5 h-3.5 text-[#002F34] shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-[9px] uppercase font-bold text-[#6B7280]">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilters({ propertyType: e.target.value })}
              className="bg-transparent text-xs font-bold text-[#002F34] focus:outline-none cursor-pointer w-full"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartments</option>
              <option value="house">Houses & Villas</option>
              <option value="plot">Plots & Land</option>
              <option value="commercial">Commercial</option>
              <option value="office">Office Spaces</option>
              <option value="shop">Shops & Retail</option>
            </select>
          </div>
        </div>

        {/* Keyword Search */}
        <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 py-1.5 focus-within:border-[#002F34]">
          <Search className="w-3.5 h-3.5 text-[#002F34] shrink-0" />
          <div className="flex flex-col w-full">
            <label className="text-[9px] uppercase font-bold text-[#6B7280]">Locality / Keyword</label>
            <input
              type="text"
              placeholder="e.g. Kowdiar, Technopark"
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="bg-transparent text-xs font-bold text-[#002F34] placeholder:text-slate-400 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Submit Search Button */}
        <button type="submit" className="btn-primary w-full h-full font-bold">
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>

      </form>
    </div>
  );
}
