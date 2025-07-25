// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isLoginMode) {
      const result = login(username, password);
      setMessage(result.message);
      if (result.success) {
        navigate('/appointment');
      }
    } else {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters long.');
        return;
      }
      const result = register(username, password);
      setMessage(result.message);
      if (result.success) {
        navigate('/appointment');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 sm:px-10 py-12">
      <section className="bg-white p-8 sm:p-10 rounded-xl shadow-lg text-gray-800 text-center">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6">
          {isLoginMode ? 'Login to Your Account' : 'Create New Account'}
        </h2>
        <p className="text-md text-gray-600 mb-8">
          {isLoginMode
            ? 'Access your saved details and book appointments.'
            : 'Register now to unlock seamless booking and more.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          {!isLoginMode && (
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
          )}

          {message && (
            <p className={`text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'} font-medium`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700
                       transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setMessage('');
              setUsername('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            {isLoginMode ? 'Register here' : 'Login here'}
          </button>
        </p>
      </section>
    </div>
  );
}

export default AuthPage;