import React, { useState } from 'react';
import { Check, Phone, MessageSquare, AlertCircle } from 'lucide-react';

export default function SellerCard({ seller }) {
  const [showPhone, setShowPhone] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  if (!seller) return null;

  return (
    <div className="bg-white rounded border border-[#E5E7EB] p-3.5 text-xs space-y-3 text-[#1F2937]">
      
      {/* Seller Identity */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded bg-[#E6F2F3] text-[#002F34] flex items-center justify-center font-bold text-xs border border-[#B3D9DC] shrink-0">
          {seller.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h4 className="text-xs font-bold text-[#002F34]">{seller.name}</h4>
            {seller.verified && (
              <span className="bg-[#16A34A] text-white text-[9px] font-bold px-1 rounded inline-flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" />
                Verified
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#6B7280] block">
            {seller.type || 'Owner'} · Member since {seller.memberSince || '2023'}
          </span>
        </div>
      </div>

      {/* Primary & Secondary Buttons */}
      <div className="space-y-1.5 pt-2 border-t border-[#E5E7EB]">
        <button
          onClick={() => setShowPhone(!showPhone)}
          className="btn-primary w-full py-2 font-bold text-xs"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{showPhone ? seller.phone || '+91 98470 12345' : 'Show Phone Number'}</span>
        </button>

        <button
          onClick={() => setMessageSent(true)}
          className="btn-secondary w-full py-2 font-bold text-xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#002F34]" />
          <span>{messageSent ? 'Inquiry Sent ✓' : 'Contact Owner'}</span>
        </button>
      </div>

      {/* Safety Tip */}
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 flex items-start gap-1.5 text-[10px] text-[#6B7280] leading-normal">
        <AlertCircle className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#002F34]">Safety Tip:</strong> Never transfer money before inspecting property documents in person.
        </p>
      </div>

    </div>
  );
}
