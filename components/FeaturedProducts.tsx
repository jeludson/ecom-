"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string; // JSON string
  category: string;
  seller: {
    name: string;
  };
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    router.push("/cart");
  };

  if (loading) return <div className="py-24 text-center text-white/40">Loading trending products...</div>;

  return (
    <section className="py-24 container mx-auto px-6 overflow-hidden">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending Products</h2>
          <p className="text-white/60">Discover our most popular items from verified sellers.</p>
        </div>
        <Link href="/shop" className="text-primary hover:underline font-medium">
          View All Products
        </Link>
      </div>

      <div className="flex overflow-x-auto space-x-8 pb-10 scrollbar-hide">
        {products.map((product, index) => {
          const productImages = JSON.parse(product.images);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] group"
            >
              <div className="relative aspect-[4/5] glassmorphism rounded-3xl overflow-hidden mb-6 group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={productImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover:bg-primary transition-colors tooltip"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    title="Buy Now"
                  >
                    <Zap size={20} />
                  </button>
                  <Link href={`/product/${product.id}`} className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Eye size={20} />
                  </Link>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-primary font-bold tracking-widest uppercase mb-1 block">
                    {product.category} • {product.seller.name}
                  </span>
                  <h3 className="text-xl font-bold hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </div>
                <span className="text-xl font-black">${product.price}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
