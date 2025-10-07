import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import { fetchReviews } from '../api'; // import the reviews API function

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      setReviews(data);
    };
    getReviews();
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Cooked by Experienced Mothers',
      description: 'Our meals are prepared by experienced home cooks who understand traditional flavors.'
    },
    {
      icon: Clock,
      title: 'Fresh Daily Delivery',
      description: 'Hot, fresh meals delivered to your doorstep twice a day - lunch and dinner.'
    },
    {
      icon: Shield,
      title: 'Hygienic & Healthy',
      description: 'Prepared in clean, monitored kitchens with the highest hygiene standards.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      content: 'The food tastes exactly like home! Perfect portion sizes and always on time.',
      rating: 5
    },
    {
      name: 'Raj Patel',
      role: 'MBA Student',
      content: 'As a student, this service has been a lifesaver. Healthy, affordable, and delicious.',
      rating: 5
    },
    {
      name: 'Kavitha Reddy',
      role: 'Working Mother',
      content: 'My family loves the variety and authentic taste. Highly recommended!',
      rating: 5
    }
  ];

  const plans = [
    { name: 'Basic Plan', price: '₹150', meals: '1 meal/day', popular: false },
    { name: 'Standard Plan', price: '₹280', meals: '2 meals/day', popular: true },
    { name: 'Premium Plan', price: '₹400', meals: '3 meals/day', popular: false }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-beige-50 to-primary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-poppins font-bold text-4xl lg:text-6xl text-primary-800 leading-tight">
                Home Cooked Meals
                <span className="text-orange-500 block">Delivered Fresh</span>
              </h1>
              <p className="font-lato text-lg text-gray-700 mt-6 leading-relaxed">
                Experience the comfort of homemade food without the hassle. Fresh, healthy, 
                and delicious meals prepared by experienced mothers and delivered to your doorstep in Bangalore.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <Link
                  to="/subscription"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-poppins font-semibold text-center transition-all duration-200 flex items-center justify-center"
                >
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/menu"
                  className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-3 rounded-full font-poppins font-semibold text-center transition-all duration-200"
                >
                  View Menu
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fresh home cooked Indian meal"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-poppins font-semibold text-primary-800">Fresh & Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Why Choose Paru's Kitchen?
            </h2>
            <p className="font-lato text-lg text-gray-600 max-w-3xl mx-auto">
              We bring the warmth and nutrition of home-cooked meals to your busy lifestyle with 
              our carefully crafted meal delivery service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                  {feature.title}
                </h3>
                <p className="font-lato text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              How It Works
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Getting fresh, homemade meals delivered is as easy as 1-2-3
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[{ step: '01', title: 'Choose Your Plan', desc: 'Select from our flexible meal plans' },
              { step: '02', title: 'Schedule Delivery', desc: 'Pick your convenient delivery times' },
              { step: '03', title: 'Enjoy Fresh Meals', desc: 'Receive hot, delicious meals daily' }].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-poppins font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-2">{item.title}</h3>
                <p className="font-lato text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/how-it-works"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-poppins font-semibold transition-colors duration-200 inline-flex items-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Plans Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Subscription Plans
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Choose the perfect plan for your lifestyle and budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-2xl border-2 ${
                plan.popular ? 'border-primary-600 bg-primary-50' : 'border-gray-200 bg-white'
              } hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-poppins font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center">
                  <h3 className="font-poppins font-bold text-2xl text-primary-800 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="font-poppins font-bold text-4xl text-primary-800">{plan.price}</span>
                    <span className="font-lato text-gray-600">/day</span>
                  </div>
                  <p className="font-lato text-gray-600 mb-6">{plan.meals}</p>
                  <button className={`w-full py-3 rounded-full font-poppins font-semibold transition-colors duration-200 ${
                    plan.popular ? 'bg-primary-600 hover:bg-primary-700 text-white' :
                      'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                  }`}>Choose Plan</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/subscription"
              className="font-lato text-primary-600 hover:text-primary-700 font-medium underline"
            >
              View all plans and features →
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section (from API) */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Join thousands of satisfied customers who trust us with their daily meals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="font-lato text-gray-700 mb-4 leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div>
                    <p className="font-poppins font-semibold text-primary-800">{review.name}</p>
                    <p className="font-lato text-sm text-gray-600">{review.role || 'Customer'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
