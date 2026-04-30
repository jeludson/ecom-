"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Tech Enthusiast",
    quote: "The future of shopping is here. NovaCommerce provides an experience unlike any other platform.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: 2,
    name: "Sarah Parker",
    role: "Fashion Designer",
    quote: "Elegant design and seamless animations. The product quality matches the website's luxury feel.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Smart Home Guru",
    quote: "A perfect blend of technology and retail. Every purchase has been smooth and the delivery is fast.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-white/5 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-white/60">What our community says about us.</p>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="relative w-full max-w-4xl min-h-[400px]">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: active === index ? 1 : 0,
                x: active === index ? 0 : active < index ? 100 : -100,
                pointerEvents: active === index ? "auto" : "none",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center glassmorphism rounded-[3rem] p-12 text-center"
            >
              <Quote size={48} className="text-primary/40 mb-8" />
              <p className="text-xl md:text-2xl font-medium mb-12 italic leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex flex-col items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full border-4 border-primary/20 mb-4"
                />
                <h4 className="text-xl font-bold">{testimonial.name}</h4>
                <p className="text-white/40 mb-4">{testimonial.role}</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "fill-secondary text-secondary" : "text-white/20"}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex space-x-4 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                active === index ? "w-10 bg-primary" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
