// src/components/WebcamFeed.js
import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { supabase } from './supabaseClient';
import axios from 'axios';

const WebcamFeed = ({ webcamActive }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [personCount, setPersonCount] = useState(0);
  const [logContent, setLogContent] = useState('');
  const [webcamError, setWebcamError] = useState(null);
  const modelRef = useRef(null);
  let streamRef = useRef(null);

  const detectionThreshold = 2;

  const appendLog = async (logMessage) => {
    try {
      const { error: supabaseError } = await supabase.from('motion_logs').insert([{ message: logMessage }]);
      if (supabaseError) console.error('Supabase error:', supabaseError.message);

      await axios.post(
        'http://localhost:5050/append_log.php',
        new URLSearchParams({ log: logMessage }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    } catch (error) {
      setWebcamError(`Log saving error: ${error.message}`);
    }
  };

  const fetchLog = async () => {
    try {
      const res = await axios.get('http://localhost:5050/get_log.php');
      setLogContent(res.data);
    } catch (error) {
      setLogContent('Failed to fetch log file.');
      setWebcamError(`Log fetching error: ${error.message}`);
    }
  };

  const detect = async () => {
    if (!videoRef.current || !modelRef.current) return;

    const predictions = await modelRef.current.detect(videoRef.current);
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(videoRef.current, 0, 0);

    let count = 0;
    predictions.forEach(pred => {
      if (pred.class === 'person' && pred.score > 0.6) {
        count++;
        const [x, y, width, height] = pred.bbox;
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = '#00FF00';
        ctx.fillText(`Person (${Math.round(pred.score * 100)}%)`, x, y > 10 ? y - 5 : y + 15);
      }
    });

    setPersonCount(count);
    if (count >= detectionThreshold) {
      const message = `⚠️ Alert: ${count} people detected at ${new Date().toLocaleString()}`;
      appendLog(message);
    }

    requestAnimationFrame(detect);
  };

  useEffect(() => {
    let isMounted = true;

    const loadWebcam = async () => {
      if (!webcamActive) return;

      try {
        await tf.ready();
        modelRef.current = await cocoSsd.load();
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        if (isMounted) detect();
      } catch (error) {
        setWebcamError(`Webcam error: ${error.message}`);
      }
    };

    loadWebcam();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (modelRef.current) {
        modelRef.current.dispose();
        modelRef.current = null;
      }
    };
  }, [webcamActive]); // 🚨 Only runs when webcamActive is true

  return (
    <div className="webcam-section">
      <h2 className="webcam-title">Live Webcam Feed</h2>

      {webcamError && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {webcamError}
        </div>
      )}

      <div className="webcam-container">
        <video ref={videoRef} className="webcam-video" />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>

      <div className="mt-4 text-lg font-semibold">
        People Detected: {personCount}
      </div>

      <button onClick={fetchLog} className="theme-button">
        View Log File
      </button>

      {logContent && (
        <div className="mt-4 bg-gray-800 p-4 rounded max-h-60 w-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">Log History</h2>
          <pre className="text-sm whitespace-pre-wrap">{logContent}</pre>
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;
