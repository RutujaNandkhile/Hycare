"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    if (!username.trim() || !password) return setError("Please enter username and password.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (e: any) { setError(e.message || "Login failed"); }
    finally { setLoading(false); }
  };

  return <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border">
      <div className="text-center mb-8"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">HI</div><h1 className="text-2xl font-bold">Login</h1><p className="text-gray-500 text-sm mt-1">Login with username and password</p></div>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium mb-1">Username</label><input value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter username" /></div>
        <div><label className="block text-sm font-medium mb-1">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400" placeholder="Enter password" /></div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={login} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
        <p className="text-center text-sm text-gray-600">New user? <Link href="/register" className="text-orange-600 font-semibold">Create account</Link></p>
      </div>
    </div>
  </div>;
}
