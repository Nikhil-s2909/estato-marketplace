import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, FileText, IndianRupee, Image as ImageIcon, Eye, Check, ArrowRight, ArrowLeft, Trash2, UploadCloud } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { AMENITIES_LIST } from '../mock/propertiesData';
import PropertyCard from '../components/PropertyCard';

const STEPS = [
  { id: 1, title: 'Property' },
  { id: 2, title: 'Location' },
  { id: 3, title: 'Details' },
  { id: 4, title: 'Pricing' },
  { id: 5, title: 'Photos' },
  { id: 6, title: 'Preview' },
];

export default function PostProperty() {
  const navigate = useNavigate();
  const { addProperty } = usePropertyContext();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    listingType: 'buy',
    propertyType: 'apartment',
    city: 'trivandrum',
    location: '',
    title: '',
    price: '',
    bedrooms: '2',
    bathrooms: '2',
    areaSqFt: '1250',
    furnishing: 'semi-furnished',
    parking: 'Covered (1 Slot)',
    status: 'Ready to Move',
    postedBy: 'Owner',
    description: '',
    amenities: ['Parking', 'Lift', '24x7 Security', 'Balcony'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerName: 'Rajesh Menon',
    sellerPhone: '+91 98470 12345',
    sellerEmail: 'rajesh.menon@example.com'
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = addProperty(formData);
    navigate(`/properties/${created.id}`);
  };

  const previewProperty = {
    id: 'preview-1',
    title: formData.title || 'Untitled Property Listing',
    listingType: formData.listingType,
    propertyType: formData.propertyType,
    price: Number(formData.price || 0),
    priceFormatted: formData.listingType === 'rent'
      ? `₹${Number(formData.price || 0).toLocaleString()} / mo`
      : `₹${(Number(formData.price || 0) / 100000).toFixed(0)} Lakh`,
    location: formData.location || 'Location Address',
    city: formData.city,
    bedrooms: Number(formData.bedrooms || 0),
    bathrooms: Number(formData.bathrooms || 0),
    areaSqFt: Number(formData.areaSqFt || 0),
    furnishing: formData.furnishing,
    parking: formData.parking,
    status: formData.status,
    postedBy: formData.postedBy,
    postedAgo: 'Just now',
    verified: true,
    featured: false,
    images: formData.images,
    description: formData.description,
    amenities: formData.amenities
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      
      <div className="text-center space-y-0.5">
        <h1 className="text-xl font-extrabold text-[#002F34]">Post Your Property</h1>
        <p className="text-xs text-[#6B7280]">Complete the form to list your property on Estato</p>
      </div>

      {/* Stepper Header */}
      <div className="bg-white rounded border border-[#E5E7EB] p-2.5">
        <div className="flex items-center justify-between px-2">
          {STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center gap-1">
                <button
                  onClick={() => isCompleted && setCurrentStep(step.id)}
                  className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                    isCompleted
                      ? 'bg-[#16A34A] text-white'
                      : isCurrent
                        ? 'bg-[#002F34] text-white'
                        : 'bg-[#F9FAFB] text-[#6B7280] border border-[#E5E7EB]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.id}
                </button>
                <span className={`hidden sm:inline text-xs font-bold ${isCurrent ? 'text-[#002F34]' : 'text-[#6B7280]'}`}>
                  {step.title}
                </span>
                {idx < STEPS.length - 1 && (
                  <div className={`w-3 sm:w-6 h-0.5 mx-0.5 ${isCompleted ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded border border-[#E5E7EB] p-5 text-xs text-[#1F2937] space-y-4">
        
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5 text-[#002F34]">1. Listing Purpose & Type</h2>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Listing Purpose</label>
              <div className="flex gap-2 max-w-xs">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, listingType: 'buy' }))}
                  className={`flex-1 py-2 rounded border font-bold text-xs ${
                    formData.listingType === 'buy' ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5563]'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, listingType: 'rent' }))}
                  className={`flex-1 py-2 rounded border font-bold text-xs ${
                    formData.listingType === 'rent' ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#4B5563]'
                  }`}
                >
                  For Rent
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Property Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { id: 'apartment', name: 'Apartment / Flat' },
                  { id: 'house', name: 'House / Villa' },
                  { id: 'plot', name: 'Plot / Land' },
                  { id: 'commercial', name: 'Commercial Space' },
                  { id: 'office', name: 'Office Space' },
                  { id: 'shop', name: 'Shop / Showroom' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, propertyType: cat.id }))}
                    className={`p-2 rounded border font-bold text-xs text-left ${
                      formData.propertyType === cat.id ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#002F34]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Posted By</label>
              <div className="flex gap-2 max-w-xs">
                {['Owner', 'Builder', 'Agent'].map((pb) => (
                  <button
                    key={pb}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, postedBy: pb }))}
                    className={`flex-1 py-1.5 rounded border text-xs font-bold ${
                      formData.postedBy === pb ? 'bg-[#002F34] text-white border-[#002F34]' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#002F34]'
                    }`}
                  >
                    {pb}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5 text-[#002F34]">2. Property Location</h2>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">City / District</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34] focus:border-[#002F34] focus:outline-none"
              >
                <option value="trivandrum">Trivandrum (Thiruvananthapuram)</option>
                <option value="kochi">Kochi (Ernakulam)</option>
                <option value="calicut">Calicut (Kozhikode)</option>
                <option value="kollam">Kollam</option>
                <option value="kottayam">Kottayam</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Locality / Address</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Kowdiar Main Road, Near Kowdiar Palace"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-semibold text-[#002F34] focus:border-[#002F34] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5 text-[#002F34]">3. Specifications</h2>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Property Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Modern 3 BHK Luxury Apartment in Kowdiar"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34] focus:border-[#002F34] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34]"
                >
                  <option value="0">0 (Plot/Commercial)</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34]"
                >
                  <option value="1">1 Bath</option>
                  <option value="2">2 Baths</option>
                  <option value="3">3 Baths</option>
                  <option value="4">4+ Baths</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Area (sqft)</label>
                <input
                  type="number"
                  name="areaSqFt"
                  placeholder="e.g. 1850"
                  value={formData.areaSqFt}
                  onChange={handleChange}
                  className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Describe key features..."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded p-2 text-xs text-[#1F2937] focus:border-[#002F34] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5 text-[#002F34]">4. Pricing & Status</h2>

            <div>
              <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="9500000"
                value={formData.price}
                onChange={handleChange}
                className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34] focus:border-[#002F34] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34]"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1 text-[10px] uppercase text-[#6B7280]">Furnishing</label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="w-full h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded px-2.5 font-bold text-[#002F34]"
                >
                  <option value="fully-furnished">Fully Furnished</option>
                  <option value="semi-furnished">Semi-Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {currentStep === 5 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5 text-[#002F34]">5. Property Photos</h2>

            <div className="border border-dashed border-[#E5E7EB] bg-[#F9FAFB] rounded p-4 text-center space-y-2">
              <UploadCloud className="w-6 h-6 text-[#002F34] mx-auto" />
              <div className="flex items-center gap-2 max-w-sm mx-auto">
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 bg-white border border-[#E5E7EB] rounded h-8 px-2 text-xs focus:outline-none"
                />
                <button type="button" onClick={handleAddImageUrl} className="btn-primary py-1 px-3 text-xs font-bold">
                  Add
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative rounded overflow-hidden h-20 border border-[#E5E7EB]">
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-1 right-1 p-0.5 bg-rose-600 text-white rounded">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6 */}
        {currentStep === 6 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] pb-1.5 text-[#002F34]">6. Preview Listing</h2>
            <div className="max-w-xs mx-auto">
              <PropertyCard property={previewProperty} />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`btn-secondary py-1.5 px-3 text-xs ${currentStep === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          {currentStep < 6 ? (
            <button type="button" onClick={handleNext} className="btn-primary py-1.5 px-4 text-xs font-bold">
              Next
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className="bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-xs py-2 px-5 rounded transition-colors inline-flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Publish Listing
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
