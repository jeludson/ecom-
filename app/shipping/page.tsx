"use client";

import { motion } from "framer-motion";
import { Truck, Plane, Clock, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-12 gradient-text flex items-center gap-4"
        >
          <Truck size={48} className="text-primary" />
          Shipping Information
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glassmorphism rounded-[3rem] p-8 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Truck className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Standard Shipping</h3>
            <p className="text-white/40 mb-2">3-7 Business Days</p>
            <p className="text-2xl font-black text-primary">Free</p>
          </div>

          <div className="glassmorphism rounded-[3rem] p-8 text-center border-2 border-primary/50">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plane className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Express Shipping</h3>
            <p className="text-white/40 mb-2">1-2 Business Days</p>
            <p className="text-2xl font-black text-primary">$19.99</p>
          </div>

          <div className="glassmorphism rounded-[3rem] p-8 text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="text-secondary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Overnight</h3>
            <p className="text-white/40 mb-2">Next Day</p>
            <p className="text-2xl font-black text-secondary">$39.99</p>
          </div>
        </div>

        <div className="glassmorphism rounded-[3rem] p-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin size={28} className="text-primary" />
              International Shipping
            </h2>
            <p className="text-white/60 leading-relaxed">
              We ship to over 150 countries worldwide! International shipping rates and delivery times vary by location. You can see the exact shipping cost for your country during checkout.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Order Processing</h2>
            <p className="text-white/60 leading-relaxed">
              Orders are processed within 1-2 business days (excluding weekends and holidays). Once your order has been shipped, you will receive an email with your tracking number and delivery information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Tracking Your Order</h2>
            <p className="text-white/60 leading-relaxed">
              You can track your order by logging into your account and visiting the Orders page. You can also use the tracking link provided in your shipping confirmation email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Shipping Restrictions</h2>
            <p className="text-white/60 leading-relaxed">
              Some items may have shipping restrictions due to international regulations. If an item cannot be shipped to your location, you will be notified during checkout.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
