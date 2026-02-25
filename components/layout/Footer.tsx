import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2d251f] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
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
            <p className="text-gray-300 mb-4 max-w-md">
              Experience the rich, authentic flavors of Africa at Kiston Highway Restaurant.
              We serve fresh, heart-warming meals for travelers, families, and special events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-amber-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-amber-100 hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-amber-100 hover:text-white transition-colors">
                  Services & Catering
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-amber-100 hover:text-white transition-colors">
                  Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <span className="text-amber-100">+256 700 102281</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle size={16} />
                <a href="https://wa.me/256700102281" className="text-amber-100 hover:text-white transition-colors">
                  WhatsApp: +256 700 102281
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span className="text-amber-100">info@kistonhighway.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1" />
                <span className="text-amber-100 italic">
                  Magamaga, Along<br />
                  Jinja-Busia Highway
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-200 text-sm">
              © 2026 Kiston Highway Restaurant. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-amber-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-amber-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <span className="text-amber-300 text-sm">
                Age-restricted: 21+ for alcoholic beverages
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

