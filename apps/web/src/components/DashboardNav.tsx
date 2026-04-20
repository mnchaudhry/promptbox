"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Library, Tags, BarChart3, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Stuff", href: "/dashboard/prompts", icon: Library },
  { name: "Labels", href: "/dashboard/tags", icon: Tags },
  { name: "Numbers", href: "/dashboard/stats", icon: BarChart3 },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 border-3 border-transparent font-mono text-xs uppercase tracking-widest transition-all",
            pathname === item.href
              ? "bg-primary text-black border-black border-b-4 border-r-4 -translate-y-0.5 -translate-x-0.5"
              : "text-highest hover:text-white hover:border-outline"
          )}
        >
          <item.icon className="w-3.5 h-3.5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
