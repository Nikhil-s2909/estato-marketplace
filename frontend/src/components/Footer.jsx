import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] text-xs text-[#64748B] py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#0066FF] flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-base font-black tracking-tight text-[#1F2937]">ESTATO</span>
            </div>
            <p className="text-[#64748B] text-xs leading-relaxed max-w-sm">
              The simple, trustworthy real estate marketplace for Kerala. Search verified homes, apartments, plots, and commercial properties directly from owners and builders.
            </p>
            <div className="flex items-center gap-1.5 text-[#16A34A] text-[11px] font-semibold bg-[#F0FDF4] px-2.5 py-1 rounded border border-[#DCFCE7] w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Property Listings
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-xs">Categories</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/properties?type=apartment" className="hover:text-[#0066FF] transition-colors">Apartments & Flats</Link></li>
              <li><Link to="/properties?type=house" className="hover:text-[#0066FF] transition-colors">Houses & Villas</Link></li>
              <li><Link to="/properties?type=plot" className="hover:text-[#0066FF] transition-colors">Plots & Land</Link></li>
              <li><Link to="/properties?type=commercial" className="hover:text-[#0066FF] transition-colors">Commercial Space</Link></li>
              <li><Link to="/properties?type=office" className="hover:text-[#0066FF] transition-colors">Office Spaces</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-xs">Popular Cities</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/properties?city=trivandrum" className="hover:text-[#0066FF] transition-colors">Trivandrum Real Estate</Link></li>
              <li><Link to="/properties?city=kochi" className="hover:text-[#0066FF] transition-colors">Kochi Real Estate</Link></li>
              <li><Link to="/properties?city=calicut" className="hover:text-[#0066FF] transition-colors">Calicut Real Estate</Link></li>
              <li><Link to="/properties?city=kollam" className="hover:text-[#0066FF] transition-colors">Kollam Real Estate</Link></li>
              <li><Link to="/properties?city=kottayam" className="hover:text-[#0066FF] transition-colors">Kottayam Real Estate</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-xs">Platform & Support</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link to="/post-property" className="hover:text-[#0066FF] transition-colors">Post Property Free</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#0066FF] transition-colors">Seller Dashboard</Link></li>
              <li><a href="#" className="hover:text-[#0066FF] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#0066FF] transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} ESTATO Technologies. All rights reserved.</p>
          <div className="flex gap-4 text-[#64748B]">
            <a href="#" className="hover:text-[#1F2937]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1F2937]">Terms of Use</a>
            <a href="#" className="hover:text-[#1F2937]">Safety Tips</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
