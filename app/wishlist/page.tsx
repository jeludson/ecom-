"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const initialWishlist = [
  {
    id: 1,
    name: "AeroPod Pro Max",
    price: 549,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Audio",
  },
  {
    id: 2,
    name: "NovaWatch V2",
    price: 399,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "Wearables",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeItem = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black">Your Wishlist ({wishlist.length})</h1>
        <Link href="/shop" className="text-primary hover:underline flex items-center font-bold">
          <ArrowLeft size={18} className="mr-2" /> Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 glassmorphism rounded-[3rem]">
          <Heart size={64} className="mx-auto text-white/20 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <Link href="/shop" className="inline-flex items-center px-8 py-4 bg-primary rounded-full font-bold">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glassmorphism rounded-3xl p-6 group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 glassmorphism rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs text-primary font-bold tracking-widest uppercase mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
                <span className="text-xl font-black">${item.price}</span>
              </div>
              <button className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-all">
                <ShoppingCart size={18} />
                <span>Move to Cart</span>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
