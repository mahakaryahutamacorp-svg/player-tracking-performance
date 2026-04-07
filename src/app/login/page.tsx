"use client";

import { useState } from "react";
import { Activity, User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 🏀 CUSTOM AUTH LOGIC (Plain-text Username/Password)
      const { data: user, error } = await supabase
        .from('users')
        .select('id, username, role, full_name')
        .eq('username', username)
        .eq('password_plain', password)
        .single();

      if (error || !user) {
        throw new Error("ID atau Password salah.");
      }

      // Set a simple cookie for Middleware (Expires in 7 days)
      const sessionData = {
        id: user.id,
        role: user.role,
        name: user.full_name
      };
      
      const expires = new Date();
      expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
      document.cookie = `pt_session=${JSON.stringify(sessionData)}; expires=${expires.toUTCString()}; path=/`;

      // Success! Redirect based on role
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/player");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Gagal masuk. Silakan cek ID dan Password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />

      <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 gold-glow" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-dark))" }}>
            <Activity size={32} color="#0A0A0F" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Player Tracking</h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>National Basketball Team</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="glass-card gold-border p-6 space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-wider font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>User ID</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input 
                className="input-dark pl-10" 
                type="text" 
                placeholder="coach12" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input 
                className="input-dark pl-10 pr-10" 
                type={showPw ? "text" : "password"} 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 text-base shadow-lg transition-all active:scale-95">
            {loading ? "Mengecek ID..." : "Login"}
          </button>
        </form>

        <p className="text-center text-[10px] mt-4" style={{ color: "var(--text-muted)" }}>
          Demo Coach: <strong>coach12 / 223344</strong>
        </p>
      </div>
    </div>
  );
}
