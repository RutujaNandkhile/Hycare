"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Images,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface User {
  username: string;
  name: string;
  role: "user" | "admin";
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
  { href: "/admin/slider", label: "Slider", icon: Layers, adminOnly: false },
  { href: "/admin/gallery", label: "Gallery", icon: Images, adminOnly: false },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/admin/applications", label: "Applications", icon: FileText, adminOnly: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setUser(d.user || null))
      .catch(() => setUser(null));
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isAdmin = user?.role === "admin";

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/");
  };

  const links = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* LOGO / TITLE */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <span className="text-white font-bold text-lg tracking-wide">
          Admin Panel
        </span>
        <button
          onClick={() => setOpen(false)}
          className="md:hidden text-white/70 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>

      {/* USER INFO */}
      {user && (
        <div className="px-5 py-4 border-b border-white/10">
          <p className="text-white text-sm font-semibold truncate">
            {user.name || user.username}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/80 uppercase">
            {user.role}
          </span>
        </div>
      )}

      {/* NAV LINKS */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-[#0b1727] px-4 py-3 shadow-sm">
        <span className="text-white font-bold text-base">Admin Panel</span>
        <button
          onClick={() => setOpen(true)}
          className="text-white/80 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#0b1727] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {SidebarContent}
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:bottom-0 md:w-64 bg-[#0b1727] z-30">
        {SidebarContent}
      </aside>
    </>
  );
}