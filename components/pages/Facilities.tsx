"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Facilities = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const facilities = [
    {
      title: "Clean Washrooms",
      description: "Well-maintained, hygienic restroom facilities available 24/7 for travelers on the Jinja–Busia Road.",
      image: "/images/clean-washrooms.webp",
      features: ["24/7 access", "Regular cleaning", "Hand sanitizers", "Family facilities"]
    },
    {
      title: "Secure Parking",
      description: "Safe and spacious parking for cars, trucks, and RVs with 24/7 security monitoring near Magamaga.",
      image: "/images/secure-parking.webp",
      features: ["24/7 security", "Large vehicle spaces", "Truck & RV friendly", "Free parking"]
    },
    {
      title: "Beautiful Gardens",
      description: "Relaxing outdoor garden spaces perfect for enjoying your meal in a serene environment along the highway.",
      image: "/images/beautiful-gardens.webp",
      features: ["Shaded seating", "Landscaped areas", "Peaceful atmosphere", "Pet-friendly zones"]
    },
    {
      title: "Outdoor Seating",
      description: "Comfortable outdoor dining areas with umbrellas and scenic views of the Magamaga landscape.",
      image: "/images/outdoor-seating-new.webp",
      features: ["Covered areas", "Comfortable seating", "Scenic views", "Weather protection"]
    },
    {
      title: "Family Areas",
      description: "Dedicated family-friendly zones with play areas and comfortable seating for all ages.",
      image: "/images/f-areas.webp",
      features: ["Kids play area", "Family seating", "High chairs", "Changing facilities"]
    },
    {
      title: "Lighting & Security",
      description: "Well-lit premises with comprehensive security measures for peace of mind while traveling at night.",
      image: "/images/night-parking.webp",
      features: ["Bright lighting", "Security cameras", "Emergency phones", "Staff presence"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/facilities-hero.webp"
          alt="Our Facilities at Kiston Highway Restaurant"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/30 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-[#e07b22] drop-shadow-2xl tracking-tight">Our Facilities</h1>
          <p className="text-xl font-sans font-medium mb-2 italic">Clean restaurant Jinja–Busia Highway and safe food stop Magamaga</p>
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
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">What We Offer</h2>
            <p className="text-xl text-gray-600">Modern amenities for stopover travelers in Magamaga</p>
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
                    alt={`${facility.title} at Kiston - Safe and secure food stop in Magamaga`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
            <p className="text-xl text-green-100">The most trusted highway restaurant in Magamaga</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-6 relative w-20 h-20">
                <Image
                  src="/images/icons/safe-secure.webp"
                  alt="Safe and Secure roadside restaurant"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Safe & Secure</h3>
              <p className="text-green-100">
                24/7 security monitoring and well-lit premises ensure your safety and peace of mind on the road.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-6 relative w-20 h-20">
                <Image
                  src="/images/icons/home-away.webp"
                  alt="Home Away comfort for highway travelers"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Home Away</h3>
              <p className="text-green-100">
                Comfortable facilities that feel like home, perfect for families and long-distance travelers near Jinja.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-6 relative w-20 h-20">
                <Image
                  src="/images/icons/natural-beauty.webp"
                  alt="Natural beauty and refreshing gardens in Magamaga"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Natural Beauty</h3>
              <p className="text-green-100">
                Surrounded by beautiful gardens and outdoor spaces for a refreshing break from the Jinja-Busia Highway.
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
              alt="Facility image - Kiston Magamaga"
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

