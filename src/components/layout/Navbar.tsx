
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/application-form", label: "Application Form" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contacts", label: "Contacts" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-slate-800 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          <div className="flex gap-6">
            {/* Clickable Phone Numbers */}
            <div className="flex items-center gap-1">
              <span>📞</span>

              <a
                href="tel:7620335231"
                className="hover:text-orange-400 transition-colors"
              >
                7620335231
              </a>

              <span>,</span>

              <a
                href="tel:8605659955"
                className="hover:text-orange-400 transition-colors"
              >
                8605659955
              </a>
            </div>

            {/* Clickable Email */}
            <a
              href="mailto:hycareengineering23@gmail.com"
              className="hover:text-orange-400 transition-colors"
            >
              ✉ hycareengineering23@gmail.com
            </a>
          </div>

          <div>Mon-Sat: 8am – 7pm</div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
  <img
    src="../images/img/logo.jpeg"
    alt="HyCare Industries Logo"
    className="w-12 h-12 object-contain rounded-full"
  />


              <span className="text-xl md:text-2xl font-bold text-orange-500 tracking-tight">
                HYCARE INDUSTRIES
              </span>
              </Link>
           

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.href
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">

              {/* Search */}
              <button className="p-2 text-gray-600 hover:text-orange-500 hidden md:block">
                <Search size={20} />
              </button>

              {/* Login */}
              <Link
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors"
              >
                Login →
              </Link>

              {/* Mobile menu */}
              <button
                className="lg:hidden p-2 text-gray-700"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

