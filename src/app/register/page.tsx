"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState<"form" | "otp">("form");

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState("");

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Send OTP
  const sendOTP = async () => {
    setError("");

    // Validation
    if (!form.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!form.password) {
      setError("Please enter password.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          type: "register",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      // Development mode
      if (data.otp) {
        setDevOtp(data.otp);
      }

      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter 6 digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email, otp, type: "register" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      // Registration successful
      router.push("/login");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
            HI
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Create your account with OTP verification
          </p>

        </div>

        {/* FORM */}
        {step === "form" ? (
          <div className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Choose a username" />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Confirm password"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* Send OTP */}
            <button
              onClick={sendOTP}
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Create Account"}
            </button>

          </div>
        ) : (

          /* OTP */
          <div className="space-y-4">

            <p className="text-sm text-gray-600 text-center">
              OTP sent to{" "}
              <strong>{form.email}</strong>
            </p>

            {/* DEV OTP */}
            {devOtp && (
              <p className="text-xs bg-yellow-50 text-yellow-800 p-3 rounded text-center">
                DEV OTP: <strong>{devOtp}</strong>
              </p>
            )}

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter 6-digit OTP
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                className="w-full border rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="••••••"
                maxLength={6}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* Verify */}
            <button
              onClick={verifyOTP}
              disabled={loading || otp.length !== 6}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Verify & Register"}
            </button>

            {/* Back */}
            <button
              onClick={() => {
                setStep("form");
                setOtp("");
                setError("");
              }}
              className="w-full text-sm text-gray-500 hover:text-orange-500"
            >
              ← Back
            </button>

          </div>
        )}

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}