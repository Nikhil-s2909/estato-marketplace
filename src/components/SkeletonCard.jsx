import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden animate-pulse">
      <div className="bg-slate-200 aspect-[4/3] w-full" />
      <div className="p-3.5 space-y-2.5">
        <div className="h-5 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="h-7 bg-slate-100 rounded w-full" />
      </div>
    </div>
  );
}
