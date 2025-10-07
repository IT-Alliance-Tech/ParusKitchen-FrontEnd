import React, { useState } from 'react';
import { Check, Star, ArrowRight, Clock, Truck, Shield } from 'lucide-react';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      description: 'Perfect for singles or light eaters',
      price: { monthly: 4500, weekly: 1200 },
      originalPrice: { monthly: 5000, weekly: 1350 },
      meals: '1 meal per day',
      features: [
        'Choose lunch OR dinner',
        'Monday to Saturday delivery',
        'Basic meal customization',
        'Customer support via chat',
        '24-hour cancellation policy'
      ],
      popular: false,
      color: 'gray'
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      description: 'Most popular choice for working professionals',
      price: { monthly: 8400, weekly: 2240 },
      originalPrice: { monthly: 9400, weekly: 2500 },
      meals: '2 meals per day',
      features: [
        'Lunch AND dinner included',
        '7 days a week delivery',
        'Full meal customization',
        'Priority customer support',
        'Flexible meal skipping',
        'Weekend special menu'
      ],
      popular: true,
      color: 'primary'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      description: 'Complete nutrition solution for families',
      price: { monthly: 12000, weekly: 3200 },
      originalPrice: { monthly: 13500, weekly: 3600 },
      meals: '3 meals per day',
      features: [
        'Breakfast, lunch AND dinner',
        '7 days a week delivery',
        'Full customization + snacks',
        'Dedicated account manager',
        'Same-day meal modifications',
        'Premium packaging',
        'Monthly nutrition consultation'
      ],
      popular: false,
      color: 'orange'
    }
  ];

  const addOns = [
    { name: 'Extra Rice Portion', price: 20, description: 'Additional serving of rice with any meal' },
    { name: 'Fresh Fruit Bowl', price: 50, description: 'Seasonal fruit bowl with lunch' },
    { name: 'Special Dessert', price: 40, description: 'Traditional Indian dessert (weekly)' },
    { name: 'Soup Addition', price: 35, description: 'Daily soup with dinner' }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Change meal times and skip days as needed'
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'On-time delivery with real-time tracking'
    },
    {
      icon: Shield,
      title: 'Money-Back Guarantee',
      description: 'Not satisfied? Get your money back, no questions asked'
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
  const currentPrice = selectedPlanData?.price[billingCycle];
  const originalPrice = selectedPlanData?.originalPrice[billingCycle];
  const savings = originalPrice && currentPrice ? originalPrice - currentPrice : 0;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-beige-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-primary-800 mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="font-lato text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Flexible subscription plans designed to fit your lifestyle and budget. 
            Fresh, homemade meals delivered daily with no long-term commitments.
          </p>
          <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full inline-block font-poppins font-semibold">
            🎉 Limited Time: Save up to ₹1000 on your first month!
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setBillingCycle('weekly')}
                className={`px-6 py-2 rounded-full font-poppins font-medium transition-colors duration-200 ${
                  billingCycle === 'weekly'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-poppins font-medium transition-colors duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Monthly
                <span className="ml-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'ring-4 ring-primary-200 bg-primary-50 scale-105'
                    : 'bg-white hover:shadow-xl border border-gray-200'
                } ${plan.popular ? 'lg:scale-105' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full font-poppins font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-poppins font-bold text-2xl text-primary-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="font-lato text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-2">
                    <span className="font-poppins font-bold text-4xl text-primary-800">
                      ₹{plan.price[billingCycle].toLocaleString()}
                    </span>
                    <span className="font-lato text-gray-600">/{billingCycle}</span>
                  </div>
                  
                  {plan.originalPrice[billingCycle] > plan.price[billingCycle] && (
                    <div className="flex justify-center items-center space-x-2 mb-2">
                      <span className="font-lato text-gray-400 line-through">
                        ₹{plan.originalPrice[billingCycle].toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-poppins font-medium">
                        Save ₹{(plan.originalPrice[billingCycle] - plan.price[billingCycle]).toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <p className="font-lato text-primary-600 font-medium">
                    {plan.meals}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="font-lato text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-poppins font-semibold transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Customize Your Experience
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Enhance your meals with our optional add-ons
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-poppins font-semibold text-lg text-primary-800">
                    {addon.name}
                  </h3>
                  <span className="font-poppins font-bold text-primary-600">
                    +₹{addon.price}
                  </span>
                </div>
                <p className="font-lato text-gray-600 mb-4">
                  {addon.description}
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-poppins font-medium">
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Why Subscribe with Us?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="font-lato text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="font-poppins font-bold text-3xl text-primary-800 mb-4">
                Complete Your Subscription
              </h2>
              <p className="font-lato text-gray-600">
                You're just one step away from enjoying fresh, homemade meals!
              </p>
            </div>

            <div className="bg-primary-50 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="font-poppins font-semibold text-lg text-primary-800">
                  {selectedPlanData?.name} - {billingCycle}
                </span>
                <span className="font-poppins font-bold text-2xl text-primary-800">
                  ₹{currentPrice?.toLocaleString()}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between items-center text-green-600 mb-2">
                  <span className="font-lato">You save:</span>
                  <span className="font-poppins font-semibold">₹{savings.toLocaleString()}</span>
                </div>
              )}
              <p className="font-lato text-gray-600">
                {selectedPlanData?.meals} • {selectedPlanData?.description}
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-poppins font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block font-poppins font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block font-poppins font-medium text-gray-700 mb-2">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your complete delivery address"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-poppins font-medium text-gray-700 mb-2">
                    Preferred Lunch Time
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>12:00 PM - 12:30 PM</option>
                    <option>12:30 PM - 1:00 PM</option>
                    <option>1:00 PM - 1:30 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block font-poppins font-medium text-gray-700 mb-2">
                    Preferred Dinner Time
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>7:00 PM - 7:30 PM</option>
                    <option>7:30 PM - 8:00 PM</option>
                    <option>8:00 PM - 8:30 PM</option>
                    <option>8:30 PM - 9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-poppins font-medium text-gray-700 mb-2">
                  Dietary Preferences & Allergies
                </label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Please mention any dietary restrictions, allergies, or preferences"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-lg font-poppins font-bold text-lg transition-colors duration-200 flex items-center justify-center"
              >
                Subscribe Now & Pay ₹{currentPrice?.toLocaleString()}
                <ArrowRight className="ml-2 h-6 w-6" />
              </button>

              <p className="text-center font-lato text-sm text-gray-500">
                By subscribing, you agree to our Terms of Service and Privacy Policy. 
                Cancel anytime with 24-hour notice.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
