import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from './Dashboard';

const CrowdControlAuth = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {currentUser && currentView === 'dashboard' ? (
        <Dashboard currentUser={currentUser} onLogout={() => {
          setCurrentUser(null);
          setCurrentView('login');
        }} />
      ) : currentView === 'signup' ? (
        <SignupForm onLoginSwitch={() => setCurrentView('login')} />
      ) : (
        <LoginForm onSignupSwitch={() => setCurrentView('signup')} onLoginSuccess={(user) => {
          setCurrentUser(user);
          setCurrentView('dashboard');
        }} />
      )}
    </div>
  );
};

export default CrowdControlAuth;
