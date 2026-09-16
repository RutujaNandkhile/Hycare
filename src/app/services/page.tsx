import { Settings, Zap, Cog, Wrench, Box, Factory } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Settings className="w-10 h-10 text-orange-500" />,
    title: "CNC and VMC Machining",
    desc: "High precision CNC & VMC machining for all production needs. Tolerances as tight as ±0.005mm.",
  },
  {
    icon: <Zap className="w-10 h-10 text-orange-500" />,
    title: "Spot Welding Electrodes",
    desc: "Strong and durable welding electrodes. No chipping, constant resistance, high density & hardness.",
  },
  {
    icon: <Cog className="w-10 h-10 text-orange-500" />,
    title: "Spring Manufacturing",
    desc: "Custom springs manufactured with strict quality standards for industrial applications.",
  },
  {
    icon: <Wrench className="w-10 h-10 text-orange-500" />,
    title: "Fabrication Services",
    desc: "Complete fabrication from small components to large industrial structures.",
  },
  {
    icon: <Box className="w-10 h-10 text-orange-500" />,
    title: "5-Axis CNC Machining",
    desc: "Complex geometry machining in a single setup for maximum accuracy and efficiency.",
  },
  {
    icon: <Factory className="w-10 h-10 text-orange-500" />,
    title: "Prototype & Tooling",
    desc: "Rapid prototyping, tooling and custom machining solutions tailored to your needs.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <div className="bg-slate-900 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Our Services</h1>
        <p className="text-gray-300 mt-2">Comprehensive manufacturing solutions</p>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 card-hover"
            >
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-600 mb-4">{s.desc}</p>
              <Link href="/application-form" className="text-orange-500 font-semibold text-sm hover:underline">
                Request Quote →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
