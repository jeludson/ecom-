"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Laptop, Smartphone, Headphones, Watch, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Audio", icon: Headphones, count: 2, color: "text-blue-500", bg: "bg-blue-500/10", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { name: "Wearables", icon: Watch, count: 2, color: "text-purple-500", bg: "bg-purple-500/10", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { name: "Laptops", icon: Laptop, count: 1, color: "text-emerald-500", bg: "bg-emerald-500/10", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853" },
  { name: "Phones", icon: Smartphone, count: 1, color: "text-orange-500", bg: "bg-orange-500/10", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
  { name: "Gaming", icon: Gamepad2, count: 2, color: "text-red-500", bg: "bg-red-500/10", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128" },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="mb-16">
        <h1 className="text-5xl font-black mb-4">Categories</h1>
        <p className="text-white/60 text-xl">Browse our collection by technology type.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden glassmorphism rounded-[3rem] p-8 h-[400px] flex flex-col justify-between"
          >
            <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            
            <div className="relative z-10">
              <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6`}>
                <cat.icon size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-2">{cat.name}</h2>
              <p className="text-white/40 font-medium tracking-widest uppercase text-sm">{cat.count} Products</p>
            </div>

            <Link 
              href={`/shop?category=${cat.name}`}
              className="relative z-10 self-start flex items-center space-x-3 bg-white/10 hover:bg-primary text-white font-bold px-8 py-4 rounded-full transition-all duration-300 group-hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
