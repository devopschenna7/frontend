import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', mobile: '', username: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  // NEW: State to track if signup was successful
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep1 = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return false;
    }
    setError("");
    return true;
  };

  const checkUsername = async () => {
    const res = await fetch(`http://localhost:8080/api/signup/check-availability?username=${formData.username}`);
    if (res.status === 409) setError("Username is already taken!");
    else {
      setError("");
      setStep(3);
    }
  };

  const submitSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      // NEW: Show success screen, then redirect after 3 seconds
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      const msg = await res.text();
      setError(msg);
    }
  };

  // NEW: The Success UI that renders when isSuccess is true
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transform transition-all">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-8">Your signup was successful.</p>
          <div className="flex justify-center items-center space-x-2 text-sm text-slate-500">
            <svg className="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Redirecting to login...</span>
          </div>
        </div>
      </div>
    );
  }

  // The rest of your existing form UI
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-6">Step {step} of 3</p>
        
        {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input className="w-1/2 p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="First Name" onChange={e => setFormData({...formData, firstName: e.target.value})} />
              <input className="w-1/2 p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Last Name" onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
            <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Mobile (10 digits)" onChange={e => setFormData({...formData, mobile: e.target.value})} />
            <button onClick={() => validateStep1() && setStep(2)} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Choose Username" onChange={e => setFormData({...formData, username: e.target.value})} />
            <button onClick={checkUsername} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">Next</button>
            <button onClick={() => setStep(1)} className="w-full text-slate-500 p-3 hover:text-slate-800">Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <input type="password" className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Create Password" onChange={e => setFormData({...formData, password: e.target.value})} />
            <input type="password" className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Re-enter Password" onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
            <button onClick={submitSignup} className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition">Complete Signup</button>
            <button onClick={() => setStep(2)} className="w-full text-slate-500 p-3 hover:text-slate-800">Back</button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">Log in</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
