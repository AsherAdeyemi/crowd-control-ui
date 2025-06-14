// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WebcamFeed from './components/WebcamFeed';
import CrowdControlAuth from './components/CrowdControlAuth';
import LandingPage from './components/LandingPage';

const LogPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Detection Log Viewer</h1>
      <WebcamFeed webcamActive={true} />
    </div>
  </div>
);

const Navigation = () => (
  <nav className="flex justify-center gap-4 mt-8">
    <Link to="/" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform">
      Home
    </Link>
    <Link to="/dashboard" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform">
      Dashboard
    </Link>
    <Link to="/logs" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform">
      Logs
    </Link>
    <Link to="/auth" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform">
      Login / Signup
    </Link>
  </nav>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<LogPage />} />
        <Route path="/auth" element={<CrowdControlAuth />} />
      </Routes>

      {/* Optional persistent navigation for dev/demo */}
      {/* <Navigation /> */}
    </Router>
  );
}

export default App;
