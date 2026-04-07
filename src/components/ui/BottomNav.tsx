"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  MapPin,
  Apple,
  User,
} from "lucide-react";

const navItems = [
  { href: "/player", label: "Dashboard", icon: LayoutDashboard },
  { href: "/player/shooting", label: "Shooting", icon: Target },
  { href: "/player/run", label: "Run", icon: MapPin },
  { href: "/player/nutrition", label: "Nutrisi", icon: Apple },
  { href: "/player/profile", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav mobile-only">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/player" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
