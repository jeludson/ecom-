"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutClient() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  
  const shippingFee = 20;
  const total = cartTotal + shippingFee;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (cart.length === 0 && step !== 3) {
      router.push("/shop");
    }
  }, [cart, router, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: total,
          paymentMethod: "CREDIT_CARD",
          shippingDetails: {
            address: formData.address,
            city: formData.city,
            country: formData.country,
            zipCode: formData.zipCode,
          }
        }),
      });

      if (response.ok) {
        clearCart();
        setStep(3);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <main className="min-h-screen pt-32 pb-24 container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-5xl font-black mb-4">Order Placed!</h1>
        <p className="text-xl text-white/60 mb-12 max-w-md">
          Thank you for your purchase. Your futuristic gear is being prepared for hyper-speed delivery.
        </p>
        <Link href="/shop" className="bg-primary hover:bg-primary/80 text-white font-black px-12 py-5 rounded-full transition-all">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black">Checkout</h1>
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-primary text-white" : "bg-white/5 text-white/20"}`}>1</div>
          <div className="w-12 h-0.5 bg-white/10" />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-primary text-white" : "bg-white/5 text-white/20"}`}>2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-12">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold flex items-center">
                    <Truck className="mr-3 text-primary" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">First Name</label>
                      <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">Last Name</label>
                      <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest ml-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest ml-2">Address</label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">City</label>
                      <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">Country</label>
                      <input required name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">ZIP Code</label>
                      <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <button type="button" onClick={() => setStep(1)} className="text-white/40 hover:text-white flex items-center mb-4 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Shipping
                  </button>
                  <h2 className="text-2xl font-bold flex items-center">
                    <CreditCard className="mr-3 text-secondary" /> Payment Information
                  </h2>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest ml-2">Card Number</label>
                    <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-secondary transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">Expiry Date</label>
                      <input required name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest ml-2">CVV</label>
                      <input required name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="000" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/80 text-white font-black py-5 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{step === 1 ? "Next Step" : "Place Order"}</span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="glassmorphism rounded-[3rem] p-10 sticky top-32">
            <h2 className="text-2xl font-bold mb-8">Summary</h2>
            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto scrollbar-hide pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] mr-3 font-bold">{item.quantity}</span>
                    <span className="text-white/60 truncate max-w-[120px]">{item.name}</span>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-6 mb-8 pb-8 border-t border-white/10 pt-8">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-white/10 pt-6">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
