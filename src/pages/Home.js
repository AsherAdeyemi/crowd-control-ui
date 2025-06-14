// src/pages/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WebcamFeed from '../components/WebcamFeed';

const Home = () => {
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamKey, setWebcamKey] = useState(0);

  const handleStartWebcam = () => {
    setWebcamActive(true);
    setWebcamKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Asher's CrowdTracker
      </h1>
      <p className="text-gray-400 mb-6">Click the button to start webcam motion tracking.</p>

      {!webcamActive && (
        <button onClick={handleStartWebcam} className="theme-button">
          Start Webcam
        </button>
      )}

      {webcamActive && <WebcamFeed key={webcamKey} webcamActive={true} />}

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link to="/logs" className="theme-button">View Log File</Link>
        <Link to="/dashboard" className="theme-button">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;
