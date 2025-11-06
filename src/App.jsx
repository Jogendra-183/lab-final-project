 import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import ArtistDashboard  from './pages/ArtistDashboard.jsx';
import VisitorDashboard from './pages/VisitorDashboard.jsx';
import CuratorDashboard from './pages/CuratorDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ExhibitionPage from './pages/ExhibitionPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

import './App.css';

// ⬇️ Animation engine
import initAnimator from './utils/animator';

function App() {
  useEffect(() => {
    initAnimator(); // boot once
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content" data-animate="fade-up">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visitor-dashboard" element={<VisitorDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/exhibition" element={<ExhibitionPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/artist-dashboard"
            element={
              <ProtectedRoute allowedRoles={['artist']}>
                <ArtistDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curator-dashboard"
            element={
              <ProtectedRoute allowedRoles={['curator']}>
                <CuratorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
