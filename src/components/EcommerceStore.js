import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", price: "$299.00", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", category: "Electronics" },
  { id: 2, name: "Minimalist Mechanical Keyboard", price: "$149.00", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80", category: "Accessories" },
  { id: 3, name: "Smart Fitness Watch", price: "$199.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", category: "Wearables" },
  { id: 4, name: "Ceramic Coffee Dripper", price: "$45.00", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80", category: "Home" },
];

const EcommerceStore = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load the user from localStorage when the component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Security measure: if no user is found, boot them back to login
      navigate('/login');
    }
  }, [navigate]);

  // Handle a clean logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">NexShop</span>
            </div>
            <div className="flex items-center gap-6">
              
              {/* NEW: Display the Greeting */}
              {user && (
                <span className="text-sm font-semibold text-slate-700 bg-slate-100 py-1.5 px-3 rounded-full">
                  Welcome back, {user.firstName}! 👋
                </span>
              )}

              <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 transition">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the page content */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">New Arrivals Are Here</h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Upgrade your lifestyle with our curated collection of premium products designed for modern living.</p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition shadow-lg">Shop the Collection</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer border border-slate-100">
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <p className="text-sm text-blue-600 font-semibold mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-black text-slate-900">{product.price}</span>
                  <button className="p-2 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceStore;
