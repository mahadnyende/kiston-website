import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Keystone Highway Restaurant</h3>
            <p className="text-amber-100 mb-4">
              Serving authentic African cuisine to travelers, families, and event clients.
              Fresh, quality meals with excellent service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
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
                <span className="text-amber-100">+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span className="text-amber-100">info@keystonehighway.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1" />
                <span className="text-amber-100">
                  Highway 123, Mile Marker 45<br />
                  Keystone, State 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-200 text-sm">
              © 2026 Keystone Highway Restaurant. All rights reserved.
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
