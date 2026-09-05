import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Heart, Plus, MapPin, ChevronDown, LogOut, LayoutDashboard, Bookmark, Menu, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { usePropertyContext } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  const { filters, updateFilters } = usePropertyContext();
  const { user, logout } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleListingTypeClick = (type) => {
    updateFilters({ listingType: type });
    if (location.pathname !== '/properties') {
      navigate('/properties');
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    updateFilters({ city });
    if (location.pathname !== '/properties') {
      navigate('/properties');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] h-14 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
        
        {/* Logo & Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8">
          
          {/* Logo Mark */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#002F34] flex items-center justify-center text-white font-bold shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black tracking-tight text-[#002F34]">ESTATO</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-[#002F34]">REAL ESTATE</span>
            </div>
          </Link>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
            <button
              onClick={() => handleListingTypeClick('buy')}
              className={`py-4 border-b-2 transition-colors ${
                filters.listingType === 'buy'
                  ? 'border-[#002F34] text-[#002F34]'
                  : 'border-transparent text-[#4B5563] hover:text-[#002F34]'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => handleListingTypeClick('rent')}
              className={`py-4 border-b-2 transition-colors ${
                filters.listingType === 'rent'
                  ? 'border-[#002F34] text-[#002F34]'
                  : 'border-transparent text-[#4B5563] hover:text-[#002F34]'
              }`}
            >
              Rent
            </button>
            <Link
              to="/properties"
              className={`py-4 border-b-2 transition-colors ${
                location.pathname === '/properties' && filters.listingType === 'all'
                  ? 'border-[#002F34] text-[#002F34]'
                  : 'border-transparent text-[#4B5563] hover:text-[#002F34]'
              }`}
            >
              All Properties
            </Link>
          </nav>
        </div>

        {/* Location Dropdown */}
        <div className="hidden lg:flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 py-1 text-xs text-[#002F34]">
          <MapPin className="w-3.5 h-3.5 text-[#002F34] shrink-0" />
          <select
            value={filters.city}
            onChange={handleCityChange}
            className="bg-transparent font-bold text-[#002F34] focus:outline-none cursor-pointer text-xs"
          >
            <option value="">All Locations</option>
            <option value="trivandrum">Trivandrum</option>
            <option value="kochi">Kochi</option>
            <option value="calicut">Calicut</option>
            <option value="kollam">Kollam</option>
            <option value="kottayam">Kottayam</option>
          </select>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Favorites Link */}
          <Link
            to="/favorites"
            className="relative p-1.5 text-[#002F34] hover:text-[#00454C] transition-colors"
            title="Saved Properties"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#002F34] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Post Property Button */}
          <Link
            to="/post-property"
            className="hidden sm:inline-flex items-center gap-1 bg-[#002F34] hover:bg-[#00454C] text-white font-bold text-xs px-3.5 py-1.5 rounded transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Post Property</span>
          </Link>

          {/* User Account */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors"
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="hidden md:inline text-xs font-bold text-[#002F34]">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#002F34] hidden md:inline" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-44 bg-white rounded border border-[#E5E7EB] shadow-md py-1 z-50 text-xs text-[#002F34]"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#E5E7EB]">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-[10px] text-[#6B7280] truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#F0F7F7]"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#002F34]" />
                    Dashboard
                  </Link>
                  <Link
                    to="/favorites"
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#F0F7F7]"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#002F34]" />
                    Saved Properties ({favorites.length})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-50 text-rose-600 font-bold border-t border-[#E5E7EB] text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-xs font-bold text-[#002F34] hover:underline">
                Log In
              </Link>
              <Link to="/register" className="text-xs font-bold bg-[#002F34] text-white px-2.5 py-1 rounded">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-[#002F34]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white border-b border-[#E5E7EB] px-4 py-3 space-y-2 shadow-md z-50 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => { handleListingTypeClick('buy'); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 border rounded text-center font-bold ${
                filters.listingType === 'buy' ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-white text-[#002F34] border-[#E5E7EB]'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => { handleListingTypeClick('rent'); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 border rounded text-center font-bold ${
                filters.listingType === 'rent' ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-white text-[#002F34] border-[#E5E7EB]'
              }`}
            >
              Rent
            </button>
          </div>
          <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold text-[#002F34]">
            All Properties
          </Link>
          <Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-bold text-[#002F34]">
            Saved Properties ({favorites.length})
          </Link>
          <Link to="/post-property" onClick={() => setMobileMenuOpen(false)} className="block bg-[#002F34] text-white text-center py-2 rounded font-bold">
            Post Property Free
          </Link>
        </div>
      )}
    </header>
  );
}
