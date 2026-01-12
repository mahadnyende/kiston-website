"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Phone, MessageCircle, MapPin } from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredDishes = [
    {
      id: 1,
      name: "Jollof Rice",
      description: "Traditional West African rice dish with rich tomato sauce",
      image: "🍚",
      price: "$15.99"
    },
    {
      id: 2,
      name: "Suya Skewers",
      description: "Grilled spiced meat skewers with peanut sauce",
      image: "🍢",
      price: "$12.99"
    },
    {
      id: 3,
      name: "Egusi Soup",
      description: "Melon seed soup with vegetables and meat",
      image: "🍲",
      price: "$18.99"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "Amazing food and great service! Perfect stop on our road trip.",
      rating: 5
    },
    {
      id: 2,
      name: "Mike Chen",
      text: "Authentic African cuisine that reminds me of home. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Davis",
      text: "Clean facilities and delicious meals. Will definitely return.",
      rating: 5
    }
  ];

  const services = [
    { name: "Corporate Catering", icon: "🏢" },
    { name: "Event Catering", icon: "🎉" },
    { name: "Take-away Services", icon: "🥡" },
    { name: "Group Meals", icon: "👥" }
  ];

  const facilities = [
    { name: "Clean Washrooms", icon: "🚿" },
    { name: "Secure Parking", icon: "🅿️" },
    { name: "Outdoor Seating", icon: "🌳" },
    { name: "Family Areas", icon: "👨‍👩‍👧‍👦" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold">Authentic African Cuisine</h3>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins">
            Authentic African Cuisine
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-inter">
            Fresh, flavorful meals for travelers and families on the go
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200"
            >
              Explore Menu
            </Link>
            <a
              href="tel:+1234567890"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call Now
            </a>
          </div>
        </motion.div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
            <p className="text-xl text-gray-600">Try our most popular African specialties</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <div className="text-8xl">{dish.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex justify-center">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full transition-colors duration-200">
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">More than just a restaurant</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Facilities</h2>
            <p className="text-xl text-gray-600">Comfort and convenience for all travelers</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-amber-100">Trusted by travelers and families</p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: -currentSlide * 100 + "%" }}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white text-gray-900 rounded-2xl p-8 text-center max-w-2xl mx-auto">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-lg mb-6 italic">&quot;{testimonial.text}&quot;</p>
                      <p className="font-semibold text-amber-600">- {testimonial.name}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Map Preview & CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Find Us on the Highway</h2>
              <p className="text-xl text-gray-600 mb-8">
                Conveniently located at Mile Marker 45 on Highway 123. Perfect stop for your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/booking"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 text-center"
                >
                  Book a Table
                </a>
                <a
                  href="https://wa.me/1234567890"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.221990877396!2d-74.00369368459418!3d40.71312947933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316ba4fe6d%3A0x1b3d2c6b8c4c4c4c!2sHighway%20123%2C%20Mile%20Marker%2045!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                width="100%"
                height="384"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Keystone Highway Restaurant Location"
                className="rounded-2xl"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
