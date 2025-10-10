// src/api.js
import axios from "axios";

// ====================== BASE CONFIG ======================
const BASE_URL = "http://localhost:5000/api"; // change this when deployed

// Helper: attach JWT token to headers
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Common error handler
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
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;

    // Keep both _id and id to prevent breaking old code
    return {
      token: data.token,
      user: {
        id: data.user?._id || data.userId || null,
        name: data.user?.name || data.name,
        email: data.user?.email || data.email,
        role: data.user?.role || data.role,
      },
    };
  } catch (error) {
    handleApiError(error, "Login");
  }
};

// ====================== SIGNUP ======================
export const signupUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/signup`,
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );
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

export const updateUserProfile = async (updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/profile`, updatedData, {
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

// ====================== REVIEWS ======================
export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Fetch reviews");
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews`, reviewData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Create review");
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

// ====================== MENU (for Menu Page) ======================
export const getMenu = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meals`); // uses same API as meals
    return response.data;
  } catch (error) {
    handleApiError(error, "Get menu");
  }
};
