import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Mail, Phone, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-md w-full space-y-6">
        
        {/* Brand Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center text-white mx-auto shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Estato Account</h1>
          <p className="text-xs text-slate-500">Join Kerala's premier real estate marketplace</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Rajesh Menon"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="rajesh.menon@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Mobile Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98470 12345"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all pt-3"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-sky-600 hover:underline">
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}
