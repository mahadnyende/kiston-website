"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Wifi, Car, Trees, Sun, Users, Shield } from "lucide-react";

const Facilities = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const facilities = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Clean Washrooms",
      description: "Well-maintained, hygienic restroom facilities available 24/7 for your comfort.",
      image: "/images/washrooms.jpg",
      features: ["24/7 access", "Regular cleaning", "Hand sanitizers", "Family facilities"]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Secure Parking",
      description: "Safe and spacious parking for cars, trucks, and RVs with 24/7 security monitoring.",
      image: "/images/parking.jpg",
      features: ["24/7 security", "Large vehicle spaces", "Well-lit area", "Free parking"]
    },
    {
      icon: <Trees className="w-8 h-8" />,
      title: "Beautiful Gardens",
      description: "Relaxing outdoor garden spaces perfect for enjoying your meal in a serene environment.",
      image: "/images/gardens.jpg",
      features: ["Shaded seating", "Landscaped areas", "Peaceful atmosphere", "Pet-friendly zones"]
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Outdoor Seating",
      description: "Comfortable outdoor dining areas with umbrellas and comfortable seating.",
      image: "/images/outdoor-seating.jpg",
      features: ["Covered areas", "Comfortable seating", "Scenic views", "Weather protection"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Areas",
      description: "Dedicated family-friendly zones with play areas and comfortable seating for all ages.",
      image: "/images/family-areas.jpg",
      features: ["Kids play area", "Family seating", "High chairs", "Changing facilities"]
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Lighting & Security",
      description: "Well-lit premises with comprehensive security measures for peace of mind.",
      image: "/images/security.jpg",
      features: ["Bright lighting", "Security cameras", "Emergency phones", "Staff presence"]
    }
  ];

  const galleryImages = [
    { src: "/images/facility-1.jpg", alt: "Clean and modern washrooms", category: "Facilities" },
    { src: "/images/facility-2.jpg", alt: "Spacious parking area", category: "Parking" },
    { src: "/images/facility-3.jpg", alt: "Beautiful garden seating", category: "Gardens" },
    { src: "/images/facility-4.jpg", alt: "Outdoor dining area", category: "Outdoor" },
    { src: "/images/facility-5.jpg", alt: "Family-friendly play area", category: "Family" },
    { src: "/images/facility-6.jpg", alt: "Well-lit security area", category: "Security" },
    { src: "/images/facility-7.jpg", alt: "Scenic garden view", category: "Gardens" },
    { src: "/images/facility-8.jpg", alt: "Comfortable outdoor seating", category: "Outdoor" },
    { src: "/images/facility-9.jpg", alt: "Modern restroom facilities", category: "Facilities" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800" />
        <Image
          src="/images/facilities-hero.jpg"
          alt="Keystone Highway Restaurant facilities"
          fill
          className="object-cover opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl font-bold mb-4 font-poppins">Our Facilities</h1>
          <p className="text-xl font-inter">Comfort and convenience for every traveler</p>
        </motion.div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600">Modern amenities designed for your comfort</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => setSelectedImage(facility.image)}
              >
                <div className="relative h-48">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <div className="text-green-600">
                      {facility.icon}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{facility.title}</h3>
                  <p className="text-gray-600 mb-4">{facility.description}</p>

                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3"></span>
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

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Facility Gallery</h2>
            <p className="text-xl text-gray-600">Take a visual tour of our amenities</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-gray-900 font-medium">{image.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Travelers Choose Us</h2>
            <p className="text-xl text-green-100">More than just a rest stop</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-2xl font-semibold mb-4">Safe & Secure</h3>
              <p className="text-green-100">
                24/7 security monitoring and well-lit premises ensure your safety and peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🏡</div>
              <h3 className="text-2xl font-semibold mb-4">Home Away</h3>
              <p className="text-green-100">
                Comfortable facilities that feel like home, perfect for families and long-distance travelers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-2xl font-semibold mb-4">Natural Beauty</h3>
              <p className="text-green-100">
                Surrounded by beautiful gardens and outdoor spaces for a refreshing break from the road.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <Image
              src={selectedImage}
              alt="Facility image"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors duration-200"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Facilities;
