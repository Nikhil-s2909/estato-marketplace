import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Check } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { properties, deleteProperty } = usePropertyContext();
  const { favorites } = useFavorites();
  const { user } = useAuth();

  const myListings = properties;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      
      {/* Seller Header */}
      <div className="bg-white rounded border border-[#E5E7EB] p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]" />
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-bold text-[#002F34]">{user?.name}</h1>
              <span className="bg-[#16A34A] text-white text-[9px] font-bold px-1 rounded inline-flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" />
                Verified
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280]">{user?.email}</p>
          </div>
        </div>

        <Link to="/post-property" className="btn-primary py-1.5 px-3 text-xs font-bold shrink-0">
          <Plus className="w-3.5 h-3.5" />
          <span>Post Property</span>
        </Link>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-white p-3 rounded border border-[#E5E7EB] space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-[#6B7280]">Active Listings</span>
          <p className="text-lg font-black text-[#002F34]">{myListings.length}</p>
        </div>
        <div className="bg-white p-3 rounded border border-[#E5E7EB] space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-[#6B7280]">Total Views</span>
          <p className="text-lg font-black text-[#002F34]">1,482</p>
        </div>
        <div className="bg-white p-3 rounded border border-[#E5E7EB] space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-[#6B7280]">Saved Favorites</span>
          <p className="text-lg font-black text-[#002F34]">{favorites.length}</p>
        </div>
        <div className="bg-white p-3 rounded border border-[#E5E7EB] space-y-0.5">
          <span className="text-[9px] uppercase font-bold text-[#6B7280]">Buyer Inquiries</span>
          <p className="text-lg font-black text-[#002F34]">34</p>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded border border-[#E5E7EB] overflow-hidden">
        <div className="px-3 py-2.5 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#002F34]">My Property Listings</h3>
          <span className="text-[11px] text-[#6B7280]">{myListings.length} Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase text-[9px] font-bold border-b border-[#E5E7EB]">
              <tr>
                <th className="px-3 py-2">Property</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Views</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium text-[#1F2937]">
              {myListings.map((prop) => (
                <tr key={prop.id} className="hover:bg-[#F9FAFB]">
                  <td className="px-3 py-2 flex items-center gap-2">
                    <img src={prop.images[0]} alt={prop.title} className="w-9 h-7 rounded object-cover" />
                    <div>
                      <Link to={`/properties/${prop.id}`} className="font-bold text-[#002F34] hover:underline line-clamp-1">
                        {prop.title}
                      </Link>
                      <span className="text-[10px] text-[#6B7280]">{prop.location}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-bold text-[#002F34]">{prop.priceFormatted}</td>
                  <td className="px-3 py-2">
                    <span className="bg-[#F0FDF4] text-[#16A34A] font-bold px-1.5 py-0.5 rounded text-[9px]">
                      Active
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[#6B7280]">248</td>
                  <td className="px-3 py-2 text-right space-x-1">
                    <button onClick={() => alert(`Edit: ${prop.title}`)} className="p-1 text-[#6B7280] hover:text-[#002F34]">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteProperty(prop.id)} className="p-1 text-[#6B7280] hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
