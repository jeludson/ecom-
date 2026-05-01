"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Tag } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Spring Tech Sale",
    description: "Get up to 50% off on selected gadgets and accessories.",
    discount: "50% OFF",
    endsIn: "3 days",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
  },
  {
    id: 2,
    title: "Weekend Flash Deal",
    description: "Limited time offer on premium wearable devices.",
    discount: "30% OFF",
    endsIn: "12 hours",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    title: "Clearance Items",
    description: "Final chance to grab these amazing products at unbeatable prices.",
    discount: "70% OFF",
    endsIn: "Ends soon",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
];

export default function DealsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-8 gradient-text flex items-center justify-center gap-4"
        >
          <Zap size={48} className="text-primary" />
          Hot Deals
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 leading-relaxed"
        >
          Limited time offers on the most futuristic products. Don't miss out!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {deals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="glassmorphism rounded-[3rem] overflow-hidden relative">
              <div className="absolute top-6 right-6 z-10">
                <span className="bg-primary text-white text-xl font-black px-6 py-3 rounded-full">
                  {deal.discount}
                </span>
              </div>
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4 text-yellow-400">
                  <Clock size={18} />
                  <span className="font-bold">Ends in {deal.endsIn}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{deal.title}</h3>
                <p className="text-white/60 mb-6">{deal.description}</p>
                <button className="w-full bg-primary hover:bg-primary/80 text-white font-black py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
                  Shop Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
