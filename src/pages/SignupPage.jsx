import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await signupUser({ name, email, password });
      // Save JWT token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/"); // redirect to homepage after signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-poppins font-bold text-primary-800 mb-6 text-center">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600"
            required
          />
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-poppins font-semibold">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
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
