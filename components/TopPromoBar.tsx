"use client";

import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function TopPromoBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient py-2 px-6 relative z-[60]"
    >
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <Sparkles size={16} className="text-white animate-pulse" />
        <p className="text-white text-xs md:text-sm font-bold tracking-wide text-center">
          MEGA SUMMER SALE IS LIVE! GET <span className="underline decoration-2">50% OFF</span> ON ALL PREMIUM PRODUCTS. 
          <button className="ml-4 px-3 py-1 bg-white text-primary rounded-full hover:bg-white/90 transition-colors">
            SHOP NOW
          </button>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
