import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';  // Import React Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the App component in Router to enable routing */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// Optional: For measuring performance in your app
reportWebVitals();
