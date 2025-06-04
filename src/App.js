/* global cv */
// App.js
import React, { useState, useEffect } from 'react';
import WebcamFeed from './components/WebcamFeed';
import LandingPage from './components/LandingPage';
import './styles/theme.css';

const Home = () => {
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [webcamError, setWebcamError] = useState(null);

  // ✅ Dynamically load OpenCV.js once on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.x/opencv.js';
    script.async = true;
    script.onload = () => {
      console.log('✅ OpenCV.js script loaded.');
      if (window.cv) {
        cv['onRuntimeInitialized'] = () => {
          console.log('✅ OpenCV is fully initialized and ready!');
        };
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleStartWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setWebcamStarted(true);
        stream.getTracks().forEach(track => track.stop()); // Stop test stream
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setWebcamError(err.message || 'Failed to access webcam.');
    }
  };

  const handleWebcamReady = () => {
    console.log("Webcam is ready and running!");
  };

  return (
    <div className="theme-background">
      <h2 className="theme-title">Welcome to Asher's CrowdTracker</h2>
      <p>Click the button below to start the webcam and begin tracking motion.</p>

      {!webcamStarted && (
        <button onClick={handleStartWebcam} className="theme-button">
          Start Webcam
        </button>
      )}

      {webcamError && <p style={{ color: 'red' }}>Error: {webcamError}</p>}

      {webcamStarted && (
        <WebcamFeed webcamActive={webcamStarted} onReady={handleWebcamReady} />
      )}
    </div>
  );
};

function App() {
  return <Home />;
}

export default App;
