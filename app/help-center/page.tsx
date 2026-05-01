"use client";

import { motion } from "framer-motion";
import { HelpCircle, Mail, Phone, Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the Orders page. You'll receive a tracking number via email once your order ships.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. Please visit our Returns page for more details.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-7 business days. Express shipping is available for 1-2 business days delivery.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship to over 150 countries worldwide. Shipping rates and delivery times vary by location.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our support team via email at support@novacommerce.com or call us at +1 (555) 000-1234. Our team is available 24/7.",
  },
];

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-8 gradient-text"
        >
          Help Center
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 leading-relaxed"
        >
          Find answers to common questions or get in touch with our support team.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto mb-20">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={28} />
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-20 pr-10 text-xl outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glassmorphism rounded-[2rem] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-8 flex items-center justify-between"
              >
                <span className="text-xl font-bold">{faq.question}</span>
                <HelpCircle size={24} className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-8 text-white/60"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="glassmorphism rounded-[3rem] p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-white/60 mb-8 text-lg">Our support team is here to help you 24/7.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-3 bg-primary hover:bg-primary/80 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105">
              <Mail size={20} />
              <span>Email Us</span>
            </button>
            <button className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105">
              <Phone size={20} />
              <span>Call Us</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
