import { Link } from "wouter";
import { Leaf, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-eco-green" />
              <span className="text-xl font-bold text-eco-green">EcoBin</span>
            </div>
            <p className="text-gray-300 mb-4">
              AI-powered waste management for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco-green transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-eco-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-300 hover:text-eco-green transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/scanner" className="text-gray-300 hover:text-eco-green transition-colors">
                  Scanner
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-eco-green transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-eco-green transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  AI Waste Scanner
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Smart Scheduling
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Rewards System
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Community Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-eco-green transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 EcoBin. All rights reserved. Built with ❤️ for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}
