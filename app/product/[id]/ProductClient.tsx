"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2, Star, ShieldCheck, Truck, RotateCcw, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string; // JSON
  category: string;
  seller: {
    name: string;
  };
}

export default function ProductClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen pt-32 flex items-center justify-center text-white">Loading product details...</div>;
  if (!product) return <div className="min-h-screen pt-32 flex items-center justify-center text-white">Product not found</div>;

  const productImages = JSON.parse(product.images);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Images */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-square glassmorphism rounded-[3rem] overflow-hidden relative group"
          >
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute top-6 right-6 flex flex-col space-y-3">
              <button className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>

          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {productImages.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === index ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 text-primary font-bold text-sm tracking-widest uppercase mb-4">
              <span>Verified Seller: {product.seller.name}</span>
              <span>•</span>
              <div className="flex items-center">
                <Star size={14} className="fill-secondary text-secondary mr-1" />
                <span className="text-white">4.9</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-secondary mb-8">${product.price}</p>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
              <div className="flex items-center glassmorphism rounded-full px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 text-2xl font-bold hover:text-primary">-</button>
                <span className="w-12 text-center text-xl font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 text-2xl font-bold hover:text-primary">+</button>
              </div>
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart(product);
                }}
                className="flex-grow bg-primary/10 border border-primary text-primary font-black py-4 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>

            <button 
              onClick={() => {
                addToCart(product);
                router.push("/cart");
              }}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-black py-5 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] mb-12"
            >
              <Zap size={20} />
              <span>Buy Now</span>
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
              <div className="flex items-center space-x-3 text-sm text-white/60">
                <ShieldCheck className="text-primary" size={24} />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/60">
                <Truck className="text-primary" size={24} />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/60">
                <RotateCcw className="text-primary" size={24} />
                <span>30-Day Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
