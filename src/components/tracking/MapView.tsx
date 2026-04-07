"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Position {
  lat: number;
  lng: number;
  timestamp: number;
}

interface MapViewProps {
  positions: Position[];
  currentPos: Position | null;
}

export default function MapView({ positions, currentPos }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Default center (Jakarta)
    const defaultCenter: L.LatLngExpression = [-6.2088, 106.8456];

    mapRef.current = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 15,
      zoomControl: false,
      attributionControl: true,
    });

    // CartoDB Dark Matter tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(mapRef.current);

    // Add zoom control to bottom right
    L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);

    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos: L.LatLngExpression = [pos.coords.latitude, pos.coords.longitude];
          mapRef.current?.setView(userPos, 16);
          
          // Add current location marker
          L.circleMarker(userPos, {
            radius: 8,
            fillColor: "#D4AF37",
            fillOpacity: 0.8,
            color: "#D4AF37",
            weight: 2,
            opacity: 0.4,
          }).addTo(mapRef.current!);
        },
        () => {
          // Ignore error, use default center
        }
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update polyline when positions change
  useEffect(() => {
    if (!mapRef.current) return;

    const latLngs: L.LatLngExpression[] = positions.map((p) => [p.lat, p.lng]);

    if (polylineRef.current) {
      polylineRef.current.setLatLngs(latLngs);
    } else if (latLngs.length > 0) {
      polylineRef.current = L.polyline(latLngs, {
        color: "#D4AF37",
        weight: 4,
        opacity: 0.9,
        smoothFactor: 1,
        className: "gold-route-glow",
      }).addTo(mapRef.current);
    }
  }, [positions]);

  // Update current position marker
  useEffect(() => {
    if (!mapRef.current || !currentPos) return;

    const latLng: L.LatLngExpression = [currentPos.lat, currentPos.lng];

    if (markerRef.current) {
      markerRef.current.setLatLng(latLng);
    } else {
      markerRef.current = L.circleMarker(latLng, {
        radius: 8,
        fillColor: "#D4AF37",
        fillOpacity: 1,
        color: "#E8C94A",
        weight: 3,
        opacity: 0.6,
      }).addTo(mapRef.current);
    }

    mapRef.current.panTo(latLng, { animate: true });
  }, [currentPos]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[350px]"
      style={{ background: "var(--bg-secondary)" }}
    />
  );
}
