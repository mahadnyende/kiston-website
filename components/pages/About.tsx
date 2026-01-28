"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const timeline = [
    {
      year: "2015",
      title: "The Beginning",
      description: "Keystone Highway Restaurant opened its doors, serving authentic African cuisine to travelers on Highway 123."
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
      icon: "🌱",
      title: "Fresh & Quality",
      description: "We source the freshest ingredients and maintain the highest standards of food quality."
    },
    {
      icon: "❤️",
      title: "Customer First",
      description: "Every customer is treated like family, ensuring memorable dining experiences."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "We are proud to be part of the local community and support regional farmers."
    },
    {
      icon: "🔒",
      title: "Hygiene & Safety",
      description: "Rigorous hygiene standards and safe practices are our top priorities."
    }
  ];
   
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden bg-gradient-to-r from-amber-900 to-amber-800">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white px-4"
        >
          <h1 className="text-5xl font-bold mb-4 font-poppins">About Keystone Highway</h1>
          <p className="text-xl font-inter">Our story of serving authentic African cuisine</p>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2015, Keystone Highway Restaurant has been a beloved stop for travelers
                along Highway 123. What started as a small roadside eatery has grown into a
                destination known for authentic African cuisine and exceptional service.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our chefs bring traditional recipes passed down through generations, using fresh,
                locally-sourced ingredients to create meals that transport you to the heart of Africa.
                Whether you&apos;re a weary traveler seeking comfort food or a family celebrating a special occasion,
                we&apos;re here to make your experience memorable.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue our mission to serve delicious, authentic African cuisine while
                providing a welcoming space for all who pass through our doors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-96"
            >
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Keystone Highway Restaurant interior"
                fill
                className="object-cover rounded-2xl"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones in our story</p>
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
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-full md:w-1/2 px-4">
                    <div className={`bg-white rounded-2xl p-6 shadow-lg ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
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
              <div className="text-center">
                <div className="text-6xl mb-4">🥘</div>
                <h3 className="text-2xl font-semibold mb-4">Authentic Recipes</h3>
                <p className="text-amber-100">
                  Traditional African cooking methods and recipes passed down through generations,
                  prepared with love and expertise.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🧼</div>
                <h3 className="text-2xl font-semibold mb-4">Hygiene First</h3>
                <p className="text-amber-100">
                  Strict hygiene protocols and regular sanitization ensure a clean and safe
                  environment for all our guests.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-2xl font-semibold mb-4">Fresh Ingredients</h3>
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
