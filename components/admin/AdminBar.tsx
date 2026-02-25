"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  LogOut, 
  User, 
  UtensilsCrossed, 
  Calendar, 
  ChefHat, 
  Award, 
  Settings as SettingsIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminBar = () => {
  const [user, setUser] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsVisible(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isVisible) return null;

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/inquiries", label: "Inquiries", icon: ChefHat },
    { href: "/admin/testimonials", label: "Reviews", icon: Award },
    { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="bg-[#1a1614] text-white py-1.5 px-4 flex flex-col md:flex-row items-center justify-between border-b border-white/10 text-[10px] md:text-xs font-sans min-h-[40px] gap-2 md:gap-0"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider shrink-0">
            <User size={14} />
            <span className="hidden xs:inline">Admin</span>
          </div>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <span className="text-gray-400 hidden lg:block truncate max-w-[150px]">{user?.email}</span>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full py-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 py-1 px-3 rounded-full transition-all shrink-0 ${
                  isActive 
                    ? "bg-amber-500 text-[#1a1614] font-bold shadow-lg shadow-amber-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={12} className={isActive ? "stroke-[3px]" : ""} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors py-1 px-3 rounded-full hover:bg-white/5"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminBar;
