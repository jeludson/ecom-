"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  Package, 
  Plus, 
  Search, 
  Bell, 
  DollarSign,
  TrendingUp,
  Eye
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "My Products", icon: Package },
  { name: "Orders", icon: ShoppingBag },
  { name: "Customers", icon: Users },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

interface ProductData {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  images: string;
  orderItems: any[];
}

interface CustomerData {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  ordersCount: number;
}

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated" || (session?.user as any)?.role !== "SELLER") {
      if (status === "unauthenticated") router.push("/login");
      else if ((session?.user as any)?.role === "ADMIN") router.push("/admin");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/seller");
        const data = await res.json();
        if (data.products) setProducts(data.products);
        if (data.customers) setCustomers(data.customers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && (session?.user as any)?.role === "SELLER") {
      fetchData();
    }
  }, [status, session]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-white/40">Loading Seller Dashboard...</p>
      </div>
    );
  }

  const totalRevenue = products.reduce((acc, p) => {
    const prodRevenue = p.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return acc + prodRevenue;
  }, 0);

  const stats = [
    { name: "Total Products", value: products.length, delta: "+2", icon: Package },
    { name: "Active Customers", value: customers.length, delta: "+5.4%", icon: Users },
    { name: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, delta: "+12.5%", icon: DollarSign },
  ];

  return (
    <main className="min-h-screen pt-24 bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-r border-white/10 p-6 flex flex-col space-y-2">
        {sidebarLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => setActiveTab(link.name)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
              activeTab === link.name ? "bg-primary text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
            }`}
          >
            <link.icon size={20} />
            <span>{link.name}</span>
          </button>
        ))}
      </aside>

      {/* Content */}
      <section className="flex-grow p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h1 className="text-4xl font-black">{activeTab}</h1>
          <div className="flex items-center space-x-6 w-full md:w-auto">
            <button className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all">
              <Plus size={20} />
              <span>Add Product</span>
            </button>
            <button className="p-3 glassmorphism rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
            </button>
          </div>
        </div>

        {/* Stats */}
        {activeTab === "Dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glassmorphism rounded-3xl p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <stat.icon className="text-primary" size={24} />
                    </div>
                    <span className="text-green-500 font-bold text-sm">{stat.delta}</span>
                  </div>
                  <h3 className="text-white/40 font-medium mb-1">{stat.name}</h3>
                  <p className="text-3xl font-black">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glassmorphism rounded-[3rem] p-10">
                <h2 className="text-2xl font-bold mb-8">Recent Products</h2>
                <div className="space-y-6">
                  {products.slice(0, 4).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden">
                          <img src={JSON.parse(product.images)[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold">{product.name}</h4>
                          <p className="text-xs text-white/40">{product.category}</p>
                        </div>
                      </div>
                      <span className="font-bold">${product.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glassmorphism rounded-[3rem] p-10">
                <h2 className="text-2xl font-bold mb-8">Top Customers</h2>
                <div className="space-y-6">
                  {customers.slice(0, 4).map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                          {customer.name?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold">{customer.name}</h4>
                          <p className="text-xs text-white/40">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${customer.totalSpent.toFixed(2)}</p>
                        <p className="text-[10px] text-white/40">{customer.ordersCount} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Product Management */}
        {activeTab === "My Products" && (
          <div className="glassmorphism rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Product Catalog</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 focus:border-primary outline-none text-sm"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-sm">
                    <th className="pb-6 pl-4 font-medium">Product</th>
                    <th className="pb-6 font-medium">Category</th>
                    <th className="pb-6 font-medium">Price</th>
                    <th className="pb-6 font-medium">Created</th>
                    <th className="pb-6 pr-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/10 group hover:bg-white/5 transition-colors">
                      <td className="py-6 pl-4">
                        <div className="flex items-center space-x-4">
                          <img src={JSON.parse(product.images)[0]} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-6">{product.category}</td>
                      <td className="py-6 font-bold">${product.price}</td>
                      <td className="py-6 text-white/40">{new Date(product.createdAt).toLocaleDateString()}</td>
                      <td className="py-6 pr-4 text-right">
                        <button className="text-white/40 hover:text-primary transition-colors mr-4">Edit</button>
                        <button className="text-white/40 hover:text-red-500 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer Management */}
        {activeTab === "Customers" && (
          <div className="glassmorphism rounded-[3rem] p-10">
            <h2 className="text-2xl font-bold mb-8">Your Customers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-sm">
                    <th className="pb-6 pl-4 font-medium">Customer</th>
                    <th className="pb-6 font-medium">Email</th>
                    <th className="pb-6 font-medium">Total Orders</th>
                    <th className="pb-6 font-medium">Total Spent</th>
                    <th className="pb-6 pr-4 text-right font-medium">Last Order</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-white/10 group hover:bg-white/5 transition-colors">
                      <td className="py-6 pl-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary text-xs">
                            {customer.name?.charAt(0)}
                          </div>
                          <span className="font-bold">{customer.name}</span>
                        </div>
                      </td>
                      <td className="py-6">{customer.email}</td>
                      <td className="py-6">{customer.ordersCount}</td>
                      <td className="py-6 font-bold">${customer.totalSpent.toFixed(2)}</td>
                      <td className="py-6 pr-4 text-right text-white/40">Recently</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
