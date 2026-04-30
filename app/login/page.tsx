"use client";

import { motion } from "framer-motion";
import { User, Lock, Mail, ArrowRight, Github, Chrome } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"BUYER" | "SELLER">("BUYER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!email.includes("@")) {
  setError("Enter a valid email");
  setLoading(false);
  return;
}

if (password.length < 6) {
  setError("Password must be at least 6 characters");
  setLoading(false);
  return;
}
      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        // Refresh session to get role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const role = session?.user?.role;

        if (role === "ADMIN") router.replace("/admin");
        else if (role === "SELLER") router.replace("/seller");
        else router.replace("/");
        
        router.refresh();
      }
    } else {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name, role }),
        });

        let data;
try {
  data = await res.json();
} catch {
  data = {};
}

        if (!res.ok) {
          setError(data.error || data.details || "Something went wrong");
          setLoading(false);
        } else {
          // Auto login after registration
          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        }
      } catch (err) {
        setError("Failed to register");
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[500px] glassmorphism rounded-[3rem] p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2">{isLogin ? "Welcome Back" : "Join the Future"}</h1>
          <p className="text-white/40 mb-10">{isLogin ? "Enter your credentials to access your account." : "Create an account to start your futuristic journey."}</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    className={`flex-grow py-3 rounded-xl border transition-all font-bold ${
                      role === "BUYER" ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-white/40"
                    }`}
                    onClick={() => setRole("BUYER")}
                  >
                    Buyer
                  </button>
                  <button
                    type="button"
                    className={`flex-grow py-3 rounded-xl border transition-all font-bold ${
                      role === "SELLER" ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-white/40"
                    }`}
                    onClick={() => setRole("SELLER")}
                  >
                    Seller
                  </button>
                </div>
              </>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:border-primary outline-none transition-all"
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-primary hover:underline font-bold">Forgot Password?</button>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-white font-black py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <span>{loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm mb-6">Or continue with</p>
            <div className="flex space-x-4">
              <button 
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="flex-grow flex items-center justify-center space-x-2 py-3 glassmorphism rounded-xl hover:bg-white/10 transition-colors"
              >
                <Chrome size={18} />
                <span className="text-sm font-bold">Google</span>
              </button>
              <button 
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="flex-grow flex items-center justify-center space-x-2 py-3 glassmorphism rounded-xl hover:bg-white/10 transition-colors"
              >
                <Github size={18} />
                <span className="text-sm font-bold">Github</span>
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-white/60">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
