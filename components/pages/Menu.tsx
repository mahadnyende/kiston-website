"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { getMenuItems } from "@/lib/firebase-utils";

interface MenuItem {
  id?: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  available: boolean;
  ingredients: string[];
}

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "main", name: "Main Meals" },
    { id: "specialties", name: "Local Specialties" },
    { id: "snacks", name: "Snacks" },
    { id: "drinks", name: "Soft Drinks" },
    { id: "alcohol", name: "Alcoholic Drinks" }
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = await getMenuItems();
        setMenuItems(items);
        setError(null);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items. Please try again later.');
        // Fallback to static data if Firebase fails
        setMenuItems([
          {
            id: '1',
            name: "Jollof Rice",
            category: "main",
            description: "Traditional West African rice dish cooked in a rich tomato sauce with onions, peppers, and aromatic spices. Served with your choice of protein.",
            image: "/images/jollof-rice.jpg",
            price: 15.99,
            available: true,
            ingredients: ["Rice", "Tomatoes", "Onions", "Peppers", "Spices", "Protein"]
          },
          {
            id: '2',
            name: "Suya Skewers",
            category: "specialties",
            description: "Grilled spiced meat skewers marinated in a special blend of peanuts, spices, and herbs. A Northern Nigerian delicacy.",
            image: "/images/suya.jpg",
            price: 12.99,
            available: true,
            ingredients: ["Beef", "Peanuts", "Spices", "Herbs", "Onions"]
          },
          {
            id: '3',
            name: "Egusi Soup",
            category: "main",
            description: "Melon seed soup with vegetables, meat, and fish. A rich and nutritious West African stew served with pounded yam or rice.",
            image: "/images/egusi.jpg",
            price: 18.99,
            available: true,
            ingredients: ["Melon seeds", "Vegetables", "Meat", "Fish", "Palm oil"]
          },
          {
            id: '4',
            name: "Puff Puff",
            category: "snacks",
            description: "Sweet fried dough balls dusted with sugar. A popular West African snack perfect for any time of day.",
            image: "/images/puff-puff.jpg",
            price: 5.99,
            available: true,
            ingredients: ["Flour", "Sugar", "Yeast", "Oil"]
          },
          {
            id: '5',
            name: "Chapati",
            category: "snacks",
            description: "East African flatbread made with wheat flour, water, and oil. Perfect accompaniment to stews and soups.",
            image: "/images/chapati.jpg",
            price: 3.99,
            available: true,
            ingredients: ["Wheat flour", "Water", "Oil", "Salt"]
          },
          {
            id: '6',
            name: "Mala Mogodu",
            category: "specialties",
            description: "Traditional South African tripe dish slow-cooked with beans and spices. A hearty and flavorful meal.",
            image: "/images/mala-mogodu.jpg",
            price: 16.99,
            available: true,
            ingredients: ["Tripe", "Beans", "Onions", "Spices", "Stock"]
          },
          {
            id: '7',
            name: "Coca-Cola",
            category: "drinks",
            description: "Classic refreshing cola drink. Served ice-cold.",
            image: "/images/coca-cola.jpg",
            price: 2.99,
            available: true,
            ingredients: ["Carbonated water", "Sugar", "Caramel color", "Natural flavors"]
          },
          {
            id: '8',
            name: "Castle Lager",
            category: "alcohol",
            description: "South African premium lager beer. Smooth and refreshing with a clean finish.",
            image: "/images/castle-lager.jpg",
            price: 4.99,
            available: true,
            ingredients: ["Malted barley", "Hops", "Yeast", "Water"]
          },
          {
            id: '9',
            name: "Fresh Orange Juice",
            category: "drinks",
            description: "Freshly squeezed orange juice made from ripe, juicy oranges. No artificial additives.",
            image: "/images/orange-juice.jpg",
            price: 3.99,
            available: true,
            ingredients: ["Fresh oranges"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4 font-poppins"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl font-inter"
          >
            Authentic African cuisine crafted with fresh ingredients
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 group cursor-pointer" onClick={() => setSelectedDish(item)}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {item.available && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Available Today
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                          +{item.ingredients.length - 3} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedDish(item)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDish(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedDish(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedDish.name}</h2>
                  <span className="text-3xl font-bold text-amber-600">${selectedDish.price}</span>
                </div>

                <p className="text-gray-600 mb-6 text-lg">{selectedDish.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDish.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-medium transition-colors duration-200">
                    Add to Order
                  </button>
                  <a
                    href="tel:+1234567890"
                    className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-3 rounded-full font-medium transition-colors duration-200 text-center"
                  >
                    Call to Order
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
