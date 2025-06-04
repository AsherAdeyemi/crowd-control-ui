import React from 'react';
import Webcam from 'react-webcam';

const Dashboard = () => {
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Current Crowd" value="32" />
        <StatCard title="Peak Hour" value="5:00 PM" />
        <StatCard title="Alerts" value="2" />
        <StatCard title="Cameras Online" value="1" />
      </div>

      {/* Middle Section: Logs and Graphs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">Event Logs</div>
        <div className="bg-gray-800 rounded-xl p-4">Crowd Chart</div>
      </div>

      {/* Webcam Feed */}
      <div className="bg-gray-800 rounded-xl p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Live Camera Feed</h2>
        <Webcam
          audio={false}
          height={480}
          width={640}
          videoConstraints={videoConstraints}
          className="mx-auto rounded-md border-4 border-blue-500"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-800 rounded-xl p-4 text-center shadow-lg">
    <h4 className="text-md text-gray-400">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
