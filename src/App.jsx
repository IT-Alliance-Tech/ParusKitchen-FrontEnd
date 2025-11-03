import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import MenuPage from "./pages/MenuPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import ActiveSubscribers from "./pages/ActiveSubscribers";
import Deliveries from "./pages/Deliveries";
import ExpiringSubscriptions from "./pages/ExpiringSubscriptions";
import MonthlyReports from "./pages/MonthlyReports";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// --- Admin Pages ---
import AdminMenuPage from "./pages/AdminMenuPage";
import AdminDeliveryPage from "./pages/AdminDeliveryPage";
import AdminPaymentPage from "./pages/AdminPaymentPage";
import UserPaymentHistory from "./pages/UserPaymentHistory";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminMealsPage from "./pages/AdminMealsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import SubscriberManagement from "./pages/SubscriberManagement";
import AdminSettings from "./pages/AdminSettings";
import CommunicationAutomation from "./pages/CommunicationAutomation";

function App() {
  const [user, setUser] = useState(null);

  // initialize user once from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    try {
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Pass user + setter to Header */}
        <Header user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            {/* ---------- PUBLIC ROUTES ---------- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Pass setUser to LoginPage so login can update app state */}
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ---------- ADMIN ROUTES ---------- */}
            <Route path="/admin/menu-management" element={<AdminMenuPage />} />
            <Route path="/admin/delivery-management" element={<AdminDeliveryPage />} />
            <Route path="/admin/payment-management" element={<AdminPaymentPage />} />
            <Route path="/user-payments" element={<UserPaymentHistory />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/meals"
              element={
                <ProtectedRoute>
                  <AdminMealsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminOrdersPage />
                </ProtectedRoute>
              }
            />

            {/* Additional admin/public routes referenced from AdminDashboard cards */}
            <Route path="/active-subscribers" element={<ActiveSubscribers />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/expiring-subscriptions" element={<ExpiringSubscriptions />} />
            <Route path="/reports" element={<MonthlyReports />} />

            <Route
              path="/admin/subscribers"
              element={
                <ProtectedRoute>
                  <SubscriberManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/communnication"
              element={
                <ProtectedRoute>
                  <CommunicationAutomation />
                </ProtectedRoute>
              }
            />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
