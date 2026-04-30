"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-primary/10 border border-white/10 rounded-[4rem] p-12 md:p-20 overflow-hidden group"
        >
          {/* Animated Background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/30 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glassmorphism text-xs font-medium mb-8"
              >
                <Gift size={14} className="text-secondary" />
                <span>Special Summer Promotion</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-black mb-6 leading-tight"
              >
                Mega Summer Sale <br />
                <span className="text-secondary text-5xl md:text-8xl">50% OFF</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-white/60 text-lg md:text-xl max-w-lg mb-12"
              >
                Upgrade your lifestyle with our exclusive summer collection. Limited time offer on all premium products.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Shop the Sale <ArrowRight size={20} className="ml-2" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square glassmorphism rounded-full p-4 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop"
                  alt="Promo"
                  fill
                  sizes="(max-width: 1024px) 0px, 50vw"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-center p-4 rotate-12 animate-bounce">
                <span className="text-sm font-black">Limited Time</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
