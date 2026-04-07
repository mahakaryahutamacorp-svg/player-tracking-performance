"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to player dashboard for demo
    const timer = setTimeout(() => {
      router.push("/player");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
        }}
      />

      {/* Logo & Title */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in-up">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center gold-glow"
          style={{
            background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)",
          }}
        >
          <Activity size={40} color="#0A0A0F" strokeWidth={2.5} />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Player Tracking
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            National Basketball Team Performance System
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center gap-2 mt-8">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)", animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--gold)", animationDelay: "0.4s" }} />
        </div>

        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Loading dashboard...
        </p>
      </div>
    </main>
  );
}
