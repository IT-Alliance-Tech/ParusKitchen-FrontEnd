import React, { useState } from 'react';
import { forgotPassword } from '../api';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      // If backend returns a resetUrl (dev fallback), show it so developer can continue
      if (res && res.resetUrl) {
        setResetLink(res.resetUrl);
        alert('Reset link returned by server (development): check below');
      } else {
        alert(res.message || 'Reset email sent. Check your inbox.');
      }
      setEmail('');
    } catch (err) {
      alert(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow bg-primary-50 flex items-center justify-center min-h-[calc(100vh-160px)] p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-primary-800 mb-4 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the email associated with your account and we'll send a link to reset your password.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl">
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

          {resetLink && (
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700">Development reset link (valid 15 minutes):</p>
              <a href={resetLink} className="text-primary-600 break-all" target="_blank" rel="noreferrer">{resetLink}</a>
              <div className="mt-2">
                <button
                  onClick={() => { navigator.clipboard.writeText(resetLink); alert('Copied to clipboard'); }}
                  className="px-3 py-1 bg-primary-600 text-white rounded mr-2"
                >
                  Copy link
                </button>
                <a href={resetLink} className="px-3 py-1 bg-green-600 text-white rounded" target="_blank" rel="noreferrer">Open link</a>
              </div>
            </div>
          )}

        <p className="text-center mt-4 text-sm">
          Remembered your password? <Link to="/login" className="text-primary-600">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;
