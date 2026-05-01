"use client";

import { motion } from "framer-motion";
import { Cookie, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function CookiesPage() {
  const [cookiesEnabled, setCookiesEnabled] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-12 gradient-text flex items-center gap-4"
        >
          <Cookie size={48} className="text-primary" />
          Cookies Settings
        </motion.h1>
        
        <div className="glassmorphism rounded-[3rem] p-10 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-6">About Cookies</h2>
            <p className="text-white/60 leading-relaxed">
              We use cookies to improve your browsing experience, analyze site traffic, and personalize content. You can choose which types of cookies you want to allow.
            </p>
          </section>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl">
              <div>
                <h3 className="text-lg font-bold mb-2">Necessary Cookies</h3>
                <p className="text-white/60 text-sm">Required for basic site functionality. Cannot be disabled.</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={28} className="text-green-500" />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl">
              <div>
                <h3 className="text-lg font-bold mb-2">Analytics Cookies</h3>
                <p className="text-white/60 text-sm">Help us understand how visitors interact with our website.</p>
              </div>
              <button 
                onClick={() => setCookiesEnabled(p => ({ ...p, analytics: !p.analytics }))}
                className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center p-1 ${cookiesEnabled.analytics ? 'bg-green-500' : 'bg-white/20'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${cookiesEnabled.analytics ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl">
              <div>
                <h3 className="text-lg font-bold mb-2">Marketing Cookies</h3>
                <p className="text-white/60 text-sm">Used to show you relevant ads and marketing content.</p>
              </div>
              <button 
                onClick={() => setCookiesEnabled(p => ({ ...p, marketing: !p.marketing }))}
                className={`w-14 h-8 rounded-full transition-all duration-300 flex items-center p-1 ${cookiesEnabled.marketing ? 'bg-green-500' : 'bg-white/20'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${cookiesEnabled.marketing ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
              Save Preferences
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
              Accept All
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
              Decline All
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
