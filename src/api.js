// src/api.js
import axios from "axios";

// Base URL for backend
const BASE_URL = "http://localhost:5000/api"; // change if deployed

// Helper function to get JWT token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --------------------- User Auth ---------------------
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
    return response.data; // user info + token
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signupUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// --------------------- User Profile ---------------------
export const getUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/users/profile`, { headers: getAuthHeader() });
  return response.data;
};

export const updateUserProfile = async (updatedData) => {
  const response = await axios.put(`${BASE_URL}/users/profile`, updatedData, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

// --------------------- Meals / Menu ---------------------
export const getMeals = async () => {
  const response = await axios.get(`${BASE_URL}/meals`);
  return response.data;
};

export const getMealById = async (id) => {
  const response = await axios.get(`${BASE_URL}/meals/${id}`);
  return response.data;
};

export const createMeal = async (mealData) => {
  const response = await axios.post(`${BASE_URL}/meals`, mealData, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

export const updateMeal = async (id, mealData) => {
  const response = await axios.put(`${BASE_URL}/meals/${id}`, mealData, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

export const deleteMeal = async (id) => {
  const response = await axios.delete(`${BASE_URL}/meals/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// --------------------- Reviews ---------------------
export const fetchReviews = async () => {
  const response = await axios.get(`${BASE_URL}/reviews`);
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await axios.post(`${BASE_URL}/reviews`, reviewData, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

// --------------------- Orders ---------------------
export const getMyOrders = async () => {
  const response = await axios.get(`${BASE_URL}/orders/myorders`, { headers: getAuthHeader() });
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/orders`, orderData, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

// --------------------- Cart ---------------------
export const getCart = async () => {
  const response = await axios.get(`${BASE_URL}/cart`, { headers: getAuthHeader() });
  return response.data;
};

export const addToCart = async (cartItem) => {
  const response = await axios.post(`${BASE_URL}/cart`, cartItem, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

export const updateCartItem = async (id, cartItem) => {
  const response = await axios.put(`${BASE_URL}/cart/${id}`, cartItem, {
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axios.delete(`${BASE_URL}/cart/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// --------------------- Admin Dashboard ---------------------
export const getAdminTotalOrders = async () => {
  const response = await axios.get(`${BASE_URL}/admin-dashboard/total-orders`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminTotalMeals = async () => {
  const response = await axios.get(`${BASE_URL}/admin-dashboard/total-meals`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminTotalUsers = async () => {
  const response = await axios.get(`${BASE_URL}/admin-dashboard/total-users`, { headers: getAuthHeader() });
  return response.data;
};

export const getAdminRevenue = async () => {
  const response = await axios.get(`${BASE_URL}/admin-dashboard/revenue`, { headers: getAuthHeader() });
  return response.data;
};
