"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { createCateringInquiry, generateWhatsAppLink } from "@/lib/firebase-utils";

const Services = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    date: "",
    time: "",
    guests: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      title: "Corporate Catering",
      image: "/images/gallery/services1.webp",
      description: "Professional catering services for business meetings, conferences, and corporate events in Magamaga and Jinja.",
      features: ["Custom menus", "Professional service", "Setup & cleanup", "Dietary accommodations"]
    },
    {
      title: "Event Catering",
      image: "/images/cat-new.webp",
      description: "Make your special occasions unforgettable with our authentic African cuisine roadside catering.",
      features: ["Wedding receptions", "Birthday parties", "Anniversaries", "Graduation parties"]
    },
    {
      title: "Group & Traveler Meals",
      image: "/images/group-meals.webp",
      description: "Perfect bus stop restaurant for tour groups, family gatherings, and bus traveler pit stops.",
      features: ["Bulk pricing", "Quick service", "Variety options", "Take-away available"]
    },
    {
      title: "Take-away Services",
      image: "/images/takeaway-services.webp",
      description: "Convenient take-away options for those on the go along the Jinja-Busia Highway.",
      features: ["Fresh preparation", "Quick pickup", "Traveler packaging", "Extended hours"]
    }
  ];

  const eventTypes = [
    "Corporate Meeting",
    "Wedding Reception",
    "Birthday Party",
    "Family Gathering",
    "Conference",
    "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    // Construct WhatsApp message immediately
    const whatsappNumber = "256700102281";
    const whatsappMessage = `*New Catering Inquiry (Kiston Website)*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email || 'N/A'}\n` +
      `🎭 *Event Type:* ${formData.eventType}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `⏰ *Time:* ${formData.time || 'TBD'}\n` +
      `👥 *Guests:* ${formData.guests}\n` +
      `📝 *Requirements:* ${formData.message || 'N/A'}`;

    const waLink = generateWhatsAppLink(whatsappNumber, whatsappMessage);

    try {
      // Non-blocking Firebase submission
      createCateringInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventType: formData.eventType,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        message: formData.message
      }).catch(err => console.error("Firebase save failed, but redirecting to WhatsApp:", err));

      setIsSubmitted(true);
      
      // Immediate Redirection
      window.open(waLink, '_blank');

      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        date: "",
        time: "",
        guests: "",
        message: ""
      });

      // Clear success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      // Fallback redirection
      window.open(waLink, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/services-hero.webp"
          alt="Services and Roadside Catering at Kiston Highway Magamaga"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-[#e07b22] drop-shadow-2xl tracking-tight"
          >
            Services & Catering
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl font-sans font-medium max-w-3xl mx-auto text-amber-100 italic"
          >
            From corporate events near Jinja to bus group stopovers in Magamaga, we provide exceptional catering services across the highway.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Our Services</h2>
            <p className="text-xl text-gray-600">Event and roadside catering near Magamaga Trading Centre</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Trusted food stop on the highway`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Request a Quote</h2>
            <p className="text-xl text-gray-600">Professional event catering near Jinja and Magamaga</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="+256..."
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  required
                  min="1"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Expected number of guests"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Any special dietary requirements, setup needs, or additional information..."
                ></textarea>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-75 cursor-not-allowed bg-amber-500" : "bg-amber-600 hover:bg-amber-700"
                  } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                We&apos;ll respond within 24 hours with a personalized quote for your roadside event.
              </p>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Inquiry Submitted Successfully!</p>
                    <p className="text-sm">We&apos;ll contact you within 24 hours with a personalized quote.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Get in Touch</h2>
            <p className="text-xl text-gray-600">The most accessible food stop near Magamaga Trading Centre</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Direct contact for travelers and event planners</p>
              <a
                href="tel:+256700102281"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
              >
                +256 700 102281
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us details for roadside catering queries</p>
              <a
                href="mailto:catering@kistonhighway.com"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
              >
                catering@kistonhighway.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick responses for drivers and travelers</p>
              <a
                href="https://wa.me/256700102281"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
              >
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
