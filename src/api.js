// src/api.js
import axios from "axios";

// --------------------- Base URL ---------------------
const BASE_URL = "http://localhost:5000/api"; // change this if deployed

// --------------------- Meals API ---------------------
export const fetchMenu = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

// --------------------- Cart API ---------------------
export const fetchCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const addToCart = async (cartItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`, cartItem, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return null;
  }
};

// --------------------- Orders API ---------------------
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// --------------------- Reviews API ---------------------
export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const createReview = async (reviewData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // if authentication required
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    return null;
  }
};
