"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🏀 CUSTOM AUTH LOGIC (Plain-text Username/Password)
      const { data: user, error } = await supabase
        .from("users")
        .select("id, username, role, full_name")
        .eq("username", email)
        .eq("password_plain", password)
        .single();

      if (error || !user) {
        throw new Error("ID atau Password salah.");
      }

      // Set a simple cookie for Middleware (Expires in 7 days)
      const sessionData = {
        id: user.id,
        role: user.role,
        name: user.full_name,
      };

      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
      document.cookie = `pt_session=${JSON.stringify(sessionData)}; expires=${expires.toUTCString()}; path=/`;

      // Success! Redirect based on role
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/player");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal masuk. Silakan cek ID dan Password Anda.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* ─── Full-screen Background ─── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/logo.png')`,
          backgroundPosition: "center top",
        }}
      />

      {/* ─── Charcoal overlay ─── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.6) 40%, rgba(26,26,26,0.92) 70%, #1A1A1A 100%)",
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-sm px-6 pb-14 animate-fade-in-up">
        {/* Brand name */}
        <div className="mb-10 text-center">
          <h1
            className="text-5xl font-black tracking-tight leading-none"
            style={{
              color: "#D4AF37",
              textShadow:
                "0 0 30px rgba(212,175,55,0.5), 0 2px 8px rgba(0,0,0,0.6)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Pattikawa
          </h1>
        </div>

        {/* ─── Form ─── */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email field */}
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
              required
              style={{
                display: "block",
                width: "100%",
                background: "rgba(42,42,42,0.7)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: focusEmail
                  ? "1px solid #D4AF37"
                  : "1px solid rgba(212,175,55,0.2)",
                boxShadow: focusEmail
                  ? "0 0 0 2px rgba(212,175,55,0.25), 0 0 16px rgba(212,175,55,0.2)"
                  : "none",
                borderRadius: "10px",
                color: "#F0F0F5",
                padding: "14px 16px",
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            />
          </div>

          {/* Password field */}
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
              required
              style={{
                display: "block",
                width: "100%",
                background: "rgba(42,42,42,0.7)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: focusPassword
                  ? "1px solid #D4AF37"
                  : "1px solid rgba(212,175,55,0.2)",
                boxShadow: focusPassword
                  ? "0 0 0 2px rgba(212,175,55,0.25), 0 0 16px rgba(212,175,55,0.2)"
                  : "none",
                borderRadius: "10px",
                color: "#F0F0F5",
                padding: "14px 48px 14px 16px",
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(212,175,55,0.6)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              display: "block",
              width: "100%",
              background: loading
                ? "rgba(212,175,55,0.5)"
                : "linear-gradient(135deg, #D4AF37 0%, #B8960E 100%)",
              color: "#0A0A0A",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.04em",
              border: "none",
              borderRadius: "10px",
              padding: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading
                ? "none"
                : "0 4px 20px rgba(212,175,55,0.35)",
              marginTop: "8px",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 6px 28px rgba(212,175,55,0.55)";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 20px rgba(212,175,55,0.35)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            {loading ? "Memverifikasi..." : "Login"}
          </button>
        </form>

        {/* Tagline */}
        <p
          className="text-center mt-5 text-xs tracking-widest uppercase"
          style={{ color: "rgba(212,175,55,0.45)" }}
        >
          The aura exclusive
        </p>
      </div>
    </div>
  );
}
