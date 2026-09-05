import React, { useState } from 'react';
import { LayoutGrid, List, SlidersHorizontal, MapPin, X, Map, Building2 } from 'lucide-react';
import FilterPanel from '../components/FilterPanel';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import { usePropertyContext } from '../context/PropertyContext';

export default function Properties() {
  const { filteredProperties, filters, updateFilters, resetFilters, viewMode, setViewMode } = usePropertyContext();
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showMapView, setShowMapView] = useState(false);

  const activeBadges = [];
  if (filters.listingType !== 'all') activeBadges.push({ label: `Purpose: ${filters.listingType}`, key: 'listingType', value: 'all' });
  if (filters.city) activeBadges.push({ label: `City: ${filters.city}`, key: 'city', value: '' });
  if (filters.propertyType) activeBadges.push({ label: `Type: ${filters.propertyType}`, key: 'propertyType', value: '' });
  if (filters.bedrooms) activeBadges.push({ label: `Beds: ${filters.bedrooms}`, key: 'bedrooms', value: '' });
  if (filters.status) activeBadges.push({ label: `Status: ${filters.status}`, key: 'status', value: '' });
  if (filters.postedBy) activeBadges.push({ label: `Posted: ${filters.postedBy}`, key: 'postedBy', value: '' });
  if (filters.verifiedOnly) activeBadges.push({ label: 'Verified Only', key: 'verifiedOnly', value: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      
      {/* Search Header Bar */}
      <SearchBar compact />

      {/* Toolbar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E7EB] pb-3">
        <div>
          <h1 className="text-base sm:text-lg font-black text-[#002F34] tracking-tight">
            Real Estate Properties {filters.city ? `in ${filters.city.toUpperCase()}` : 'in Kerala'}
          </h1>
          <p className="text-xs text-[#6B7280]">
            <span className="font-bold text-[#002F34]">{filteredProperties.length}</span> properties found
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#002F34]">
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] rounded px-2 py-1">
            <span className="text-[#6B7280] text-[11px]">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value })}
              className="bg-transparent font-bold text-[#002F34] focus:outline-none cursor-pointer text-xs"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Map View Toggle */}
          <button
            onClick={() => setShowMapView(!showMapView)}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-bold ${
              showMapView
                ? 'bg-[#002F34] text-white border-[#002F34]'
                : 'bg-white text-[#002F34] border-[#E5E7EB] hover:bg-[#F9FAFB]'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>

          {/* Grid / List Switcher */}
          <div className="hidden sm:flex items-center bg-[#F9FAFB] p-0.5 rounded border border-[#E5E7EB]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${
                viewMode === 'grid' ? 'bg-white text-[#002F34] font-bold' : 'text-[#6B7280]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${
                viewMode === 'list' ? 'bg-white text-[#002F34] font-bold' : 'text-[#6B7280]'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Active Filter Pills */}
      {activeBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold text-[#6B7280] text-[11px]">Filters:</span>
          {activeBadges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-[#E6F2F3] text-[#002F34] border border-[#B3D9DC] font-bold px-2 py-0.5 rounded text-[11px]"
            >
              {badge.label}
              <button
                onClick={() => updateFilters({ [badge.key]: badge.value })}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button onClick={resetFilters} className="text-[11px] font-bold text-rose-600 hover:underline ml-1">
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        
        {/* Sidebar Filter Panel */}
        <div className="hidden lg:block lg:col-span-1 sticky top-16">
          <FilterPanel />
        </div>

        {/* Property Grid / List */}
        <div className="lg:col-span-3 space-y-4">
          
          {showMapView && (
            <div className="bg-[#F9FAFB] rounded border border-[#E5E7EB] h-48 flex flex-col items-center justify-center text-[#6B7280] text-xs p-4 text-center space-y-1">
              <MapPin className="w-6 h-6 text-[#002F34]" />
              <p className="font-bold text-[#002F34]">Interactive Map Placeholder</p>
              <p className="max-w-xs text-[11px]">Displaying pins for {filteredProperties.length} active property listings.</p>
            </div>
          )}

          {filteredProperties.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5'
                  : 'space-y-2.5'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} layout={viewMode} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded border border-[#E5E7EB] p-8 text-center space-y-2 max-w-sm mx-auto my-6">
              <Building2 className="w-8 h-8 text-[#6B7280] mx-auto" />
              <h3 className="text-sm font-bold text-[#002F34]">No properties found</h3>
              <p className="text-xs text-[#6B7280]">Try clearing some filters or searching another city.</p>
              <button onClick={resetFilters} className="btn-primary py-1.5 px-3 text-xs">
                Clear Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Floating Filter Button */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-[#002F34] text-white rounded px-4 py-2 flex items-center gap-2 text-xs font-bold shadow-lg">
        <button onClick={() => setMobileFilterOpen(true)} className="flex items-center gap-1.5 text-white">
          <SlidersHorizontal className="w-4 h-4 text-white" />
          <span>Filters ({activeBadges.length})</span>
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      />

    </div>
  );
}
