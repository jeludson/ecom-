"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-12 gradient-text"
        >
          Terms of Service
        </motion.h1>
        
        <div className="glassmorphism rounded-[3rem] p-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
            <p className="text-white/60 leading-relaxed">
              By accessing and using NovaCommerce, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">2. Use of Service</h2>
            <p className="text-white/60 leading-relaxed">
              You agree to use NovaCommerce only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">3. Products and Pricing</h2>
            <p className="text-white/60 leading-relaxed">
              We reserve the right to modify prices and product availability at any time without notice. All orders are subject to acceptance and availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">4. Intellectual Property</h2>
            <p className="text-white/60 leading-relaxed">
              All content on NovaCommerce, including text, graphics, logos, and software, is the property of NovaCommerce and protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">5. Limitation of Liability</h2>
            <p className="text-white/60 leading-relaxed">
              NovaCommerce shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our service.
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
