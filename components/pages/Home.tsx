"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Phone, MessageCircle } from "lucide-react";
import { getTestimonials, Testimonial, MenuItem } from "@/lib/firebase-utils";

const FEATURED_DISHES_FALLBACK: MenuItem[] = [
  {
    id: "1",
    name: "Beef Pilau",
    description: "Fragrant rice dish cooked with tender beef and aromatic spices.",
    image: "/images/menu/beef-pilau.webp",
    price: 15.99,
    category: "Main Meals",
    available: true,
    ingredients: [],
  },
  {
    id: "2",
    name: "Authentic Katogo",
    description:
      "Hearty breakfast blend of matooke, cassava, and offals - a traveler favorite.",
    image: "/images/menu/katogo.webp",
    price: 12.99,
    category: "Local Specialties",
    available: true,
    ingredients: [],
  },
  {
    id: "3",
    name: "Whole Fried Tilapia",
    description: "Crispy whole tilapia fish, seasoned and deep-fried to perfection.",
    image: "/images/menu/whole-tilapia.webp",
    price: 18.99,
    category: "Main Meals",
    available: true,
    ingredients: [],
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredDishes] = useState<MenuItem[]>(FEATURED_DISHES_FALLBACK);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const services = [
    { name: "Corporate Catering", image: "/images/gallery/services1.webp" },
    { name: "Event Catering", image: "/images/cat-new.webp" },
    { name: "Take-away Services", image: "/images/takeaway-services.webp" },
    { name: "Group Meals", image: "/images/group-meals.webp" }
  ];

  const facilities = [
    { name: "Clean Washrooms", image: "/images/clean-washrooms.webp" },
    { name: "Secure Parking", image: "/images/secure-parking.webp" },
    { name: "Outdoor Seating", image: "/images/outdoor-sitting.webp" },
    { name: "Family Areas", image: "/images/f-areas.webp" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialsData = await getTestimonials(true);

        if (testimonialsData.length > 0) {
          setTestimonials(testimonialsData);
        } else {
          setTestimonials([
            { id: "1", name: "Nakato Sarah", text: "Amazing food and great service! Perfect stop on our road trip along Jinja-Busia Highway.", rating: 5, featured: true },
            { id: "2", name: "Okello David", text: "Authentic African cuisine that reminds me of home. Best pilau in Magamaga!", rating: 5, featured: true },
            { id: "3", name: "Mwesigye Emma", text: "Clean facilities and delicious meals. A must-visit food stop near Jinja.", rating: 5, featured: true }
          ]);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <Image
            src="/images/authentic-cuisine.webp"
            alt="Authentic African Cuisine at Kiston Highway Restaurant Magamaga"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-[#e07b22] drop-shadow-2xl tracking-tight">
            Authentic African Cuisine
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-sans font-medium text-amber-100">
            Safe, clean, and delicious roadside food stop near Magamaga Trading Centre along Jinja-Busia Highway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200"
            >
              Explore Menu
            </Link>
            <a
              href="tel:+256700102281"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-sans font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
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
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight font-[family-name:var(--font-playfair)]">Featured Dishes</h2>
            <p className="text-xl text-gray-600 font-sans">Try our most popular African specialties on the Jinja–Busia Road</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={dish.image}
                    alt={`${dish.name} - Best food in Magamaga`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex justify-center">
                    <Link
                      href="/booking"
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
                    >
                      Order Now
                    </Link>
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
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Our Services</h2>
            <p className="text-xl text-gray-600">Traveler stopover and event catering near Jinja</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md"
              >
                <Image
                  src={service.image}
                  alt={`${service.name} for travelers on Jinja–Busia Highway`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg font-bold">{service.name}</h3>
                </div>
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
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Our Facilities</h2>
            <p className="text-xl text-gray-600">Clean restaurant Jinja–Busia Highway with secure parking</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md"
              >
                <Image
                  src={facility.image}
                  alt={`${facility.name} - Essential for highway stopovers`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg font-bold">{facility.name}</h3>
                </div>
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
            <p className="text-xl text-amber-100">Most recommended stopover restaurant Jinja–Busia</p>
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
              <h2 className="text-4xl font-bold text-amber-600 mb-6 uppercase tracking-tight">Best Stopover on the Highway</h2>
              <p className="text-xl text-gray-600 mb-8">
                Conveniently located in Magamaga, along the Jinja-Busia Highway. We are the perfect bus stop restaurant for drivers, travelers, and tourists near Jinja.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/booking"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 text-center"
                >
                  Book a Table
                </Link>
                <a
                  href="https://wa.me/256700102281"
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
              className="rounded-2xl overflow-hidden shadow-lg h-[384px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3989.764516245139!2d33.365280!3d0.523296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMzEnMjMuOSJOIDMzwrAyMTo1NS4wIkU!5e0!3m2!1sen!2sug!4v1707500000000!5m2!1sen!2sug"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kiston Highway Restaurant Magamaga Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

