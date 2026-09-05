import React from 'react';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { AMENITIES_LIST } from '../mock/propertiesData';

export default function FilterPanel() {
  const { filters, updateFilters, resetFilters } = usePropertyContext();

  const handleBedroomsClick = (val) => {
    updateFilters({ bedrooms: filters.bedrooms === val ? '' : val });
  };

  const handleAmenityToggle = (amenity) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilters({ amenities: updated });
  };

  return (
    <aside className="bg-white rounded border border-[#E5E7EB] p-3.5 space-y-4 text-xs text-[#1F2937]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
        <div className="flex items-center gap-1.5 font-bold text-[#002F34]">
          <Filter className="w-3.5 h-3.5 text-[#002F34]" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-bold text-[#6B7280] hover:text-rose-600"
        >
          <RotateCcw className="w-3 h-3" />
          Clear All
        </button>
      </div>

      {/* Purpose */}
      <div>
        <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Listing Purpose</label>
        <div className="grid grid-cols-3 gap-1 bg-[#F9FAFB] p-1 rounded border border-[#E5E7EB]">
          {['all', 'buy', 'rent'].map((type) => (
            <button
              key={type}
              onClick={() => updateFilters({ listingType: type })}
              className={`py-1 font-bold rounded text-center capitalize text-xs ${
                filters.listingType === type
                  ? 'bg-[#002F34] text-white'
                  : 'text-[#4B5563] hover:text-[#002F34]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Property Type</label>
        <select
          value={filters.propertyType}
          onChange={(e) => updateFilters({ propertyType: e.target.value })}
          className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded p-1.5 font-bold text-[#002F34] focus:outline-none focus:border-[#002F34]"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment / Flat</option>
          <option value="house">House / Villa</option>
          <option value="plot">Plot / Land</option>
          <option value="commercial">Commercial Space</option>
          <option value="office">Office Space</option>
          <option value="shop">Shop / Retail</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Price Range (₹)</label>
        <div className="grid grid-cols-2 gap-1.5">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.priceMin}
            onChange={(e) => updateFilters({ priceMin: e.target.value })}
            className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded p-1.5 font-bold text-[#002F34] focus:outline-none focus:border-[#002F34]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={(e) => updateFilters({ priceMax: e.target.value })}
            className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded p-1.5 font-bold text-[#002F34] focus:outline-none focus:border-[#002F34]"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Bedrooms</label>
        <div className="flex gap-1">
          {['1', '2', '3', '4', '5+'].map((num) => (
            <button
              key={num}
              onClick={() => handleBedroomsClick(num)}
              className={`flex-1 py-1 border rounded font-bold text-center text-xs ${
                filters.bedrooms === num
                  ? 'bg-[#002F34] text-white border-[#002F34]'
                  : 'bg-white text-[#002F34] border-[#E5E7EB]'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Toggle */}
      <div className="pt-2 border-t border-[#E5E7EB]">
        <label className="flex items-center justify-between cursor-pointer py-0.5">
          <span className="font-bold text-[#002F34] text-xs">Verified Properties Only</span>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => updateFilters({ verifiedOnly: e.target.checked })}
            className="w-4 h-4 text-[#16A34A] rounded"
          />
        </label>
      </div>

      {/* Amenities List */}
      <div className="pt-2 border-t border-[#E5E7EB]">
        <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Amenities</label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
          {AMENITIES_LIST.map((amenity) => {
            const isSelected = filters.amenities.includes(amenity);
            return (
              <label key={amenity} className="flex items-center gap-2 text-[11px] text-[#1F2937] cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-3.5 h-3.5 text-[#002F34] rounded"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
