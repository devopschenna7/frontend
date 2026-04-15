import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (res.ok) {
        // Parse the response and save the user's name to localStorage
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName
        }));
        
        navigate('/store');
      } else if (res.status === 401) {
        // Handle specific 401 Unauthorized errors gracefully
        setError("Invalid username or password. Please try again.");
      } else {
        // Handle other server errors (e.g., 500 Internal Server Error)
        setError("An unexpected error occurred. Please try again later.");
      }
    } catch (err) {
      // This catches the "Failed to fetch" error when the backend is completely down
      setError("Unable to connect to the server. Please ensure the backend system is running.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Please enter your details to sign in.</p>
        </div>

        {/* The Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm flex items-start shadow-sm">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
            placeholder="Username" 
            onChange={e => setCredentials({...credentials, username: e.target.value})} 
            required 
          />
          <input 
            type="password" 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
            placeholder="Password" 
            onChange={e => setCredentials({...credentials, password: e.target.value})} 
            required 
          />
          
          <div className="flex justify-end">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-lg mt-4">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline font-semibold">Sign up for free</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
