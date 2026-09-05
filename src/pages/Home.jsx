import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Home as HomeIcon, LandPlot, Building, Briefcase, Store, ArrowRight, Plus } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { usePropertyContext } from '../context/PropertyContext';
import { PROPERTY_TYPES, LOCATIONS } from '../mock/propertiesData';

export default function Home() {
  const navigate = useNavigate();
  const { properties, updateFilters } = usePropertyContext();

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-4 h-4 text-[#002F34]" />;
      case 'Home': return <HomeIcon className="w-4 h-4 text-[#002F34]" />;
      case 'LandPlot': return <LandPlot className="w-4 h-4 text-[#002F34]" />;
      case 'Building': return <Building className="w-4 h-4 text-[#002F34]" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-[#002F34]" />;
      case 'Store': return <Store className="w-4 h-4 text-[#002F34]" />;
      default: return <Building2 className="w-4 h-4 text-[#002F34]" />;
    }
  };

  const handleCategoryClick = (typeId) => {
    updateFilters({ propertyType: typeId });
    navigate('/properties');
  };

  const handleLocationClick = (cityId) => {
    updateFilters({ city: cityId });
    navigate('/properties');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Search Header Bar */}
      <section className="bg-white border-b border-[#E5E7EB] py-6 px-4">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-[#002F34] tracking-tight">
              Real Estate Properties for Sale & Rent in Kerala
            </h1>
            <span className="text-xs text-[#6B7280]">Verified Marketplace</span>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4 border-b border-[#E5E7EB] pb-2">
          <h2 className="text-base font-bold text-[#002F34]">Featured Listings</h2>
          <Link to="/properties" className="btn-tertiary">
            View All Properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Categories Row */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="mb-3 border-b border-[#E5E7EB] pb-2">
          <h2 className="text-base font-bold text-[#002F34]">Property Categories</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PROPERTY_TYPES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="bg-white p-3 rounded border border-[#E5E7EB] hover:border-[#002F34] transition-colors text-left flex items-center gap-2.5"
            >
              {getCategoryIcon(cat.icon)}
              <div>
                <h3 className="text-xs font-bold text-[#002F34]">{cat.name}</h3>
                <p className="text-[10px] text-[#6B7280]">{cat.count}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Cities */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="mb-3 border-b border-[#E5E7EB] pb-2">
          <h2 className="text-base font-bold text-[#002F34]">Explore Cities</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleLocationClick(loc.id)}
              className="group relative rounded overflow-hidden h-32 border border-[#E5E7EB] text-left"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-end text-white">
                <span className="text-xs font-bold">{loc.name}</span>
                <span className="text-[10px] text-slate-300">{loc.count}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Post Property CTA Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#002F34] rounded p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-base font-bold">Have a property to sell or rent?</h2>
            <p className="text-slate-200 text-xs">Post your property listing on Estato to reach buyers directly.</p>
          </div>
          <Link to="/post-property" className="bg-white text-[#002F34] hover:bg-[#F0F7F7] py-2 px-5 text-xs font-bold shrink-0 rounded transition-colors inline-flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>Post Property Free</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
