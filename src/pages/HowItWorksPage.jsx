import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Calendar, Truck, Utensils, Clock, MapPin, Shield, ArrowRight } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: UserCheck,
      title: 'Choose Your Plan',
      description: 'Select from our flexible subscription plans that fit your lifestyle and dietary preferences.',
      details: ['Basic, Standard, or Premium plans', 'Customize meal preferences', 'Set dietary restrictions']
    },
    {
      icon: Calendar,
      title: 'Schedule Your Meals',
      description: 'Pick your preferred delivery times and meal schedule that works best for you.',
      details: ['Choose delivery slots', 'Set recurring schedule', 'Modify anytime online']
    },
    {
      icon: Utensils,
      title: 'Fresh Preparation',
      description: 'Our experienced cooks prepare your meals fresh daily using traditional recipes and quality ingredients.',
      details: ['Prepared fresh daily', 'Traditional cooking methods', 'Quality ingredients only']
    },
    {
      icon: Truck,
      title: 'Doorstep Delivery',
      description: 'Enjoy hot, delicious meals delivered right to your doorstep at your scheduled time.',
      details: ['Punctual delivery', 'Hygienic packaging', 'Contact-free delivery option']
    }
  ];

  const deliveryInfo = [
    {
      icon: Clock,
      title: 'Delivery Timings',
      content: 'Lunch: 11:30 AM - 1:00 PM\nDinner: 7:00 PM - 9:00 PM'
    },
    {
      icon: MapPin,
      title: 'Service Areas',
      content: 'Koramangala, Indiranagar, HSR Layout, BTM Layout, Jayanagar, JP Nagar'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      content: 'Temperature-controlled delivery\nHygienic packaging\n100% fresh guarantee'
    }
  ];

  const faqs = [
    {
      question: 'Can I skip meals or pause my subscription?',
      answer: 'Yes, you can skip meals or pause your subscription anytime through our customer service. We require at least 2 hours notice for meal changes.'
    },
    {
      question: 'What if I\'m not satisfied with a meal?',
      answer: 'Customer satisfaction is our priority. If you\'re not happy with any meal, contact us immediately and we\'ll provide a replacement or refund.'
    },
    {
      question: 'Are the meals suitable for special diets?',
      answer: 'We offer vegetarian, vegan, diabetic-friendly, and low-sodium options. Please specify your dietary requirements when subscribing.'
    },
    {
      question: 'How do I make payments?',
      answer: 'We accept all major payment methods including UPI, credit/debit cards, and net banking. Payments are processed securely through our platform.'
    },
    {
      question: 'What if I need to change my delivery address?',
      answer: 'You can update your delivery address through your account dashboard or by contacting our support team. Changes take effect from the next meal.'
    },
    {
      question: 'Do you provide weekend delivery?',
      answer: 'Yes, we deliver 7 days a week including weekends. Weekend schedules may have slightly different timing slots.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-beige-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-primary-800 mb-6">
            How Paru's Kitchen Works
          </h1>
          <p className="font-lato text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From subscription to your doorstep - discover how easy it is to enjoy fresh, 
            homemade meals every day with our simple 4-step process.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 font-poppins font-bold text-xl">
                      {index + 1}
                    </div>
                    <step.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-poppins font-bold text-3xl text-primary-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="font-lato text-lg text-gray-700 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        <span className="font-lato text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-primary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <step.icon className="h-32 w-32 text-primary-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Delivery Information
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Everything you need to know about our delivery service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-4">
                  {info.title}
                </h3>
                <p className="font-lato text-gray-600 whitespace-pre-line leading-relaxed">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Updated Layout) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-lato text-lg text-gray-600">
              Got questions? We have answers to help you get started.
            </p>
          </div>

          {/* ✅ Updated grid layout for side-by-side FAQ cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-primary-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
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

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-lato text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers and start enjoying fresh, homemade meals today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/subscription"
              className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-full font-poppins font-semibold transition-colors duration-200 inline-flex items-center justify-center"
            >
              Choose Your Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-full font-poppins font-semibold transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
