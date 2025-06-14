// src/components/CrowdControlAuth.jsx
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from './Dashboard';
import React, { useState } from 'react';
import {
  User, Eye, EyeOff, Users, Shield, BookOpen, Settings,
  BarChart3, Bell, Camera, MapPin, Clock, TrendingUp,
  LogOut, AlertTriangle, Activity
} from 'lucide-react';

const CrowdControlAuth = () => {
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', userType: 'student' });
  const [signupForm, setSignupForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    userType: 'student', matricNumber: '', department: '', employeeId: '', role: ''
  });

  const mockUsers = {
    'student@bingham.edu': {
      id: 1, firstName: 'John', lastName: 'Doe', email: 'student@bingham.edu',
      userType: 'student', matricNumber: 'BHU/22/04/05/0129', department: 'Computer Science',
      accessLevel: 'basic', permissions: ['view_crowd_data', 'receive_notifications']
    },
    'admin@bingham.edu': {
      id: 2, firstName: 'Dr. Sarah', lastName: 'Johnson', email: 'admin@bingham.edu',
      userType: 'administrator', employeeId: 'ADM001', department: 'Administration',
      accessLevel: 'full', permissions: [
        'view_crowd_data', 'manage_locations', 'view_analytics',
        'send_notifications', 'manage_users', 'system_config'
      ]
    },
    'staff@bingham.edu': {
      id: 3, firstName: 'Michael', lastName: 'Smith', email: 'staff@bingham.edu',
      userType: 'staff', employeeId: 'STF001', department: 'Facilities Management',
      role: 'Security Supervisor', accessLevel: 'moderate',
      permissions: ['view_crowd_data', 'view_analytics', 'send_notifications', 'manage_locations']
    }
  };

  const mockCrowdData = {
    locations: [
      { id: 1, name: 'Main Library', current: 245, capacity: 300, status: 'moderate', trend: 'increasing' },
      { id: 2, name: 'Student Center', current: 180, capacity: 250, status: 'moderate', trend: 'stable' },
      { id: 3, name: 'Engineering Block', current: 95, capacity: 120, status: 'high', trend: 'decreasing' },
      { id: 4, name: 'Cafeteria', current: 420, capacity: 500, status: 'high', trend: 'increasing' },
      { id: 5, name: 'Lecture Hall A', current: 45, capacity: 200, status: 'low', trend: 'stable' }
    ],
    alerts: [
      { id: 1, location: 'Main Library', type: 'capacity', message: 'Approaching capacity limit', time: '2 minutes ago', severity: 'warning' },
      { id: 2, location: 'Engineering Block', type: 'overcrowded', message: 'Over recommended capacity', time: '5 minutes ago', severity: 'critical' }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers[loginForm.email];
    if (user && loginForm.password === 'password123') {
      setCurrentUser(user);
      setCurrentView('dashboard');
    } else {
      alert('Invalid credentials. Use password123 for demo.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Account created successfully! Please login.');
    setCurrentView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setLoginForm({ email: '', password: '', userType: 'student' });
  };

  const AlertCard = ({ alert }) => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'critical': return 'border-red-500 bg-red-50';
        case 'warning': return 'border-yellow-500 bg-yellow-50';
        default: return 'border-blue-500 bg-blue-50';
      }
    };

    return (
      <div className={`border-l-4 p-4 rounded bg-black bg-opacity-20 backdrop-blur-sm ${getSeverityColor(alert.severity)}`}>
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 mt-0.5 mr-3 text-current" />
          <div className="flex-1">
            <p className="font-medium text-white">{alert.location}</p>
            <p className="text-sm text-gray-200">{alert.message}</p>
            <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-black bg-opacity-40 backdrop-blur-sm shadow-2xl border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CrowdControl Dashboard</h1>
              <p className="text-sm text-gray-300">Real-time crowd monitoring system</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-xs text-gray-300 capitalize">{currentUser.userType}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Alerts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Active Alerts</h2>
          <div className="space-y-4">
            {mockCrowdData.alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        {currentUser.permissions.includes('send_notifications') && (
          <div className="mt-8 bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white border-opacity-10">
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Bell className="w-4 h-4 mr-2" />
                Send Alert
              </button>
              <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </button>
              {currentUser.permissions.includes('manage_locations') && (
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Locations
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );

  return (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
    {currentUser && currentView === 'dashboard' ? (
      <Dashboard
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
    ) : currentView === 'login' ? (
      <div className="w-full max-w-md">
        <LoginForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleLogin={handleLogin}
          setCurrentView={setCurrentView}
        />
      </div>
    ) : (
      <div className="w-full max-w-xl">
        <SignupForm
          signupForm={signupForm}
          setSignupForm={setSignupForm}
          handleSignup={handleSignup}
          setCurrentView={setCurrentView}
        />
      </div>
    )}
  </div>
);
}

export default CrowdControlAuth;
