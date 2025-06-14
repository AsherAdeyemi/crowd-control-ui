// src/pages/LogPage.js
import React from 'react';
import WebcamFeed from '../components/WebcamFeed';

const LogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6 text-center">
      <h1 className="text-3xl font-bold text-white mb-6">Log Viewer</h1>
      <WebcamFeed webcamActive={true} />
    </div>
  );
};

export default LogPage;
