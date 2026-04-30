"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Audio",
    count: 24,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    size: "lg",
  },
  {
    id: 2,
    name: "Wearables",
    count: 18,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1974&auto=format&fit=crop",
    size: "sm",
  },
  {
    id: 3,
    name: "Laptops",
    count: 12,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2070&auto=format&fit=crop",
    size: "sm",
  },
  {
    id: 4,
    name: "Phones",
    count: 15,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2070&auto=format&fit=crop",
    size: "lg",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-white/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-white/60">Explore our curated collections of futuristic items.</p>
          </div>
          <Link href="/categories" className="text-primary hover:underline font-medium">
            All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-3xl aspect-[4/5] ${
                category.size === "lg" ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  {category.count} Products
                </span>
                <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                <Link
                  href={`/shop?category=${category.name}`}
                  className="flex items-center space-x-2 text-sm font-bold group-hover:text-primary transition-colors"
                >
                  Explore Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
