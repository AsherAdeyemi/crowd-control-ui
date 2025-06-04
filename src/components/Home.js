// Home.js
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import MapComponent from './MapComponent';
import WebcamFeed from './WebcamFeed';
import '../styles/theme.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

const Home = () => {
  const [crowdData, setCrowdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [locationMap, setLocationMap] = useState({});
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [webcamError, setWebcamError] = useState(null);

  const fetchCrowdData = async () => {
    try {
      const { data, error } = await supabase
        .from('crowd_data')
        .select('*, location_id(*)')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      setCrowdData(data);
      setLastUpdated(new Date());

      const locMap = {};
      data.forEach(item => {
        if (item.location_id) {
          locMap[item.location_id.id] = {
            name: item.location_id.location_name,
            lat: item.location_id.latitude,
            lng: item.location_id.longitude,
            maxCapacity: item.location_id.capacity,
          };
        }
      });
      setLocationMap(locMap);
    } catch (err) {
      console.error('Error fetching crowd data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrowdData();
    const interval = setInterval(fetchCrowdData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStartWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) setWebcamStarted(true);
    } catch (err) {
      console.error('Webcam error:', err.message);
      setWebcamError(err.message);
    }
  };

  const markers = crowdData
    .map(item => {
      const loc = locationMap[item.location_id?.id];
      return loc
        ? {
            id: item.location_id.id,
            name: loc.name,
            lat: loc.lat,
            lng: loc.lng,
            maxCapacity: loc.maxCapacity,
            crowdCount: item.crowd_count,
          }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="theme-background">
      <h1 className="theme-title">🎥 CrowdTracker Live</h1>

      {!webcamStarted && (
        <button className="theme-button" onClick={handleStartWebcam}>
          Start Webcam Detection
        </button>
      )}
      {webcamError && <p style={{ color: 'red' }}>Error: {webcamError}</p>}

      {webcamStarted && <WebcamFeed />}

      <div style={{ marginTop: '40px', width: '100%' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>📍 Crowd Map</h2>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {lastUpdated && (
              <p style={{ fontSize: '14px', color: '#ccc' }}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
            <MapComponent markers={markers} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
