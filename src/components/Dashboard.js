import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Eye, EyeOff, Users, AlertTriangle, Activity, Play, Pause, Camera, TrendingUp } from 'lucide-react';

// Mock data for the chart
const mockData = [
  { time: '10:00', count: 2, alert: false },
  { time: '10:15', count: 4, alert: true },
  { time: '10:30', count: 1, alert: false },
  { time: '10:45', count: 3, alert: true },
  { time: '11:00', count: 5, alert: true },
  { time: '11:15', count: 2, alert: false },
  { time: '11:30', count: 6, alert: true },
  { time: '11:45', count: 3, alert: true },
];

const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "purple" }) => {
  const colorClasses = {
    purple: "from-purple-600 to-purple-800",
    blue: "from-blue-600 to-blue-800",
    indigo: "from-indigo-600 to-indigo-800",
    red: "from-red-600 to-red-800"
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +{trend}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
      </div>
    </div>
  );
};

const WebcamFeed = ({ webcamActive, onToggle }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [personCount, setPersonCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [lastAlert, setLastAlert] = useState(null);

  // Simulate person detection
  useEffect(() => {
    if (webcamActive) {
      const interval = setInterval(() => {
        const newCount = Math.floor(Math.random() * 8);
        setPersonCount(newCount);
        if (newCount >= 2) {
          setLastAlert(new Date().toLocaleTimeString());
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [webcamActive]);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Camera className="w-6 h-6 mr-2 text-purple-400" />
          Live Feed
        </h2>
        <div className="flex items-center space-x-3">
          {webcamActive && (
            <div className="flex items-center text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live
            </div>
          )}
          <button
            onClick={onToggle}
            className={`p-3 rounded-lg transition-all duration-300 ${
              webcamActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
            } shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            {webcamActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-4 shadow-2xl">
          {webcamActive ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10"></div>
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-medium">Detection Running</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 z-20">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-lg font-bold">{personCount} People</p>
                </div>
              </div>
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-300">Webcam Feed Active</p>
                  <p className="text-gray-400 text-sm mt-2">Python Detection Running</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <EyeOff className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Webcam Inactive</p>
                <p className="text-gray-500 text-sm mt-2">Click play to start monitoring</p>
              </div>
            </div>
          )}
        </div>

        {lastAlert && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 mb-4 animate-pulse">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-300 text-sm">
                Last Alert: {lastAlert} - {personCount} people detected
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [webcamActive, setWebcamActive] = useState(false);
  const [currentView, setCurrentView] = useState('overview');

  const handleWebcamToggle = () => {
    setWebcamActive(!webcamActive);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Crowd Monitor
            </h1>
            <p className="text-gray-400">Real-time people detection with computer vision</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2">
              <p className="text-gray-300 text-sm">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Current Count"
          value={webcamActive ? "3" : "0"}
          subtitle="People detected now"
          color="purple"
        />
        <StatCard
          icon={AlertTriangle}
          title="Alerts Today"
          value="12"
          subtitle="Threshold exceeded"
          trend="8"
          color="red"
        />
        <StatCard
          icon={Activity}
          title="Peak Count"
          value="8"
          subtitle="Highest today"
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          title="Avg. Count"
          value="2.4"
          subtitle="Over last hour"
          color="indigo"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Webcam Feed */}
        <div className="lg:col-span-1">
          <WebcamFeed webcamActive={webcamActive} onToggle={handleWebcamToggle} />
        </div>

        {/* Analytics Chart */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-blue-400" />
              Detection History
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.95)',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              { time: '11:45 AM', message: 'Alert: 6 people detected', type: 'alert' },
              { time: '11:30 AM', message: 'Alert: 3 people detected', type: 'alert' },
              { time: '11:15 AM', message: 'Normal: 2 people detected', type: 'normal' },
              { time: '11:00 AM', message: 'Alert: 5 people detected', type: 'alert' },
            ].map((activity, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  activity.type === 'alert' 
                    ? 'bg-red-900/20 border-l-4 border-red-500' 
                    : 'bg-green-900/20 border-l-4 border-green-500'
                }`}
              >
                <div className="flex items-center">
                  {activity.type === 'alert' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
                  ) : (
                    <Users className="w-5 h-5 text-green-400 mr-3" />
                  )}
                  <span className="text-white">{activity.message}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;