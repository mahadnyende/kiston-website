"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { submitContactMessage } from "@/lib/firebase-utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+256 700 102281"],
      action: "tel:+256700102281"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      details: ["+256 700 102281", "Instant responses"],
      action: "https://wa.me/256700102281"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@kistonhighway.com", "catering@kistonhighway.com"],
      action: "mailto:info@kistonhighway.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: ["Magamaga, Along", "Jinja-Busia Highway"],
      action: "#"
    }
  ];

  const operatingHours = [
    { day: "All Days", hours: "Open 24/7" },
    { day: "Kitchen Status", hours: "Always Fresh" },
    { day: "Public Holidays", hours: "Open 24/7" }
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

    // Construct WhatsApp message immediately
    const whatsappNumber = "256700102281";
    const whatsappMessage = `*New General Inquiry (Kiston Website)*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone || 'N/A'}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📋 *Subject:* ${formData.subject}\n` +
      `📝 *Message:* ${formData.message}`;

    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      // Non-blocking Firebase submission
      submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      }).catch(err => console.error('Firebase save failed, but redirecting to WhatsApp:', err));

      setIsSubmitted(true);
      
      // Immediate Redirection
      window.open(waLink, '_blank');

      // Reset form after animation
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      window.open(waLink, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#2d251f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-[#e07b22] drop-shadow-2xl tracking-tight"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl font-sans font-medium text-amber-100"
          >
            Get in touch with us for reservations, catering, or any questions
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-amber-600">{info.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                ))}
                {info.action && (
                  <a
                    href={info.action}
                    className="inline-block mt-3 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    Contact
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="+256 700 102281"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Table Reservation</option>
                      <option value="catering">Catering Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 resize-none font-sans"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-sans font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Animation */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center"
                    >
                      ✅ Message sent successfully! We&apos;ll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Map and Hours */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Google Maps */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h3>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d15959.071725556752!2d33.3651646!3d0.5228299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMzEnMjIuMiJOIDMzwrAyMSc1NC42IkU!5e0!3m2!1sen!2sug!4v1707259000000!5m2!1sen!2sug"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kiston Highway Restaurant Location"
                    className="rounded-2xl"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-600 font-medium font-[family-name:var(--font-playfair)] text-amber-700">Magamaga, Along Jinja-Busia Highway</p>
                  <p className="text-sm text-gray-500">Magamaga, Uganda</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=0.5228299244072099,33.36516457593573"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-amber-600 hover:text-amber-800 font-sans font-semibold"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Operating Hours
                </h3>
                <div className="bg-gray-50 rounded-2xl p-6">
                  {operatingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="tel:+256700102281"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/256700102281"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
