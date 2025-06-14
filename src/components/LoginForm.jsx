// src/components/LoginForm.jsx
import React from 'react';
import { Eye, EyeOff, Users } from 'lucide-react';

const LoginForm = ({ loginForm, setLoginForm, showPassword, setShowPassword, handleLogin, setCurrentView }) => (
  <div className="max-w-md mx-auto bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-white border-opacity-10">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Users className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        CrowdControl Login
      </h2>
      <p className="text-gray-300">Access your crowd monitoring dashboard</p>
    </div>

    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
        <input
          type="email"
          value={loginForm.email}
          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? <EyeOff className="w-5 h-5 text-gray-300" /> : <Eye className="w-5 h-5 text-gray-300" />}
          </button>
        </div>
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-700 text-white p-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Login
      </button>
    </div>

    <div className="mt-6 text-center">
      <p className="text-gray-300">
        Don't have an account?{' '}
        <button
          onClick={() => setCurrentView('signup')}
          className="text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors"
        >
          Sign up
        </button>
      </p>
    </div>
  </div>
);

export default LoginForm;
