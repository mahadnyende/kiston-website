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

const normalizeMenuImagePath = (path: string) =>
  path.startsWith("/images/menu/") ? path.replace(/\.png$/i, ".webp") : path;

const FALLBACK_MENU_ITEMS: MenuItem[] = [
  // MAIN MEALS
  {
    id: 'm1',
    name: "Beef Pilau",
    category: "main",
    description: "Fragrant rice dish cooked with tender beef and aromatic spices - best pilau in Magamaga.",
    image: "/images/menu/beef-pilau.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm2',
    name: "Chicken Pilau",
    category: "main",
    description: "Aromatic spiced rice cooked with succulent chicken pieces, a Jinja-Busia Highway favorite.",
    image: "/images/menu/chicken-pilau.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm3',
    name: "Beef Stew",
    category: "main",
    description: "Hearty slow-cooked beef in a rich, savory tomato-based gravy.",
    image: "/images/menu/beef-stew.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm4',
    name: "Rice & Chicken Stew",
    category: "main",
    description: "Fluffy white rice served with flavorful chicken stew.",
    image: "/images/menu/rice-chicken-stew.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm5',
    name: "Goat Meat",
    category: "main",
    description: "Tender goat meat prepared with traditional local spices along Jinja-Busia Road.",
    image: "/images/menu/goat-meat.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm6',
    name: "Fish Fillet",
    category: "main",
    description: "Succulent pan-seared or fried fish fillet from Lake Victoria.",
    image: "/images/menu/fish-fillet.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm7',
    name: "Spaghetti",
    category: "main",
    description: "Classic spaghetti served with your choice of beef or chicken sauce.",
    image: "/images/menu/spaghetti.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm8',
    name: "Offals",
    category: "main",
    description: "Traditional delicacy featuring liver and tripe cooked to perfection.",
    image: "/images/menu/offals.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm9',
    name: "Rice",
    category: "main",
    description: "Steamed fluffy white rice, a perfect accompaniment to any stew.",
    image: "/images/menu/rice.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm10',
    name: "Matooke",
    category: "main",
    description: "Traditional steamed and mashed green bananas.",
    image: "/images/menu/matooke.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm11',
    name: "Posho",
    category: "main",
    description: "Solid cornmeal staple, served fresh and warm.",
    image: "/images/menu/posho.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm12',
    name: "Irish Potatoes",
    category: "main",
    description: "Boiled or fried Irish potatoes.",
    image: "/images/menu/irish-potatoes.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm13',
    name: "Sweet Potatoes",
    category: "main",
    description: "Steamed local sweet potatoes, rich in flavor.",
    image: "/images/menu/sweet-potatoes.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'm14',
    name: "Beans",
    category: "main",
    description: "Nutritious local beans cooked in a savory sauce.",
    image: "/images/menu/beans.webp",
    price: 0,
    available: true,
    ingredients: []
  },

  // SPECIALTIES
  {
    id: 's1',
    name: "Katogo",
    category: "specialties",
    description: "Hearty breakfast blend of matooke, cassava, and offals - authentic Ugandan Katogo.",
    image: "/images/menu/katogo.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 's2',
    name: "Local Fish Selection",
    category: "specialties",
    description: "Tilapia or Mukene prepared in traditional local style.",
    image: "/images/menu/fish-local.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 's3',
    name: "Whole Fried Tilapia",
    category: "specialties",
    description: "Crispy whole tilapia fish, seasoned and deep-fried to perfection.",
    image: "/images/menu/whole-tilapia.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 's4',
    name: "Signature Rolex",
    category: "specialties",
    description: "Popular street food - chapati rolled with eggs and optional sausage.",
    image: "/images/menu/rolex.webp",
    price: 0,
    available: true,
    ingredients: []
  },

  // SNACKS
  {
    id: 'sn1',
    name: "Burgers",
    category: "snacks",
    description: "Juicy beef or chicken burgers with fresh toppings.",
    image: "/images/menu/burgers.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn2',
    name: "Pizza",
    category: "snacks",
    description: "Freshly baked pizza with assorted toppings.",
    image: "/images/menu/pizza.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn3',
    name: "Sandwiches",
    category: "snacks",
    description: "Freshly made sandwiches with assorted fillings.",
    image: "/images/menu/sandwiches.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn4',
    name: "Chips & Chicken",
    category: "snacks",
    description: "Crispy french fries served with fried chicken.",
    image: "/images/menu/chips-chicken.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn5',
    name: "Chips & Beef",
    category: "snacks",
    description: "Crispy french fries served with seasoned beef.",
    image: "/images/menu/chips-beef.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn6',
    name: "Fish & Chips",
    category: "snacks",
    description: "Classic battered fish served with golden fries.",
    image: "/images/menu/fish-chips.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn7',
    name: "Samosas",
    category: "snacks",
    description: "Crispy pastries filled with spiced meat or vegetables.",
    image: "/images/menu/samosas.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn8',
    name: "Chapati",
    category: "snacks",
    description: "Soft, layered handmade flatbread.",
    image: "/images/menu/chapati.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn9',
    name: "Mandazi",
    category: "snacks",
    description: "Traditional African fried bread - light and fluffy.",
    image: "/images/menu/mandazi.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'sn10',
    name: "Pancakes",
    category: "snacks",
    description: "Sweet, local-style pancakes.",
    image: "/images/menu/pancakes.webp",
    price: 0,
    available: true,
    ingredients: []
  },

  // DRINKS
  {
    id: 'd1',
    name: "African Tea",
    category: "drinks",
    description: "Traditional spiced milk tea.",
    image: "/images/menu/african-tea.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'd2',
    name: "Black Tea",
    category: "drinks",
    description: "Classic brewed black tea.",
    image: "/images/menu/black-tea.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'd3',
    name: "Soft Drinks & Water",
    category: "drinks",
    description: "Assorted sodas and pure mineral water.",
    image: "/images/menu/soft-drinks.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'd4',
    name: "Coca-Cola",
    category: "drinks",
    description: "Classic chilled Coca-Cola.",
    image: "/images/menu/cocacola.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'd5',
    name: "Fanta",
    category: "drinks",
    description: "Orange-flavored fizzy drink.",
    image: "/images/menu/fanta.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'd6',
    name: "Sprite",
    category: "drinks",
    description: "Lemon-lime flavored fizzy drink.",
    image: "/images/menu/sprite.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'd7',
    name: "Lavita",
    category: "drinks",
    description: "Refreshing juice or energy drink option.",
    image: "/images/menu/lavita.webp",
    price: 0,
    available: true,
    ingredients: []
  },

  // ALCOHOL
  {
    id: 'a1',
    name: "Selected Beers",
    category: "alcohol",
    description: "A variety of cold local and international beers.",
    image: "/images/menu/beer.webp",
    price: 0,
    available: true,
    ingredients: []
  },
  {
    id: 'a2',
    name: "Selected Wines",
    category: "alcohol",
    description: "Fine selection of red and white wines.",
    image: "/images/menu/wine.webp",
    price: 0,
    available: true,
    ingredients: []
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(FALLBACK_MENU_ITEMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Items", image: "/images/authentic-cuisine.webp", color: "amber" },
    { id: "main", name: "Main Meals", image: "/images/menu/beef-pilau.webp", color: "orange" },
    { id: "specialties", name: "Local Specialties", image: "/images/menu/katogo.webp", color: "rose" },
    { id: "snacks", name: "Snacks", image: "/images/menu/pizza.webp", color: "green" },
    { id: "drinks", name: "Beverages", image: "/images/menu/african-tea.webp", color: "blue" },
    { id: "alcohol", name: "Alcoholic Drinks", image: "/images/menu/beer.webp", color: "purple" }
  ];

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      amber: { bg: "bg-amber-600", text: "text-amber-600", border: "border-amber-600" },
      orange: { bg: "bg-orange-600", text: "text-orange-600", border: "border-orange-600" },
      rose: { bg: "bg-rose-700", text: "text-rose-700", border: "border-rose-700" },
      green: { bg: "bg-green-600", text: "text-green-600", border: "border-green-600" },
      blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-600" },
      purple: { bg: "bg-purple-700", text: "text-purple-700", border: "border-purple-700" }
    };
    return colors[color]?.[type] || colors.amber[type];
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = await getMenuItems();
        if (items && items.length > 0) {
          setMenuItems(
            items.map((item) => ({
              ...item,
              image: normalizeMenuImagePath(item.image),
            })),
          );
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        // Error already handled by holding onto FALLBACK_MENU_ITEMS
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
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/menu-hero.webp"
          alt="Our Menu at Kiston Highway Restaurant Magamaga"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-[#e07b22] drop-shadow-2xl tracking-tight">
            Our Menu
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl font-sans font-medium max-w-3xl mx-auto text-amber-100 italic"
          >
            Savor the best Ugandan food and authentic African dishes on the Jinja–Busia Highway, prepared fresh daily in Magamaga.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-amber-600 mb-2 uppercase tracking-tight">Explore Our Cuisines</h2>
            <div className="h-1 w-20 bg-amber-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative h-32 rounded-2xl overflow-hidden group transition-all duration-300 ${isActive ? "ring-4 ring-offset-2 ring-amber-500 scale-105" : "hover:scale-105"
                    }`}
                >
                  <Image
                    src={category.image}
                    alt={`${category.name} in Magamaga`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isActive ? "brightness-75" : "brightness-50"
                      }`}
                  />
                  <div className={`absolute inset-0 flex items-center justify-center p-2 text-center transition-colors ${isActive ? "bg-amber-600/30" : "bg-black/20 group-hover:bg-black/10"
                    }`}>
                    <span className="text-white font-bold text-sm md:text-base drop-shadow-lg">
                      {category.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items with Dynamic Heading */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h3 className={`text-4xl font-bold ${getColorClass(categories.find(c => c.id === selectedCategory)?.color || 'amber', 'text')
              }`}>
              {categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <span className="text-gray-500 font-medium">
              {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Found
            </span>
          </div>
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
                      alt={`${item.name} - Best food in Magamaga`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>


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
                  alt={`${selectedDish.name} details - Kiston Highway`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
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
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedDish.name}</h2>
                </div>

                <p className="text-gray-600 mb-6 text-lg">{selectedDish.description}</p>


                <div className="flex gap-4">
                  <a
                    href="tel:+256700102281"
                    className={`flex-1 border-2 py-3 rounded-full font-medium transition-colors duration-200 text-center ${getColorClass(categories.find(c => c.id === selectedDish.category)?.color || 'amber', 'text')
                      } ${getColorClass(categories.find(c => c.id === selectedDish.category)?.color || 'amber', 'border')
                      } hover:bg-opacity-5`}
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

