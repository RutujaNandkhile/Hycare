import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <div className="bg-slate-900 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
        <p className="text-gray-300 mt-2">Precision. Quality. Reliability.</p>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
              alt="Workshop"
              className="rounded-xl shadow-xl w-full h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="section-title mb-4">HyCare Engineering</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              HyCare Engineering provides a full range of industrial services and solutions in manufacturing and engineering worldwide. We help businesses build better products with precision CNC machining, spot welding electrodes, custom springs and complete fabrication services.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Located in Pimpri-Chinchwad, Pune, our team of highly skilled professionals uses advanced equipment and rigorous quality control to deliver results that meet the most demanding industry standards.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-500">8,500+</p>
                <p className="text-sm text-gray-600">Projects Delivered</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-500">15+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>
            <Link href="/application-form" className="btn-primary">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Quality Control System",
              "Professional Staff",
              "Accurate Testing",
              "Environmental Sensitivity",
            ].map((v) => (
              <div key={v} className="bg-white p-6 rounded-xl shadow-sm text-center card-hover">
                <CheckCircle className="mx-auto text-orange-500 mb-3" size={32} />
                <p className="font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
