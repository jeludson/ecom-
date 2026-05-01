"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-12 gradient-text"
        >
          Privacy Policy
        </motion.h1>
        
        <div className="glassmorphism rounded-[3rem] p-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
            <p className="text-white/60 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">2. How We Use Your Information</h2>
            <p className="text-white/60 leading-relaxed">
              We use the information we collect to process your orders, provide customer support, improve our services, send you updates about your order, and communicate with you about our products and promotions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">3. Information Sharing</h2>
            <p className="text-white/60 leading-relaxed">
              We do not sell your personal information to third parties. We may share your information with service providers who help us operate our business, such as payment processors and shipping companies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">4. Data Security</h2>
            <p className="text-white/60 leading-relaxed">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">5. Your Rights</h2>
            <p className="text-white/60 leading-relaxed">
              You have the right to access, update, or delete your personal information. You may also opt out of receiving promotional communications from us at any time.
            </p>
          </section>

          <div className="pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
