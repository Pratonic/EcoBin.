import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Moon, Sun, Leaf } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/schedule", label: "Schedule" },
    { href: "/scanner", label: "Scanner" },
    { href: "/analytics", label: "Analytics" },
    { href: "/community", label: "Community" },
    { href: "/learn", label: "Learn" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-eco-green" />
            <span className="text-xl font-bold text-eco-green">EcoBin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-eco-green"
                      : "text-gray-700 dark:text-gray-300 hover:text-eco-green"
                  }`}
                >
                  {item.label}
                </Link>
              ))
            ) : (
              <div className="flex items-center space-x-6">
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                  How It Works
                </a>
                <a href="#community" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                  Community
                </a>
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                  About
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user?.firstName || user?.email}
                  </span>
                  <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.firstName?.[0] || user?.email?.[0] || "U"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = "/api/logout"}
                  className="border-gray-300 dark:border-gray-600"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => window.location.href = "/api/login"}
                className="bg-eco-green hover:bg-eco-dark-green text-white"
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-6">
                  {isAuthenticated ? (
                    navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "text-eco-green"
                            : "text-gray-700 dark:text-gray-300 hover:text-eco-green"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                        Features
                      </a>
                      <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                        How It Works
                      </a>
                      <a href="#community" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                        Community
                      </a>
                      <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-eco-green transition-colors">
                        About
                      </a>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
