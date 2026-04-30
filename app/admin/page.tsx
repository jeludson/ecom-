"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, ShoppingBag, Users, BarChart3, Settings, Package, Plus, Search, Bell, ShieldCheck, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Products", icon: Package },
  { name: "Orders", icon: ShoppingBag },
  { name: "Users & Sellers", icon: Users },
  { name: "Transactions", icon: CreditCard },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

interface UserData {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  password?: string; // Included as requested, but usually not recommended to display
  products?: { id: string }[];
}

interface TransactionData {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
  order: {
    status: string;
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [users, setUsers] = useState<UserData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated" || (session?.user as any)?.role !== "ADMIN") {
      router.push("/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, transRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/transactions"),
        ]);
        const usersData = await usersRes.json();
        const transData = await transRes.json();
        setUsers(usersData);
        setTransactions(transData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && (session?.user as any)?.role === "ADMIN") {
      fetchData();
    }
  }, [status, session]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-white/40">Loading Secure Admin Panel...</p>
      </div>
    );
  }

  const sellers = users.filter((u) => u.role === "SELLER");
  const stats = [
    { name: "Total Users", value: users.length, delta: "+5.4%", icon: Users },
    { name: "Total Sellers", value: sellers.length, delta: "+2.1%", icon: ShieldCheck },
    { name: "Total Revenue", value: `$${transactions.reduce((acc, t) => acc + t.amount, 0).toLocaleString()}`, delta: "+12.5%", icon: BarChart3 },
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
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary outline-none"
              />
            </div>
            <button className="p-3 glassmorphism rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
            </button>
          </div>
        </div>

        {/* Stats */}
        {activeTab === "Dashboard" && (
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
        )}

        {/* Tables */}
        <div className="glassmorphism rounded-[3rem] p-10">
          <h2 className="text-2xl font-bold mb-8">
            {activeTab === "Users & Sellers" ? "User Management" : 
             activeTab === "Transactions" ? "Financial Transactions" : "Recent Activity"}
          </h2>
          <div className="overflow-x-auto">
            {activeTab === "Users & Sellers" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-sm">
                    <th className="pb-6 pl-4 font-medium uppercase tracking-widest">Name</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Email</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Role</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Password (Hash)</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Joined</th>
                    <th className="pb-6 pr-4 text-right font-medium uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-white/10 group hover:bg-white/5 transition-colors">
                      <td className="py-6 pl-4 font-bold">{user.name || "N/A"}</td>
                      <td className="py-6 font-medium">{user.email}</td>
                      <td className="py-6">
                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                          user.role === "ADMIN" ? "bg-red-500/10 text-red-500" :
                          user.role === "SELLER" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-500"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-6 font-mono text-[10px] text-white/20 max-w-[100px] truncate">{user.password}</td>
                      <td className="py-6 font-medium text-white/40">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="py-6 pr-4 text-right font-bold text-white/40 hover:text-white cursor-pointer">Edit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === "Transactions" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-sm">
                    <th className="pb-6 pl-4 font-medium uppercase tracking-widest">ID</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">User</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Amount</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Method</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Status</th>
                    <th className="pb-6 font-medium uppercase tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-white/10 group hover:bg-white/5 transition-colors">
                      <td className="py-6 pl-4 font-bold text-primary">#{tx.id.slice(-6).toUpperCase()}</td>
                      <td className="py-6">
                        <div className="font-bold">{tx.user.name}</div>
                        <div className="text-[10px] text-white/40">{tx.user.email}</div>
                      </td>
                      <td className="py-6 font-black text-secondary">${tx.amount}</td>
                      <td className="py-6 font-medium uppercase text-xs">{tx.paymentMethod}</td>
                      <td className="py-6">
                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                          tx.status === "SUCCESS" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-6 font-medium text-white/40">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-20 text-white/40">Select a tab to view details</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
