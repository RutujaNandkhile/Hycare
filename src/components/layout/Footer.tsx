import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Factory,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07111f] text-gray-300">

      {/* ================= TOP FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Brand + Contact */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 pb-6 border-b border-white/10">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Factory size={23} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                HyCare Industries
              </h2>
              <p className="text-xs text-gray-400">
                Precision Engineering & Manufacturing
              </p>
            </div>
          </div>

          {/* Contact Mini Cards */}
          <div className="flex flex-wrap gap-3">

            <a
              href="tel:7620335231"
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-white/5 border border-white/10
                         hover:border-orange-500/50 transition"
            >
              <Phone size={16} className="text-orange-400" />
              <span className="text-sm">7620335231</span>
            </a>

            <a
              href="mailto:hycareengineering23@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-white/5 border border-white/10
                         hover:border-orange-500/50 transition"
            >
              <Mail size={16} className="text-orange-400" />
              <span className="text-sm">Email Us</span>
            </a>

            
  <a href={`https://wa.me/917620335231?text=${encodeURIComponent(
    "Hi, I would like to enquire about your manufacturing services. Please share more details."
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-4 py-2 rounded-lg
             bg-green-500/10 border border-green-500/20
             hover:bg-green-500 hover:text-white transition"
>
  <MessageCircle size={16} />
  <span className="text-sm">WhatsApp</span>
</a>

          </div>
        </div>


        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">

          {/* About */}
          <div>
            <p className="text-sm leading-6 text-gray-400 max-w-lg">
              HyCare Industries delivers reliable industrial solutions in
              CNC & VMC machining, fabrication, spot welding, spring
              manufacturing and industrial maintenance.
            </p>

            <Link
              href="/contacts"
              className="inline-flex items-center gap-1 mt-4
                         text-sm font-semibold text-orange-400
                         hover:text-orange-300 transition"
            >
              Start Your Project
              <ArrowUpRight size={15} />
            </Link>
          </div>


          {/* Services */}
          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[3px] text-orange-400 mb-3">
              Our Expertise
            </p>

            <div className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 text-sm">
              <span>CNC & VMC Machining</span>
              <span>Spot Welding</span>
              <span>Spring Manufacturing</span>
              <span>Fabrication</span>
              <span>Industrial Maintenance</span>
            </div>
          </div>

        </div>


        {/* ================= SMALL FULL WIDTH MAP ================= */}
        <div className="relative overflow-hidden rounded-xl border border-white/10">

          {/* Map Label */}
          <div className="absolute top-3 left-3 z-10
                          bg-[#07111f]/90 backdrop-blur-md
                          px-3 py-2 rounded-lg
                          border border-white/10">

            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-orange-400" />

              <div>
                <p className="text-xs font-semibold text-white">
                  Find Us
                </p>
                <p className="text-[10px] text-gray-400">
                  Pimpri-Chinchwad, Pune
                </p>
              </div>
            </div>

          </div>

          <iframe
            src="https://www.google.com/maps?q=Pimpri-Chinchwad,Pune,Maharashtra&output=embed"
            width="100%"
            height="150"
            style={{
              border: 0,
              display: "block",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HyCare Industries Location"
          />

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center
                        gap-3 pt-5 mt-5 border-t border-white/10">

          <p className="text-xs text-gray-500">
            © 2026 HyCare Industries. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Built with precision engineering.
          </p>

        </div>

      </div>
    </footer>
  );
}