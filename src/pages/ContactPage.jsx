import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 90080 12345'],
      description: 'Available 7 days a week, 7 AM - 10 PM'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@paruskitchen.com', 'support@paruskitchen.com'],
      description: 'We respond within 2-4 hours'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Koramangala 4th Block', 'Bangalore, Karnataka 560034'],
      description: 'Monday to Saturday, 9 AM - 6 PM'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['+91 98765 43210'],
      description: 'Quick support and order updates'
    }
  ];

  const faqs = [
    {
      question: 'How do I modify my meal plan?',
      answer: 'You can modify your meal plan through your customer dashboard or by calling our support team at least 2 hours before your next delivery.'
    },
    {
      question: 'What if I need to skip a meal?',
      answer: 'No problem! You can skip meals through our app, website, or by calling us. We require at least 2 hours notice for lunch and 4 hours for dinner.'
    },
    {
      question: 'Do you accommodate food allergies?',
      answer: 'Yes, we take food allergies very seriously. Please inform us about any allergies during subscription, and our cooks will prepare your meals accordingly.'
    },
    {
      question: 'How do I pause my subscription?',
      answer: 'You can pause your subscription anytime through your account dashboard or by contacting us. There are no penalties for pausing your service.'
    },
    {
      question: 'What are your delivery timings?',
      answer: 'Lunch is delivered between 11:30 AM - 1:00 PM and dinner between 7:00 PM - 9:00 PM. You can choose specific time slots during subscription.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-beige-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-primary-800 mb-6">
            Get in Touch
          </h1>
          <p className="font-lato text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have questions about our service? Need help with your subscription? 
            We're here to help and would love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-primary-50 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="font-lato text-gray-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="font-lato text-gray-600 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Hours */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="font-poppins font-bold text-2xl text-primary-800 mb-6">
                  Send us a Message
                </h2>
                
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-2">
                      Thank You!
                    </h3>
                    <p className="font-lato text-gray-600">
                      We've received your message and will get back to you within 2-4 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-poppins font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
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
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block font-poppins font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      >
                        <option value="">Select a subject</option>
                        <option value="subscription">Subscription Inquiry</option>
                        <option value="delivery">Delivery Issues</option>
                        <option value="menu">Menu Questions</option>
                        <option value="billing">Billing Support</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-poppins font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="Please describe your question or concern in detail..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-poppins font-semibold transition-colors duration-200 flex items-center justify-center"
                    >
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Business Hours & Quick Info */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600 mr-3" />
                  <h3 className="font-poppins font-bold text-xl text-primary-800">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-lato text-gray-700">Monday - Saturday</span>
                    <span className="font-lato text-gray-700 font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-lato text-gray-700">Sunday</span>
                    <span className="font-lato text-gray-700 font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="pt-2">
                    <h4 className="font-poppins font-semibold text-primary-800 mb-2">Delivery Hours</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-lato text-gray-600">Lunch</span>
                        <span className="font-lato text-gray-600">11:30 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-lato text-gray-600">Dinner</span>
                        <span className="font-lato text-gray-600">7:00 PM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-primary-600 rounded-2xl p-6 text-white">
                <h3 className="font-poppins font-bold text-xl mb-4">
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    <Phone className="h-5 w-5 mr-3" />
                    <div>
                      <span className="font-poppins font-medium block">Call Now</span>
                      <span className="font-lato text-sm opacity-90">+91 98765 43210</span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    <div>
                      <span className="font-poppins font-medium block">WhatsApp</span>
                      <span className="font-lato text-sm opacity-90">Quick responses</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Quick answers to common questions. Don't see yours? Contact us directly!
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-primary-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="font-poppins font-semibold text-lg text-primary-800 mb-3">
                  {faq.question}
                </h3>
                <p className="font-lato text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
