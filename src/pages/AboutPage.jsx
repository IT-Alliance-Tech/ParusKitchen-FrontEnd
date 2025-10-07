import React from 'react';
import { Heart, Users, Shield, Award, Clock, MapPin } from 'lucide-react';

const AboutPage = () => {
  const cooks = [
    {
      name: 'Lakshmi Aunty',
      specialty: 'South Indian Cuisine',
      experience: '25+ years',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg',
      description: 'Master of traditional South Indian recipes passed down through generations'
    },
    {
      name: 'Priya Aunty',
      specialty: 'North Indian & Millet Dishes',
      experience: '20+ years',
      image: 'https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg',
      description: 'Expert in healthy cooking with a focus on nutritious millet-based meals'
    },
    {
      name: 'Kavitha Aunty',
      specialty: 'Bengali & Diabetic-Friendly',
      experience: '18+ years',
      image: 'https://images.pexels.com/photos/3771106/pexels-photo-3771106.jpeg',
      description: 'Specializes in Bengali cuisine and healthy meals for special dietary needs'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Cooked with Love',
      description: 'Every meal is prepared with the same care and affection as a mother would cook for her family.'
    },
    {
      icon: Shield,
      title: 'Hygiene First',
      description: 'We maintain the highest standards of cleanliness and food safety in our kitchens.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Supporting local communities by employing skilled home cooks from Bangalore.'
    },
    {
      icon: Award,
      title: 'Quality Ingredients',
      description: 'We source fresh, local ingredients daily to ensure the best taste and nutrition.'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '50,000+', label: 'Meals Delivered' },
    { number: '3+', label: 'Years of Service' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  const timeline = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'Started with a simple mission to bring homemade food to busy professionals in Koramangala.'
    },
    {
      year: '2022',
      title: 'Growing Community',
      description: 'Expanded to serve 500+ customers across multiple areas in Bangalore with 3 dedicated home cooks.'
    },
    {
      year: '2023',
      title: 'Scaling Up',
      description: 'Introduced specialized menus including millet-based and diabetic-friendly options.'
    },
    {
      year: '2024',
      title: 'Recognition',
      description: 'Featured in local magazines and achieved 5000+ satisfied customers milestone.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-beige-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-primary-800 mb-6">
            About Paru's Kitchen
          </h1>
          <p className="font-lato text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Born from a mother's love and dedication to providing nutritious, homemade meals 
            to families across Bangalore. We believe everyone deserves the comfort of home-cooked food.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-lato text-gray-700 leading-relaxed">
                <p>
                  Paru's Kitchen was born in 2021 when our founder, Paru, noticed how many working 
                  professionals and students in Bangalore struggled to maintain healthy eating habits 
                  due to their busy schedules.
                </p>
                <p>
                  As a mother herself, she understood the importance of nutritious, home-cooked meals. 
                  What started as preparing meals for a few neighbors soon grew into a mission to serve 
                  the entire Bangalore community.
                </p>
                <p>
                  Today, we're proud to work with experienced home cooks who share our passion for 
                  authentic, healthy food. Each meal is prepared with the same love and care that 
                  goes into cooking for one's own family.
                </p>
                <p>
                  Our commitment goes beyond just delivering food – we're building a community that 
                  values health, tradition, and the simple joy of sharing a good meal.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg"
                alt="Traditional Indian kitchen"
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="font-poppins font-bold text-4xl lg:text-5xl text-white mb-2">
                  {stat.number}
                </div>
                <div className="font-lato text-primary-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Our Values
            </h2>
            <p className="font-lato text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-poppins font-semibold text-xl text-primary-800 mb-3">
                  {value.title}
                </h3>
                <p className="font-lato text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Cooks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Meet Our Talented Cooks
            </h2>
            <p className="font-lato text-lg text-gray-600">
              The skilled mothers behind every delicious meal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cooks.map((cook, index) => (
              <div key={index} className="bg-primary-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src={cook.image}
                  alt={cook.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="font-poppins font-bold text-xl text-primary-800 mb-2">
                  {cook.name}
                </h3>
                <p className="font-poppins font-medium text-orange-600 mb-2">
                  {cook.specialty}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="font-lato text-gray-600">{cook.experience}</span>
                </div>
                <p className="font-lato text-gray-700 leading-relaxed">
                  {cook.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-4">
              Our Journey
            </h2>
            <p className="font-lato text-lg text-gray-600">
              From a small idea to serving thousands of families
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h3 className="font-poppins font-bold text-xl text-primary-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-lato text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center relative z-10">
                    <span className="font-poppins font-bold text-white">{item.year}</span>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hygiene Protocols */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-primary-800 mb-6">
                Hygiene & Safety Protocols
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary-800 mb-1">
                      Regular Kitchen Inspections
                    </h4>
                    <p className="font-lato text-gray-600">
                      All our partner kitchens undergo monthly hygiene audits and cleanliness checks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary-800 mb-1">
                      Fresh Ingredient Sourcing
                    </h4>
                    <p className="font-lato text-gray-600">
                      We source ingredients daily from trusted local vendors and markets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary-800 mb-1">
                      Temperature-Controlled Delivery
                    </h4>
                    <p className="font-lato text-gray-600">
                      Meals are packed in insulated containers to maintain optimal temperature during delivery.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary-800 mb-1">
                      Health Monitoring
                    </h4>
                    <p className="font-lato text-gray-600">
                        All cooks undergo regular health check-ups and follow strict personal hygiene protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4099138/pexels-photo-4099138.jpeg"
                alt="Clean kitchen preparation"
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h2 className="font-poppins font-bold text-2xl text-primary-800 mb-4">
              Our Location
            </h2>
            <p className="font-lato text-gray-700 leading-relaxed mb-6">
              Based in the heart of Koramangala, we serve fresh homemade meals across Bangalore. 
              Our central kitchen and partnered home cooks ensure timely delivery to all major areas.
            </p>
            <div className="bg-primary-50 rounded-xl p-4">
              <h3 className="font-poppins font-semibold text-primary-800 mb-2">Service Areas</h3>
              <p className="font-lato text-gray-600">
                Koramangala • Indiranagar • HSR Layout • BTM Layout • Jayanagar • JP Nagar • Banashankari • Electronic City
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
