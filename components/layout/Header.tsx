"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Menu", href: "/menu" },
        { name: "Services", href: "/services" },
        { name: "Facilities", href: "/facilities" },
        { name: "Booking", href: "/booking" },
    ];

    return (
        <header className="bg-[#2d251f] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group py-2">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/images/kiston.webp"
                                alt="Kiston Highway Restaurant Logo"
                                fill
                                sizes="48px"
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-white leading-none tracking-tight">
                                Kiston
                            </span>
                            <span className="text-[10px] font-sans font-extrabold text-amber-500 tracking-[0.2em] mt-1 leading-none uppercase">
                                Highway Restaurant
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => {
                            const isActive = item.href === "/" 
                                ? pathname === "/" 
                                : pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "");
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-2 py-1 text-xs font-sans font-bold uppercase tracking-widest transition-all duration-200 relative group ${isActive ? "text-amber-500" : "text-gray-200 hover:text-amber-500"
                                        }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-2 right-2 h-[2px] bg-amber-500"
                                            initial={false}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-white hover:text-amber-500 hover:bg-white/10"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/10 overflow-hidden"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#2d251f]">
                                {navItems.map((item) => {
                                    const isActive = item.href === "/" 
                                        ? pathname === "/" 
                                        : pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "");
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                                                isActive 
                                                    ? "text-amber-500 bg-white/10" 
                                                    : "text-gray-200 hover:text-amber-500 hover:bg-white/5"
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;

