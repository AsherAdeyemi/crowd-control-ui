// src/App.js
import React, { useState } from 'react';
import WebcamFeed from './components/WebcamFeed';
import './styles/theme.css'; // Make sure this path is correct

function App() {
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamKey, setWebcamKey] = useState(0);

  const handleStartWebcam = () => {
    setWebcamActive(true);
    setWebcamKey(prev => prev + 1); // Force re-mount
  };

  return (
    <div className="theme-background">
      <h1 className="theme-title">Asher's CrowdTracker</h1>
      <p style={{ color: '#ccc', marginBottom: '1rem' }}>
        Click the button to start webcam motion tracking.
      </p>

      {!webcamActive && (
        <button onClick={handleStartWebcam} className="theme-button">
          Start Webcam
        </button>
      )}

      {webcamActive && <WebcamFeed key={webcamKey} webcamActive={true} />}

      <div>
        <a href="/logs" className="theme-button">View Log File</a>
        <a href="/dashboard" className="theme-button">Go to Dashboard</a>
      </div>
    </div>
  );
}

export default App;
