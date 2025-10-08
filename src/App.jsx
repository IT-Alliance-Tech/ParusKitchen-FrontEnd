import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import MenuPage from './pages/MenuPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/CartPage" element={<CartPage />}/>
            <Route path="/Signup" element={<SignupPage/>}/>
            <Route path="/Login" element={<LoginPage/>}/>
            <Route path="/Orders" element={<OrdersPage/>}/>
            <Route path="/UserProfile" element={<UserProfile/>}/>
            <Route path="/Admin" element={<AdminDashboard/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
