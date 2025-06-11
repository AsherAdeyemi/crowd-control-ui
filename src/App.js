// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WebcamFeed from './components/WebcamFeed';
import Dashboard from './components/Dashboard';
import './styles/theme.css';

function Home() {
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamKey, setWebcamKey] = useState(0);

  const handleStartWebcam = () => {
    setWebcamActive(true);
    setWebcamKey(prev => prev + 1); // re-render WebcamFeed
  };

  return (
    <div className="theme-background">
      <h1 className="theme-title">Asher's CrowdTracker</h1>
      <p className="text-gray-400 mb-4">Click the button to start webcam motion tracking.</p>

      {!webcamActive && (
        <button onClick={handleStartWebcam} className="theme-button">Start Webcam</button>
      )}

      {webcamActive && <WebcamFeed key={webcamKey} webcamActive={true} />}

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Link to="/logs" className="theme-button">View Log File</Link>
        <Link to="/dashboard" className="theme-button">Go to Dashboard</Link>
      </div>
    </div>
  );
}

function LogPage() {
  return (
    <div className="theme-background">
      <WebcamFeed webcamActive={true} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<LogPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
