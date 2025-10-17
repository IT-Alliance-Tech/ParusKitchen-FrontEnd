// src/api.js
import axios from "axios";

// ====================== BASE CONFIG ======================
const BASE_URL = "http://localhost:5000/api"; // change when deploying

// Helper: attach JWT token to headers
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Centralized error handling
const handleApiError = (error, action = "Request") => {
  if (error.response) {
    console.error(`${action} error (response):`, error.response.data);
    throw new Error(error.response.data.message || "Server responded with an error");
  } else if (error.request) {
    console.error(`${action} error (no response):`, error.request);
    throw new Error("No response from server. Please check backend or network.");
  } else {
    console.error(`${action} error (setup):`, error.message);
    throw new Error(error.message || "Something went wrong");
  }
};

// ====================== AUTH ======================
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Login");
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Signup");
  }
};

// ====================== USER PROFILE ======================
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get user profile");
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/profile`, data, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Update user profile");
  }
};

// ====================== MEALS ======================
export const getMeals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meals`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get meals");
  }
};

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/meals/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get meal by ID");
  }
};

export const createMeal = async (mealData) => {
  try {
    const response = await axios.post(`${BASE_URL}/meals`, mealData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Create meal");
  }
};

export const updateMeal = async (id, mealData) => {
  try {
    const response = await axios.put(`${BASE_URL}/meals/${id}`, mealData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Update meal");
  }
};

export const deleteMeal = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/meals/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Delete meal");
  }
};

// ====================== ORDERS ======================
export const getMyOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/myorders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get my orders");
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Create order");
  }
};

// ====================== ADMIN DASHBOARD ======================
export const getAdminDashboardData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin dashboard data");
  }
};

// ====================== ADMIN USERS ======================
// ====================== ADMIN USERS ======================
// ====================== ADMIN USERS ======================
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/users`, {
      headers: { ...getAuthHeader() },
    });
     console.log("Users fetched:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Get all users");
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/admin/dashboard/users/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Delete user");
  }
};

// ====================== REVIEWS ======================
export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Fetch reviews");
  }
};
// ====================== CART ======================
export const getCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get cart");
  }
};

export const addToCart = async (cartItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`, cartItem, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Add to cart");
  }
};

export const updateCartItem = async (id, cartItem) => {
  try {
    const response = await axios.put(`${BASE_URL}/cart/${id}`, cartItem, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Update cart item");
  }
};

export const removeFromCart = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Remove from cart");
  }
};
// ====================== ADMIN DASHBOARD ======================
export const getAdminTotalOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/total-orders`, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin total orders");
  }
};

export const getAdminTotalMeals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/total-meals`, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin total meals");
  }
};

export const getAdminTotalUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/total-users`, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin total users");
  }
};

export const getAdminRevenue = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/revenue`, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin revenue");
  }
};
// ====================== ADMIN MEALS ======================

export const getAllMeals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/meals`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get all meals");
  }
};


