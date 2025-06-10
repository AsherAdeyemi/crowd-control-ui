// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import '../styles/theme.css';

const Dashboard = () => {
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await axios.get('http://localhost:5050/get_log.php');
        const lines = res.data.split('\n').filter(Boolean);

        const parsed = lines
          .filter(line => line.includes('⚠️ Alert:'))
          .map(line => {
            const match = line.match(/(\d+) people detected at (.+)/);
            if (match) {
              return {
                time: match[2].trim(),
                count: parseInt(match[1]),
              };
            }
            return null;
          })
          .filter(Boolean);

        setLogData(parsed);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    fetchLog();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Title */}
      <div className="dashboard-header-glow">
        <h1 className="dashboard-title">Crowd Detection Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards-section">
        <div className="stat-card bg-blue">Total Alerts: {logData.length}</div>
        <div className="stat-card bg-purple">Campus Area: Bingham University, Karu</div>
        <div className="stat-card bg-orange">Detection Threshold: 2 People</div>
      </div>

      {/* Line Chart */}
      <div className="chart-section">
        <h2 className="chart-title">Crowd Alerts Over Time</h2>
        <div className="chart-container">
          <ResponsiveContainer>
            <LineChart data={logData}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="time" minTickGap={25} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6a00ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
