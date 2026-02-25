"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const timeline = [
    {
      year: "2015",
      title: "The Beginning",
      description: "Kiston Highway Restaurant opened its doors, serving authentic African cuisine to travelers in Magamaga, Along Jinja-Busia Highway."
    },
    {
      year: "2018",
      title: "Expansion",
      description: "Added catering services and expanded our menu to include more regional specialties."
    },
    {
      year: "2020",
      title: "Community Focus",
      description: "Introduced family-friendly areas and enhanced facilities to better serve our growing community."
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Launched our online presence and booking system to make reservations easier for travelers."
    }
  ];

  const values = [
    {
      image: "/images/fresh-quality.webp",
      title: "Fresh & Quality",
      description: "We source the freshest ingredients and maintain the highest standards of food quality."
    },
    {
      image: "/images/customer-first.webp",
      title: "Customer First",
      description: "Every customer is treated like family, ensuring memorable dining experiences."
    },
    {
      image: "/images/community.webp",
      title: "Community",
      description: "We are proud to be part of the local community and support regional farmers."
    },
    {
      image: "/images/hygiene-safety.webp",
      title: "Hygiene & Safety",
      description: "Rigorous hygiene standards and safe practices are our top priorities."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about-hero.webp"
          alt="About Kiston Highway Restaurant Magamaga"
          fill
          priority
          className="object-cover brightness-50"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-[#e07b22] drop-shadow-2xl tracking-tight">About Kiston Highway</h1>
          <p className="text-xl md:text-2xl font-sans font-medium text-amber-100 italic">Trusted roadside restaurant serving authentic African cuisine near Jinja.</p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-amber-600 mb-6 uppercase tracking-tight">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2015, Kiston Highway Restaurant has been a beloved stop for travelers
                along Magamaga, Along Jinja-Busia Highway. What started as a small roadside food stop has grown into a
                trusted stopover destination known for authentic Ugandan food and exceptional service near Jinja outskirts.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our chefs bring traditional recipes passed down through generations, using fresh,
                locally-sourced ingredients to create meals that transport you to the heart of Africa.
                Whether you&apos;re a weary traveler seeking comfort food or a family celebrating a special occasion,
                we&apos;re here to make your experience memorable.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue our mission to serve delicious, authentic African cuisine in Magamaga while
                providing a welcoming and clean space for all who pass through our doors on the Jinja-Busia road.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-96"
            >
              <Image
                src="/images/our-story.webp"
                alt="Story of Kiston - Best roadside restaurant near Jinja"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                className="object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Our Values</h2>
            <p className="text-xl text-gray-600">What drives the best stopover restaurant on the highway</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-24 w-24 mx-auto mb-6">
                  <Image
                    src={value.image}
                    alt={`${value.title} at Kiston Highway`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-600 mb-4 uppercase tracking-tight">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones of Kiston Restaurant in Magamaga</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200 hidden md:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  <div className="w-full md:w-1/2 px-4">
                    <div className={`bg-white rounded-2xl p-6 shadow-lg ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}>
                      <div className="text-3xl font-bold text-amber-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                  <div className="w-full md:w-1/2 px-4"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Our Quality Promise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/authentic-recipes.webp"
                    alt="Authentic Ugandan Recipes in Magamaga"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Authentic Recipes</h3>
                <p className="text-amber-100">
                  Traditional African cooking methods and recipes passed down through generations,
                  prepared with love and expertise.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/hygiene-first.webp"
                    alt="Clean and safe food stop on Jinja-Busia Highway"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Hygiene First</h3>
                <p className="text-amber-100">
                  Strict hygiene protocols and regular sanitization ensure a clean and safe
                  environment for all our guests.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src="/images/fresh-ingredients.webp"
                    alt="Fresh local ingredients for best pilau in Magamaga"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Fresh Ingredients</h3>
                <p className="text-amber-100">
                  We source the freshest ingredients daily from local suppliers,
                  guaranteeing quality in every bite.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
