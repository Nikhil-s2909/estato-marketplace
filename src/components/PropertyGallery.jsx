import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  if (!images.length) return null;

  const currentImage = images[selectedIndex] || images[0];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-2">
      {/* 16:10 Aspect Hero Image */}
      <div className="relative rounded overflow-hidden bg-slate-900 aspect-[16/10] border border-[#E5E7EB]">
        <img
          src={currentImage}
          alt={`Property view ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <button
          onClick={() => setFullscreenOpen(true)}
          className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 hover:bg-black text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>View All ({images.length})</span>
        </button>
      </div>

      {/* Horizontal Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-20 h-14 rounded overflow-hidden shrink-0 border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-[#002F34]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {fullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentImage}
            alt="Fullscreen photo"
            className="max-w-full max-h-[85vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
}
