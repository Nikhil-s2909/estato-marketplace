import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { AMENITIES_LIST } from '../mock/propertiesData';

export default function MobileFilterDrawer({ isOpen, onClose }) {
  const { filters, updateFilters, resetFilters, filteredProperties } = usePropertyContext();

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60">
      <div className="flex-1" onClick={onClose} />

      <div className="bg-white rounded-t max-h-[85vh] flex flex-col shadow-xl">
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
          <h3 className="text-sm font-bold text-[#002F34]">Filter Properties</h3>
          <button onClick={onClose} className="p-1 text-[#6B7280]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs text-[#1F2937] flex-1">
          <div>
            <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Listing Purpose</label>
            <div className="grid grid-cols-3 gap-1 bg-[#F9FAFB] p-1 rounded border border-[#E5E7EB]">
              {['all', 'buy', 'rent'].map((type) => (
                <button
                  key={type}
                  onClick={() => updateFilters({ listingType: type })}
                  className={`py-1 font-bold rounded text-center capitalize ${
                    filters.listingType === type ? 'bg-[#002F34] text-white' : 'text-[#4B5563]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Location</label>
            <select
              value={filters.city}
              onChange={(e) => updateFilters({ city: e.target.value })}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 font-bold text-[#002F34]"
            >
              <option value="">All Locations</option>
              <option value="trivandrum">Trivandrum</option>
              <option value="kochi">Kochi</option>
              <option value="calicut">Calicut</option>
              <option value="kollam">Kollam</option>
              <option value="kottayam">Kottayam</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilters({ propertyType: e.target.value })}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 font-bold text-[#002F34]"
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

          <div>
            <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Bedrooms</label>
            <div className="flex gap-1">
              {['1', '2', '3', '4', '5+'].map((num) => (
                <button
                  key={num}
                  onClick={() => handleBedroomsClick(num)}
                  className={`flex-1 py-1.5 border rounded font-bold text-center ${
                    filters.bedrooms === num ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-white text-[#002F34] border-[#E5E7EB]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded">
            <span className="font-bold text-[#002F34] text-xs">Verified Properties Only</span>
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => updateFilters({ verifiedOnly: e.target.checked })}
              className="w-4 h-4 text-[#16A34A] rounded"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES_LIST.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-xs text-[#1F2937] font-medium">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-3.5 h-3.5 text-[#002F34] rounded"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="p-3 border-t border-[#E5E7EB] bg-white flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="px-3 py-2 border border-[#E5E7EB] rounded font-bold text-[#6B7280] flex items-center gap-1 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#002F34] text-white py-2 rounded font-bold text-center text-xs"
          >
            Show {filteredProperties.length} Properties
          </button>
        </div>

      </div>
    </div>
  );
}
