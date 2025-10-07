import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Connect API later
    console.log("Signup with:", name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-poppins font-bold text-primary-800 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="font-lato text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="font-lato text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="font-lato text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-poppins font-semibold transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 font-lato text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
