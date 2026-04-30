import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-8 gradient-text"
        >
          About NovaCommerce
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 leading-relaxed"
        >
          We are the pioneers of futuristic retail, bringing you the most advanced 
          technology and luxury items from around the globe. Our mission is to 
          bridge the gap between today and tomorrow.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-[3rem] p-10"
        >
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="text-primary" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="text-white/60">
            To create a seamless ecosystem where innovation meets elegance. We believe 
            that every interaction with technology should be an experience of luxury 
            and efficiency.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-[3rem] p-10"
        >
          <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="text-secondary" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Values</h3>
          <p className="text-white/60">
            Innovation, Integrity, and Impact. We don't just sell products; we 
            curate the future. Every item in our catalog is verified for 
            quality and authenticity.
          </p>
        </motion.div>
      </div>

      <div className="glassmorphism rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <h2 className="text-4xl font-black mb-8">Join the Revolution</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
          Since our inception in 2024, NovaCommerce has grown into a global 
          community of tech enthusiasts and luxury seekers. We are constantly 
          evolving, just like the world around us.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-4xl font-black text-primary">10M+</p>
            <p className="text-sm text-white/40 uppercase tracking-widest mt-2">Users</p>
          </div>
          <div>
            <p className="text-4xl font-black text-secondary">50k+</p>
            <p className="text-sm text-white/40 uppercase tracking-widest mt-2">Products</p>
          </div>
          <div>
            <p className="text-4xl font-black text-primary">150+</p>
            <p className="text-sm text-white/40 uppercase tracking-widest mt-2">Countries</p>
          </div>
          <div>
            <p className="text-4xl font-black text-secondary">24/7</p>
            <p className="text-sm text-white/40 uppercase tracking-widest mt-2">Support</p>
          </div>
        </div>
      </div>
    </main>
  );
}
