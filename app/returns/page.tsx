"use client";

import { motion } from "framer-motion";
import { Package, ArrowLeftCircle, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-12 gradient-text flex items-center gap-4"
        >
          <ArrowLeftCircle size={48} className="text-primary" />
          Returns Policy
        </motion.h1>
        
        <div className="glassmorphism rounded-[3rem] p-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Package size={28} className="text-primary" />
              Return Eligibility
            </h2>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Items must be returned within 30 days of delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Items must be in original, unused condition with all tags attached</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Original packaging must be intact</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={24} className="text-green-500 mt-1 flex-shrink-0" />
                <span>Proof of purchase is required</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">How to Return an Item</h2>
            <ol className="space-y-4 text-white/60 list-decimal list-inside">
              <li>Contact our customer support team to initiate a return</li>
              <li>Wait for your return authorization number</li>
              <li>Package the item securely with all original contents</li>
              <li>Ship the item to the address provided</li>
              <li>Wait for your refund or exchange to be processed</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Refunds</h2>
            <p className="text-white/60 leading-relaxed">
              Once we receive and inspect your returned item, we will process your refund within 5-7 business days. Refunds will be credited to your original payment method. Please note that shipping charges are non-refundable unless the return is due to our error.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Exchanges</h2>
            <p className="text-white/60 leading-relaxed">
              If you would like to exchange an item for a different size, color, or product, please contact our customer support team. Exchanges are subject to product availability.
            </p>
          </section>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/60 mb-6">Have questions about returns? Contact our support team.</p>
            <button className="bg-primary hover:bg-primary/80 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
