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

// ====================== PASSWORD RESET ======================
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { email }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Forgot password');
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password/${token}`, { password }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Reset password');
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
    console.log("📡 Fetching meals from:", `${BASE_URL}/meals`);
    const response = await axios.get(`${BASE_URL}/meals`);
    console.log("✅ Meals API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Meals fetch failed. Checking fallback route...");
    // Fallback: Try /admin/dashboard/meals if /meals fails
    try {
      const fallbackResponse = await axios.get(`${BASE_URL}/admin/dashboard/meals`, {
        headers: getAuthHeader(),
      });
      console.log("✅ Fallback Meals API Response:", fallbackResponse.data);
      return fallbackResponse.data;
    } catch (fallbackError) {
      console.error("❌ Both /meals and fallback failed");
      handleApiError(error, "Get meals");
      return [];
    }
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
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/users`, {
      headers: getAuthHeader(),
    });
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

// ✅ Final, intelligent addToCart() — fixes all known issues
export const addToCart = async (itemOrId, maybeType) => {
  try {
    // Accept both: addToCart(itemId, itemType) or addToCart({ itemId, itemType, quantity })
    let itemId;
    let itemType = maybeType;
    let quantity = 1;

    if (typeof itemOrId === "object" && itemOrId !== null) {
      itemId = itemOrId.itemId || itemOrId.id || itemOrId._id;
      itemType = itemOrId.itemType || itemOrId.type || itemType;
      quantity = itemOrId.quantity || quantity;
    } else {
      itemId = itemOrId;
    }

    // Basic validation
    if (!itemId || typeof itemId !== "string") throw new Error("Missing or invalid itemId");

    if (!itemType) {
      // default to menu/meal if not provided
      itemType = "menu";
    }

    // Token — require auth to add to cart
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    if (!token) throw new Error("No token provided");

    // Build payload expected by backend: itemType, itemId, quantity
    const payload = { itemType, itemId, quantity };

    console.log("🛒 Sending to backend:", payload);

    const response = await axios.post(`${BASE_URL}/cart`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Item added to cart:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Add to cart");
    throw error;
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

// ====================== SUBSCRIPTIONS ======================
export const getSubscriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions`);
    return response.data;
  } catch (error) {
    console.error("Get subscriptions error (response):", error.response || error);
    return [];
  }
};

export const getAddOns = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions/addons`);
    return response.data;
  } catch (error) {
    console.error("Get add-ons error (response):", error.response || error);
    return [];
  }
};

export const subscribeToPlan = async (subscriptionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/subscriptions`, subscriptionData, {
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Subscribe to plan");
  }
};

// ====================== ADMIN DASHBOARD STATS ======================
export const getAdminTotalOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/total-orders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin total orders");
  }
};

export const getAdminTotalMeals = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/total-meals`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin total meals");
  }
};

export const getAdminTotalUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/total-users`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin total users");
  }
};

export const getAdminRevenue = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/revenue`, {
      headers: getAuthHeader(),
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

// ====================== ADMIN ORDERS ======================
export const getAdminOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/dashboard/orders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Get admin orders");
  }
};

// ====================== PLANS ======================
export const fetchPlans = async () => {
  const res = await fetch('/api/plans');
  if (!res.ok) throw new Error('Failed to fetch plans');
  return res.json();
};

// Helper to include token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// ============== Dashboard APIs ==============
export const getCurrentSubscription = async () => {
  const res = await axios.get(`${BASE_URL}/dashboard/current-subscription`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getUpcomingMenu = async () => {
  const res = await axios.get(`${BASE_URL}/dashboard/upcoming-menu`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const pauseSubscription = async () => {
  const res = await axios.post(
    `${BASE_URL}/dashboard/subscription/pause`,
    {},
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const resumeSubscription = async () => {
  const res = await axios.post(
    `${BASE_URL}/dashboard/subscription/resume`,
    {},
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const cancelSubscription = async () => {
  const res = await axios.post(
    `${BASE_URL}/dashboard/subscription/cancel`,
    {},
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const renewSubscription = async () => {
  const res = await axios.post(
    `${BASE_URL}/dashboard/subscription/renew`,
    {},
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const getInvoices = async () => {
  const res = await axios.get(`${BASE_URL}/dashboard/invoices`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.put(`${BASE_URL}/dashboard/update-profile`, data, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
  });
  return res.data;
};




// -------------------------
// 🧾 Admin User Subscriptions APIs
// -------------------------
const ADMIN_BASE_URL = "http://localhost:5000/api/admin/user-subscriptions";

// ✅ Get all subscriptions
export const getAllUserSubscriptions = async (token) => {
  const res = await fetch(ADMIN_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// ✅ Get single subscription by ID
export const getUserSubscriptionById = async (id, token) => {
  const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// ✅ Update subscription
export const updateUserSubscription = async (id, data, token) => {
  const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ✅ Delete subscription
export const deleteUserSubscription = async (id, token) => {
  const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
