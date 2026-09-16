"use client";

import { useState } from "react";
import {
  CheckCircle,
  Factory,
  ArrowRight,
  ShieldCheck,
  Settings,
  Send,
} from "lucide-react";

export default function ApplicationFormPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     SUCCESS SCREEN
  ========================================================== */

  if (success) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4">

        <div className="max-w-lg w-full bg-white rounded-2xl
                        border border-gray-200 shadow-xl
                        p-8 md:p-10 text-center">

          <div className="w-20 h-20 mx-auto rounded-full
                          bg-green-50 flex items-center justify-center mb-6">

            <CheckCircle
              size={48}
              className="text-green-500"
            />

          </div>

          <p className="text-sm uppercase tracking-[3px]
                        text-orange-500 font-semibold mb-3">
            Thank You
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Application Submitted
          </h2>

          <p className="text-gray-500 leading-7 mb-7">
            Thank you for contacting HyCare Industries.
            Our team will review your requirements and
            contact you shortly.
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="inline-flex items-center justify-center
                       gap-2 bg-orange-500 hover:bg-orange-600
                       text-white font-semibold
                       px-6 py-3 rounded-lg transition"
          >
            Submit Another Application
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    );
  }

  /* ==========================================================
     MAIN PAGE
  ========================================================== */

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#07111f]">

        {/* Background Decoration */}
        <div className="absolute -top-32 -right-32
                        w-96 h-96 rounded-full
                        bg-orange-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-20
                        w-80 h-80 rounded-full
                        bg-blue-500/10 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-5">

              <span className="w-10 h-[2px] bg-orange-500" />

              <span className="text-orange-400 text-sm
                               font-semibold tracking-[3px]
                               uppercase">
                Project Enquiry
              </span>

            </div>

            <h1 className="text-4xl md:text-6xl
                           font-bold text-white
                           leading-tight">

              Tell Us About Your

              <span className="text-orange-500">
                {" "}Project & Opening.
              </span>

            </h1>

            <p className="text-gray-400 mt-5
                          text-base md:text-lg
                          max-w-2xl leading-7">

              Share your project requirements with our engineering
              team. We'll help you find the right manufacturing
              solution for your application.

            </p>

          </div>

        </div>

      </section>


      {/* ======================================================
          APPLICATION SECTION
      ====================================================== */}

      <section className="py-12 md:py-16">

        <div className="max-w-6xl mx-auto px-4">

          <div className="grid lg:grid-cols-[0.75fr_1.25fr]
                          bg-white rounded-2xl
                          border border-gray-200
                          shadow-xl overflow-hidden">


            {/* ==================================================
                LEFT INFORMATION PANEL
            ================================================== */}

            <div className="relative bg-[#0b1727]
                            text-white p-7 md:p-9
                            overflow-hidden">

              {/* Decorative Circle */}
              <div className="absolute -right-24 -top-24
                              w-56 h-56 rounded-full
                              bg-orange-500/10" />

              <div className="absolute -left-20 -bottom-20
                              w-52 h-52 rounded-full
                              bg-orange-500/5" />


              <div className="relative">

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl
                                bg-orange-500
                                flex items-center justify-center
                                mb-6">

                  <Factory size={24} />

                </div>


                <p className="text-orange-400 text-xs
                              font-semibold tracking-[3px]
                              uppercase mb-3">
                  HyCare Industries
                </p>


                <h2 className="text-2xl md:text-3xl
                               font-bold leading-tight">
                  Let's turn your
                  <span className="text-orange-500">
                    {" "}idea into reality.
                  </span>
                </h2>


                <p className="text-gray-400 text-sm
                              leading-6 mt-4">
                  Tell us what you need and our team will
                  work with you to understand your project
                  requirements.
                </p>


                {/* Features */}

                <div className="mt-8 space-y-5">

                  <div className="flex gap-3">

                    <div className="w-9 h-9 rounded-lg
                                    bg-white/5
                                    flex items-center justify-center
                                    shrink-0">

                      <Settings
                        size={18}
                        className="text-orange-400"
                      />

                    </div>

                    <div>
                      <p className="font-medium text-sm">
                        Precision Manufacturing
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        CNC, VMC & 5-Axis machining solutions
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <div className="w-9 h-9 rounded-lg
                                    bg-white/5
                                    flex items-center justify-center
                                    shrink-0">

                      <ShieldCheck
                        size={18}
                        className="text-orange-400"
                      />

                    </div>

                    <div>
                      <p className="font-medium text-sm">
                        Quality Focused
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Reliable quality for every project
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <div className="w-9 h-9 rounded-lg
                                    bg-white/5
                                    flex items-center justify-center
                                    shrink-0">

                      <CheckCircle
                        size={18}
                        className="text-orange-400"
                      />

                    </div>

                    <div>
                      <p className="font-medium text-sm">
                        End-to-End Support
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        From enquiry to final delivery
                      </p>
                    </div>

                  </div>

                </div>


                {/* Bottom Contact */}
                <div className="mt-9 pt-6
                                border-t border-white/10">

                  <p className="text-xs text-gray-500">
                    Need help?
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    7620335231
                  </p>

                </div>

              </div>

            </div>


            {/* ==================================================
                FORM PANEL
            ================================================== */}

            <div className="p-6 md:p-9">

              {/* Form Header */}

              <div className="flex items-start
                              justify-between mb-7">

                <div>

                  <p className="text-orange-500 text-xs
                                font-semibold tracking-[2px]
                                uppercase mb-2">
                    Application Form
                  </p>

                  <h2 className="text-2xl font-bold
                                 text-slate-900">
                    Project Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Please provide your project details below.
                  </p>

                </div>


                <div className="hidden sm:flex
                                w-11 h-11 rounded-full
                                bg-orange-50
                                items-center justify-center">

                  <Send
                    size={19}
                    className="text-orange-500"
                  />

                </div>

              </div>


              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name + Email */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm
                                      font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full border border-gray-200
                                 rounded-lg px-4 py-3
                                 bg-gray-50
                                 focus:bg-white
                                 focus:border-orange-500
                                 focus:ring-2
                                 focus:ring-orange-100
                                 outline-none transition"
                    />

                  </div>


                  <div>

                    <label className="block text-sm
                                      font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>

                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="w-full border border-gray-200
                                 rounded-lg px-4 py-3
                                 bg-gray-50
                                 focus:bg-white
                                 focus:border-orange-500
                                 focus:ring-2
                                 focus:ring-orange-100
                                 outline-none transition"
                    />

                  </div>

                </div>


                {/* Phone + Company */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-sm
                                      font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200
                                 rounded-lg px-4 py-3
                                 bg-gray-50
                                 focus:bg-white
                                 focus:border-orange-500
                                 focus:ring-2
                                 focus:ring-orange-100
                                 outline-none transition"
                    />

                  </div>


                  <div>

                    <label className="block text-sm
                                      font-medium text-gray-700 mb-2">
                      Company
                    </label>

                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full border border-gray-200
                                 rounded-lg px-4 py-3
                                 bg-gray-50
                                 focus:bg-white
                                 focus:border-orange-500
                                 focus:ring-2
                                 focus:ring-orange-100
                                 outline-none transition"
                    />

                  </div>

                </div>


                {/* Service */}

                <div>

                  <label className="block text-sm
                                    font-medium text-gray-700 mb-2">
                    Service Required *
                  </label>

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200
                               rounded-lg px-4 py-3
                               bg-gray-50
                               focus:bg-white
                               focus:border-orange-500
                               focus:ring-2
                               focus:ring-orange-100
                               outline-none transition"
                  >

                    <option value="">
                      Select a service
                    </option>

                    <option value="CNC and VMC Machining">
                      CNC and VMC Machining
                    </option>

                    <option value="Spot Welding">
                      Spot Welding
                    </option>

                    <option value="Spring Manufacturing">
                      Spring Manufacturing
                    </option>

                    <option value="Fabrication Services">
                      Fabrication Services
                    </option>

                    <option value="5-Axis CNC Machining">
                      5-Axis CNC Machining
                    </option>

                    <option value="Prototype & Tooling">
                      Prototype & Tooling
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                {/* Message */}

                <div>

                  <label className="block text-sm
                                    font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your requirements, quantities, materials, deadlines..."
                    className="w-full border border-gray-200
                               rounded-lg px-4 py-3
                               bg-gray-50
                               focus:bg-white
                               focus:border-orange-500
                               focus:ring-2
                               focus:ring-orange-100
                               outline-none transition
                               resize-none"
                  />

                </div>


                {/* ERROR */}

                {error && (
                  <div className="rounded-lg bg-red-50
                                  border border-red-200
                                  px-4 py-3">

                    <p className="text-red-600 text-sm">
                      {error}
                    </p>

                  </div>
                )}


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center
                             justify-center gap-2
                             bg-orange-500
                             hover:bg-orange-600
                             disabled:opacity-60
                             disabled:cursor-not-allowed
                             text-white font-semibold
                             py-3.5 rounded-lg
                             transition
                             shadow-lg
                             shadow-orange-500/20"
                >

                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={18} />
                    </>
                  )}

                </button>


                <p className="text-center text-xs text-gray-400">
                  Your information will be used only to respond
                  to your project enquiry.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}