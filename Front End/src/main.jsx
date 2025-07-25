// src/main.jsx
import React from 'react'; // Imports the React library
import ReactDOM from 'react-dom/client'; // Imports ReactDOM for DOM manipulation
import App from './App.jsx'; // Imports your main App component
import './index.css'; // Imports your global CSS file (assuming it's index.css)
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
 
ReactDOM.createRoot(document.getElementById("root")).render(
  // Renders your React application into the HTML element with id="root"
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);