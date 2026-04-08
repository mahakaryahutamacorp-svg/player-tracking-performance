"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  Square,
  MapPin,
  Clock,
  Zap,
  Route,
  ChevronLeft,
  Navigation,
} from "lucide-react";
import dynamic from "next/dynamic";
import { haversineDistance } from "@/lib/utils";
import { calculatePace, formatDuration } from "@/lib/calculations/per";

// Dynamic import for Leaflet (no SSR)
const MapComponent = dynamic(() => import("@/components/tracking/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] rounded-2xl flex items-center justify-center" style={{ background: "var(--bg-secondary)" }}>
      <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
        <Navigation size={16} className="animate-pulse" />
        <span className="text-sm">Memuat peta...</span>
      </div>
    </div>
  ),
});

interface Position {
  lat: number;
  lng: number;
  timestamp: number;
}

export default function RunPage() {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [currentPos, setCurrentPos] = useState<Position | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pace = distance > 0 ? calculatePace(distance, duration) : "--:--";

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTracking(false);
    setIsPaused(false);
  }, []);

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser ini.");
      return;
    }

    setIsTracking(true);
    setIsPaused(false);
    setPositions([]);
    setDistance(0);
    setDuration(0);

    // Timer
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);

    // GPS
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos: Position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: Date.now(),
        };
        setCurrentPos(newPos);
        setPositions((prev) => {
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            const d = haversineDistance(last.lat, last.lng, newPos.lat, newPos.lng);
            if (d > 0.005) { // Min 5m to avoid GPS jitter
              setDistance((prevDist) => prevDist + d);
              return [...prev, newPos];
            }
            return prev;
          }
          return [newPos];
        });
      },
      (err) => {
        console.error("GPS Error:", err);
        if (err.code === 1) alert("Akses GPS ditolak. Aktifkan izin lokasi.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  };

  const pauseTracking = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resumeTracking = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Demo run history
  const runHistory = [
    { date: "07 Apr", distance: "5.2 km", duration: "28:45", pace: "5:32/km" },
    { date: "06 Apr", distance: "3.8 km", duration: "21:10", pace: "5:34/km" },
    { date: "05 Apr", distance: "6.1 km", duration: "33:20", pace: "5:28/km" },
    { date: "04 Apr", distance: "4.5 km", duration: "24:50", pace: "5:31/km" },
    { date: "03 Apr", distance: "5.0 km", duration: "27:15", pace: "5:27/km" },
  ];

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <header className="mb-4 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}
          >
            <ChevronLeft size={18} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Run Tracking</h1>
        </div>
        <p className="text-xs ml-11" style={{ color: "var(--text-secondary)" }}>
          GPS live tracking • {new Date().toLocaleDateString("id-ID")}
        </p>
      </header>

      {/* Map */}
      <section className="mb-4 animate-fade-in-up relative" style={{ animationDelay: "100ms" }}>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
          <MapComponent positions={positions} currentPos={currentPos} />
        </div>

        {/* Metrics overlay on map */}
        {isTracking && (
          <div className="absolute top-3 left-3 right-3 z-[1000]">
            <div
              className="rounded-xl p-3 flex items-center justify-between"
              style={{
                background: "rgba(10,10,15,0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--border-gold)",
              }}
            >
              <div className="text-center flex-1">
                <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Pace</p>
                <p className="text-sm font-bold font-mono" style={{ color: "var(--gold)" }}>{pace}</p>
                <p className="text-[8px]" style={{ color: "var(--text-muted)" }}>min/km</p>
              </div>
              <div className="w-px h-8" style={{ background: "var(--border-subtle)" }} />
              <div className="text-center flex-1">
                <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Distance</p>
                <p className="text-sm font-bold font-mono" style={{ color: "var(--gold)" }}>{distance.toFixed(2)}</p>
                <p className="text-[8px]" style={{ color: "var(--text-muted)" }}>km</p>
              </div>
              <div className="w-px h-8" style={{ background: "var(--border-subtle)" }} />
              <div className="text-center flex-1">
                <p className="text-[9px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Duration</p>
                <p className="text-sm font-bold font-mono" style={{ color: "var(--gold)" }}>{formatDuration(duration)}</p>
                <p className="text-[8px]" style={{ color: "var(--text-muted)" }}>time</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Stats Cards (when not tracking) */}
      {!isTracking && (
        <section className="mb-5 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-3 text-center">
              <Route size={16} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
              <p className="stat-value text-lg">32.4</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Total km</p>
            </div>
            <div className="glass-card p-3 text-center">
              <Clock size={16} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
              <p className="stat-value text-lg">5:31</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Avg Pace</p>
            </div>
            <div className="glass-card p-3 text-center">
              <Zap size={16} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
              <p className="stat-value text-lg">8</p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Total Runs</p>
            </div>
          </div>
        </section>
      )}

      {/* Control Buttons */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-center gap-4">
          {!isTracking ? (
            <button
              className="btn-gold flex items-center gap-2 px-8 py-3.5 text-base rounded-full animate-pulse-gold"
              onClick={startTracking}
            >
              <Play size={20} fill="#0A0A0F" />
              Mulai Lari
            </button>
          ) : (
            <>
              <button
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: isPaused ? "var(--gold-muted)" : "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-gold)",
                  color: "var(--gold)",
                }}
                onClick={isPaused ? resumeTracking : pauseTracking}
              >
                {isPaused ? <Play size={22} fill="var(--gold)" /> : <Pause size={22} />}
              </button>
              <button
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,71,87,0.15)",
                  border: "1px solid rgba(255,71,87,0.3)",
                  color: "var(--danger)",
                }}
                onClick={stopTracking}
              >
                <Square size={20} fill="var(--danger)" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Run History */}
      <section className="mb-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--text-secondary)" }}>
          Riwayat Lari
        </h2>
        <div className="space-y-2">
          {runHistory.map((run, i) => (
            <div key={i} className="glass-card p-3 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--gold-muted)", color: "var(--gold)" }}
              >
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {run.distance} • {run.duration}
                </p>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {run.date} • Pace: {run.pace}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
