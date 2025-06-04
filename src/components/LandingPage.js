// LandingPage.js
import React from 'react';
import '../styles/theme.css';

const LandingPage = ({ onStart }) => {
  return (
    <div className="theme-background">
      <h1 className="theme-title">Asher's Crowd Control and Monitoring System</h1>
      <button className="theme-button" onClick={onStart}>Get Started</button>
    </div>
  );
};

export default LandingPage;
