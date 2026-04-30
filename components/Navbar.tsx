"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, User, Menu, X, Search, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "./CartContext";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Categories", link: "/categories" },
  { name: "Deals", link: "/deals" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">NovaCommerce</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="hover:text-primary transition-colors relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-secondary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            <Link href="/cart" className="hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={
                    (session.user as any)?.role === "ADMIN" ? "/admin" : 
                    (session.user as any)?.role === "SELLER" ? "/seller" : "/profile"
                  } 
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  {(session.user as any)?.role === "BUYER" ? <User size={20} /> : <LayoutDashboard size={20} />}
                  <span className="text-xs font-bold truncate max-w-[80px]">{session.user?.name}</span>
                </Link>
                <button onClick={() => signOut()} className="text-white/40 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="hover:text-primary transition-colors">
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-background border-b border-white/10 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.link}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                  <button onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}>
                    <Search size={20} />
                  </button>
                  <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart size={20} />
                  </Link>
                  <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart size={20} />
                  </Link>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-3xl">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={32} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search futuristic products..."
                  className="w-full bg-white/5 border-b-2 border-primary/20 focus:border-primary outline-none py-8 pl-20 pr-10 text-3xl font-bold transition-all"
                />
              </div>
              <div className="mt-12">
                <h4 className="text-white/40 font-bold uppercase tracking-widest text-sm mb-6">Popular Searches</h4>
                <div className="flex flex-wrap gap-4">
                  {["AeroPod", "NovaWatch", "Vision Goggles", "Smart Home", "Luxury Wear"].map((term) => (
                    <button key={term} className="px-6 py-3 glassmorphism rounded-full hover:bg-primary transition-colors font-medium">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
