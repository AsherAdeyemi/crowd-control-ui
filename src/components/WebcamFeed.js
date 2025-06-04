import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { supabase } from './supabaseClient';
import axios from 'axios';

const WebcamFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [personCount, setPersonCount] = useState(0);
  const [logContent, setLogContent] = useState('');
  const detectionThreshold = 2;

  // ✅ Append log to Supabase and to local text file
  const appendLog = async (logMessage) => {
    try {
      // Save to Supabase
      await supabase.from('motion_logs').insert([{ message: logMessage }]);

      // Save to PHP text file
      await axios.post(
        'http://localhost:5050/append_log.php',
        new URLSearchParams({ log: logMessage }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  // ✅ Fetch logs from PHP text file
  const fetchLog = async () => {
    try {
      const res = await axios.get('http://localhost:5050/get_log.php');
      setLogContent(res.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogContent('Failed to fetch log file.');
    }
  };

  useEffect(() => {
    const loadModelAndCamera = async () => {
      await tf.ready();
      const model = await cocoSsd.load();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const detectFrame = async () => {
        if (!videoRef.current || videoRef.current.readyState !== 4) {
          requestAnimationFrame(detectFrame);
          return;
        }

        const predictions = await model.detect(videoRef.current);

        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(videoRef.current, 0, 0, ctx.canvas.width, ctx.canvas.height);

        let count = 0;
        predictions.forEach(pred => {
          if (pred.class === 'person' && pred.score > 0.6) {
            count++;
            const [x, y, width, height] = pred.bbox;
            ctx.strokeStyle = '#00FF00';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            ctx.font = '16px Arial';
            ctx.fillStyle = '#00FF00';
            ctx.fillText(`Person (${Math.round(pred.score * 100)}%)`, x, y > 10 ? y - 5 : y + 15);
          }
        });

        setPersonCount(count);

        if (count >= detectionThreshold) {
          const alert = `⚠️ Alert: ${count} people detected at ${new Date().toLocaleString()}`;
          appendLog(alert);
        }

        requestAnimationFrame(detectFrame);
      };

      detectFrame();
    };

    loadModelAndCamera();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="rounded-xl shadow-xl" />
      <div className="mt-4 text-lg font-semibold">People Detected: {personCount}</div>

      {/* View log file button */}
      <button
        onClick={fetchLog}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        View Log File
      </button>

      {/* Display log content */}
      {logContent && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg max-h-60 w-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">Log History</h2>
          <pre className="text-sm whitespace-pre-wrap">{logContent}</pre>
        </div>
      )}
    </div>
  );
};

export default WebcamFeed;
