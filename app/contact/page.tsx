"use client";

"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Twitter, Send } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook, link: "https://facebook.com/novacommerce", color: "hover:text-blue-500" },
  { name: "Instagram", icon: Instagram, link: "https://instagram.com/novacommerce", color: "hover:text-pink-500" },
  { name: "YouTube", icon: Youtube, link: "https://youtube.com/novacommerce", color: "hover:text-red-500" },
  { name: "X", icon: Twitter, link: "https://x.com/novacommerce", color: "hover:text-white" },
  { name: "Gmail", icon: Mail, link: "mailto:contact@novacommerce.com", color: "hover:text-primary" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-black mb-8 gradient-text"
          >
            Get in Touch
          </motion.h1>
          <p className="text-white/60 text-xl mb-12">
            Have questions about our futuristic products? Our team is here to 
            help you navigate the future of shopping.
          </p>

          <div className="space-y-8 mb-16">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 glassmorphism rounded-xl flex items-center justify-center text-primary">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-widest">Email Us</p>
                <p className="text-xl font-bold">contact@novacommerce.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 glassmorphism rounded-xl flex items-center justify-center text-secondary">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-widest">Call Us</p>
                <p className="text-xl font-bold">+1 (555) 000-1234</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 glassmorphism rounded-xl flex items-center justify-center text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-white/40 uppercase tracking-widest">Visit Us</p>
                <p className="text-xl font-bold">123 Future St, Neo Tokyo, 101-001</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Follow Our Journey</h3>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 glassmorphism rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  title={social.name}
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glassmorphism rounded-[3rem] p-10 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-white/40 uppercase tracking-widest ml-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/40 uppercase tracking-widest ml-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/40 uppercase tracking-widest ml-2">Subject</label>
              <input 
                type="text" 
                placeholder="How can we help?" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-white/40 uppercase tracking-widest ml-2">Message</label>
              <textarea 
                rows={5}
                placeholder="Write your message here..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <button className="w-full bg-primary hover:bg-primary/80 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <Send size={20} />
              <span>Send Message</span>
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
