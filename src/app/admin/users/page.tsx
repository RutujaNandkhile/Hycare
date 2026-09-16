"use client";
import { useEffect, useState } from "react";
import { PERMISSIONS } from "@/lib/permissions";

interface UserItem {
  _id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  permissions?: string[];
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    username: "", name: "", email: "", phone: "", role: "user", password: "",
    permissions: [] as string[],
  });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/admin/users", { cache: "no-store" }).then(r => r.json()).then(d => setUsers(d.users || []));
  useEffect(() => { load() }, []);

  const resetForm = () => setForm({ username: "", name: "", email: "", phone: "", role: "user", password: "", permissions: [] });

  const openCreate = () => {
    resetForm();
    setCreating(true);
    setEditing(null);
    setMsg("");
  };

  const openEdit = (u: UserItem) => {
    setEditing(u);
    setCreating(false);
    setForm({
      username: u.username || "", name: u.name || "", email: u.email || "",
      phone: u.phone || "", role: u.role, password: "",
      permissions: u.permissions || [],
    });
    setMsg("");
  };

  const close = () => { setEditing(null); setCreating(false); setMsg(""); };

  const togglePerm = (key: string) => {
    setForm(f => ({
      ...f,
      permissions: f.permissions.includes(key)
        ? f.permissions.filter(p => p !== key)
        : [...f.permissions, key],
    }));
  };

  const createUser = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.role) {
      setMsg("Name, email and role are required");
      return;
    }
    setSaving(true);
    setMsg("");
    const r = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        permissions: form.permissions,
      }),
    });
    const d = await r.json();
    setSaving(false);
    if (!r.ok) return setMsg(d.error || "Failed to create user");
    close();
    load();
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    setMsg("");
    const r = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing._id, ...form, password: form.password || undefined }),
    });
    const d = await r.json();
    setSaving(false);
    if (!r.ok) return setMsg(d.error || "Update failed");
    close();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    const r = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    const d = await r.json();
    if (!r.ok) return alert(d.error || "Delete failed");
    load();
  };

  const modalOpen = creating || !!editing;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-gray-500">Admin can add users, and edit username, password, contact, role and screen access.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openCreate} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add User
          </button>
          <button onClick={load} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Refresh</button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
              <h2 className="font-bold text-lg">{creating ? "Create User" : "Edit User"}</h2>
              <button onClick={close} className="text-gray-500 hover:text-gray-800 text-xl leading-none">&times;</button>
            </div>

            <div className="p-6 space-y-4">
              {msg && <p className="text-red-600 text-sm">{msg}</p>}

              <div>
                <label className="block text-sm font-medium mb-1">User Name {creating && <span className="text-red-500">*</span>}</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter User Name" className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">User Email Address {creating && <span className="text-red-500">*</span>}</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Enter User Email Address" className="w-full border rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp No</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Enter 10 digit whatsApp number" className="w-full border rounded-lg px-3 py-2" />
              </div>

              {!creating && (
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Select Role {creating && <span className="text-red-500">*</span>}</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                  <option value="">Please Select</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {!creating && (
                <div>
                  <label className="block text-sm font-medium mb-1">New password (optional)</label>
                  <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
              )}

              {form.role === "user" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Screen Permissions {creating && <span className="text-red-500">*</span>}</label>
                  <div className="flex flex-wrap gap-2">
                    {PERMISSIONS.map(p => (
                      <label
                        key={p.key}
                        className={`px-3 py-1.5 rounded-lg border text-sm cursor-pointer select-none ${
                          form.permissions.includes(p.key) ? "bg-blue-600 text-white border-blue-600" : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <input type="checkbox" className="hidden" checked={form.permissions.includes(p.key)} onChange={() => togglePerm(p.key)} />
                        {p.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {creating && (
                <p className="text-xs text-gray-500 bg-gray-50 border rounded-lg p-3">
                  Username आणि password auto-generate होऊन user च्या email वर पाठवले जातील.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
              <button onClick={close} className="border px-4 py-2 rounded-lg text-sm">Cancel</button>
              <button
                onClick={creating ? createUser : saveEdit}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>{["#", "USERNAME", "NAME", "EMAIL", "ROLE", "ACCESS", "CREATED", "ACTION"].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-semibold">{u.username}</td>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-blue-600">{u.email}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 rounded bg-gray-100">{u.role}</span></td>
                <td className="px-4 py-3">
                  {u.role === "admin" ? (
                    <span className="text-xs text-gray-500">Full access</span>
                  ) : u.permissions?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {u.permissions.map(p => (
                        <span key={p} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                          {PERMISSIONS.find(x => x.key === p)?.label || p}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-red-500">No access</span>
                  )}
                </td>
                <td className="px-4 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => openEdit(u)} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => remove(u._id)} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && <p className="text-center text-gray-500 py-10">No users found</p>}
      </div>
    </div>
  );
}