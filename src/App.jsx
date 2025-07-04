import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import ProtectedRoute from './ProtectedRoute';
import About from './pages/About';
import Help from './pages/Help';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<LandingPage />} />
      

      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      
      {/* Protect your home/dashboard/landing page */}
      <Route
        path="/mainpage"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
