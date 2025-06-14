// src/components/SignupForm.jsx
import React from 'react';
import { User } from 'lucide-react';

const SignupForm = ({ signupForm, setSignupForm, handleSignup, setCurrentView }) => (
  <div className="max-w-xl mx-auto bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-white border-opacity-10">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <User className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Create Account
      </h2>
      <p className="text-gray-300">Join the CrowdControl system</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <input
        type="text"
        placeholder="First Name"
        value={signupForm.firstName}
        onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
        className="p-3 rounded bg-black bg-opacity-20 border border-gray-500 text-white"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={signupForm.lastName}
        onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
        className="p-3 rounded bg-black bg-opacity-20 border border-gray-500 text-white"
      />
    </div>

    <input
      type="email"
      placeholder="Email"
      value={signupForm.email}
      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
      className="w-full mb-4 p-3 rounded bg-black bg-opacity-20 border border-gray-500 text-white"
    />

    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <input
        type="password"
        placeholder="Password"
        value={signupForm.password}
        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
        className="p-3 rounded bg-black bg-opacity-20 border border-gray-500 text-white"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={signupForm.confirmPassword}
        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
        className="p-3 rounded bg-black bg-opacity-20 border border-gray-500 text-white"
      />
    </div>

    <button
      onClick={handleSignup}
      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded font-semibold hover:from-blue-600 hover:to-purple-600 transition"
    >
      Create Account
    </button>

    <div className="mt-6 text-center">
      <p className="text-gray-300">
        Already have an account?{' '}
        <button onClick={() => setCurrentView('login')} className="text-blue-400 hover:underline">
          Login
        </button>
      </p>
    </div>
  </div>
);

export default SignupForm;
