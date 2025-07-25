// src/main.jsx
import React from 'react'; // Imports the React library
import ReactDOM from 'react-dom/client'; // Imports ReactDOM for DOM manipulation
import App from './App.jsx'; // Imports your main App component
import './index.css'; // Imports your global CSS file (assuming it's index.css)

ReactDOM.createRoot(document.getElementById('root')).render(
  // Renders your React application into the HTML element with id="root"
  <React.StrictMode>
    {/* React.StrictMode is a tool for highlighting potential problems in an application */}
    <App /> {/* Your main application component */}
  </React.StrictMode>,
);