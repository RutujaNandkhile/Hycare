"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Images, Sliders, FileText, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/gallery", label: "Photos", icon: Images },
  { href: "/admin/slider", label: "Home Slider", icon: Sliders },
  { href: "/admin/applications", label: "Application List", icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.user?.role === "admin"))
      .catch(() => setIsAdmin(false));
  }, []);

  const links = isAdmin ? adminLinks : [adminLinks[0]];

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-40">
      <div className="p-5 border-b border-slate-700">
        <h2 className="text-lg font-bold">HYCARE INDUSTRIES</h2>
        <p className="text-xs text-gray-400 mt-0.5">Dashboard</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href || pathname.startsWith(l.href + "/");
          return <Link key={l.href} href={l.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${active ? "bg-slate-700 text-white font-medium" : "text-gray-300 hover:bg-slate-800"}`}><Icon size={18} />{l.label}</Link>;
        })}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button onClick={logout} className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-lg text-sm font-medium transition"><LogOut size={16} /> Logout</button>
      </div>
    </aside>
  );
}
