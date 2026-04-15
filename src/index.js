import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // This imports Tailwind!
import App from './App';

// Find the div with id="root" in your index.html
const container = document.getElementById('root');

// Create a root and render the App component inside it
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
