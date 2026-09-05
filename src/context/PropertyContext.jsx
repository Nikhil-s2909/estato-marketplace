import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_PROPERTIES } from '../mock/propertiesData';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  // Filter state
  const [filters, setFilters] = useState({
    listingType: 'all', // 'all' | 'buy' | 'rent'
    city: '',
    propertyType: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '', // '' | '1' | '2' | '3' | '4' | '5+'
    bathrooms: '',
    status: '', // 'Ready to Move' | 'Under Construction'
    postedBy: '', // 'Owner' | 'Builder' | 'Agent'
    verifiedOnly: false,
    amenities: [],
    searchQuery: '',
    sortBy: 'relevance' // 'relevance' | 'price-asc' | 'price-desc' | 'newest'
  });

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      listingType: 'all',
      city: '',
      propertyType: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      status: '',
      postedBy: '',
      verifiedOnly: false,
      amenities: [],
      searchQuery: '',
      sortBy: 'relevance'
    });
  };

  const addProperty = (newPropData) => {
    const formattedPrice = newPropData.listingType === 'rent'
      ? `₹${Number(newPropData.price).toLocaleString()} / mo`
      : newPropData.price >= 10000000
        ? `₹${(newPropData.price / 10000000).toFixed(2)} Cr`
        : `₹${(newPropData.price / 100000).toFixed(0)} Lakh`;

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: newPropData.title,
      listingType: newPropData.listingType,
      propertyType: newPropData.propertyType,
      price: Number(newPropData.price),
      priceFormatted: formattedPrice,
      location: newPropData.location,
      city: newPropData.city || 'trivandrum',
      bedrooms: Number(newPropData.bedrooms || 0),
      bathrooms: Number(newPropData.bathrooms || 0),
      areaSqFt: Number(newPropData.areaSqFt || 0),
      furnishing: newPropData.furnishing || 'unfurnished',
      parking: newPropData.parking || 'Available',
      status: newPropData.status || 'Ready to Move',
      postedBy: newPropData.postedBy || 'Owner',
      postedAgo: 'Just now',
      verified: true,
      featured: false,
      images: newPropData.images && newPropData.images.length > 0
        ? newPropData.images
        : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      description: newPropData.description || '',
      amenities: newPropData.amenities || [],
      seller: {
        name: newPropData.sellerName || 'You (Listing Owner)',
        type: newPropData.postedBy || 'Owner',
        memberSince: 'Today',
        verified: true,
        phone: newPropData.sellerPhone || '+91 98000 00000',
        email: newPropData.sellerEmail || 'owner@example.com'
      },
      floor: newPropData.floor || 'Ground Floor',
      age: 'New Listing'
    };

    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  // Filtered and sorted properties computation
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Listing type buy/rent
      if (filters.listingType !== 'all' && p.listingType !== filters.listingType) {
        return false;
      }
      // City
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      // Property type
      if (filters.propertyType && p.propertyType !== filters.propertyType) {
        return false;
      }
      // Price min
      if (filters.priceMin && p.price < Number(filters.priceMin)) {
        return false;
      }
      // Price max
      if (filters.priceMax && p.price > Number(filters.priceMax)) {
        return false;
      }
      // Bedrooms
      if (filters.bedrooms) {
        if (filters.bedrooms === '5+' && p.bedrooms < 5) return false;
        if (filters.bedrooms !== '5+' && p.bedrooms !== Number(filters.bedrooms)) return false;
      }
      // Bathrooms
      if (filters.bathrooms && p.bathrooms !== Number(filters.bathrooms)) {
        return false;
      }
      // Status
      if (filters.status && p.status !== filters.status) {
        return false;
      }
      // Posted By
      if (filters.postedBy && p.postedBy !== filters.postedBy) {
        return false;
      }
      // Verified only
      if (filters.verifiedOnly && !p.verified) {
        return false;
      }
      // Amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) => p.amenities?.includes(a));
        if (!hasAllAmenities) return false;
      }
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLoc = p.location.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // relevance / default
    });
  }, [properties, filters]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        filters,
        updateFilters,
        resetFilters,
        viewMode,
        setViewMode,
        addProperty,
        deleteProperty
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => useContext(PropertyContext);
