"use client";

import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cart.length > 0 ? 20 : 0;
  const total = cartTotal + shipping;

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart List */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-black">Your Cart ({cart.length})</h1>
            <Link href="/shop" className="text-primary hover:underline flex items-center font-bold">
              <ArrowLeft size={18} className="mr-2" /> Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 glassmorphism rounded-[3rem]">
              <ShoppingBag size={64} className="mx-auto text-white/20 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Link href="/shop" className="inline-flex items-center px-8 py-4 bg-primary rounded-full font-bold">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glassmorphism rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 group"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-6 mt-4">
                      <div className="flex items-center glassmorphism rounded-full px-4 py-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 font-bold hover:text-primary">-</button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 font-bold hover:text-primary">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-white/40 text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="glassmorphism rounded-[3rem] p-10 sticky top-32">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex justify-between">
                <span className="text-white/60">Subtotal</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Shipping</span>
                <span className="font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Estimated Tax</span>
                <span className="font-bold">$0.00</span>
              </div>
            </div>
            <div className="flex justify-between mb-10">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
            </div>
            
            <Link 
              href={cart.length > 0 ? "/checkout" : "#"}
              className={`w-full bg-primary hover:bg-primary/80 text-white font-black py-5 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${cart.length === 0 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            >
              <CreditCard size={20} />
              <span>Proceed to Checkout</span>
            </Link>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center space-x-4 grayscale opacity-40">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 w-auto" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-5 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
