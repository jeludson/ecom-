"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Wearable Technology",
    excerpt: "Exploring the latest innovations in smart wearables and how they're transforming our daily lives.",
    date: "April 28, 2026",
    readTime: "5 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 2,
    title: "Top 10 Gadgets You Need in 2026",
    excerpt: "A curated list of must-have tech gadgets that will elevate your lifestyle this year.",
    date: "April 25, 2026",
    readTime: "8 min read",
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: 3,
    title: "Sustainable Tech: The Green Revolution",
    excerpt: "How technology is leading the way in creating a more sustainable and eco-friendly future.",
    date: "April 20, 2026",
    readTime: "6 min read",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-8 gradient-text"
        >
          Our Blog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 leading-relaxed"
        >
          Discover insights, trends, and stories from the future of technology and innovation.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="glassmorphism rounded-[3rem] overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4 text-white/40 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/60 mb-6">
                  {post.excerpt}
                </p>
                <Link 
                  href="#"
                  className="inline-flex items-center space-x-2 text-primary font-bold hover:space-x-4 transition-all"
                >
                  <span>Read More</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}
