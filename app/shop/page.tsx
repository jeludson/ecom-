"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Zap, Eye, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

import { useCart } from "@/components/CartContext";
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

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-white/40">Loading Futuristic Shop...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

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

  useEffect(() => {
    let filtered = products;
    
    if (categoryParam) {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, products, categoryParam]);

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    router.push("/cart");
  };

  if (loading) return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-white space-y-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="font-bold text-white/40">Loading Futuristic Shop...</p>
    </div>
  );

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black mb-4">The Shop</h1>
          <p className="text-white/40">Explore our curated collection of next-gen technology.</p>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
            />
          </div>
          <button className="p-4 glassmorphism rounded-2xl hover:bg-white/10 transition-colors">
            <SlidersHorizontal size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => {
          const productImages = JSON.parse(product.images);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] glassmorphism rounded-[2.5rem] overflow-hidden mb-6 group">
                <img
                  src={productImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    title="Buy Now"
                  >
                    <Zap size={20} />
                  </button>
                  <Link 
                    href={`/product/${product.id}`}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    title="View Details"
                  >
                    <Eye size={20} />
                  </Link>
                </div>
              </div>

              <div className="flex justify-between items-start px-2">
                <div>
                  <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1 block">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/40">by {product.seller.name}</p>
                </div>
                <span className="text-lg font-black">${product.price}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-white/40 text-xl italic">No products found matching your search.</p>
        </div>
      )}
    </main>
  );
}
