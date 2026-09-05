import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import PostProperty from './pages/PostProperty';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/:id" element={<PropertyDetails />} />
                  <Route path="/post-property" element={<PostProperty />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
