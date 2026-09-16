"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Edit2 } from "lucide-react";

interface Item {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  order: number;
}

export default function AdminSliderPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/slider")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const addOrUpdate = async () => {
    if (!title.trim() && !editingId) {
      alert("Please enter slider title");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = "";

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/upload?type=slider", { method: "POST", body: fd });
        const upData = await up.json();
        if (upData.url) imageUrl = upData.url;
      }

      if (editingId) {
        const existing = items.find((i) => i._id === editingId);
        await fetch("/api/admin/slider", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            title: title || existing?.title,
            imageUrl: imageUrl || existing?.imageUrl,
          }),
        });
      } else {
        if (!imageUrl && !file) {
          imageUrl = "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200";
        }
        await fetch("/api/admin/slider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            imageUrl,
            isActive: true,
            order: items.length,
          }),
        });
      }

      resetForm();
      load();
    } catch {
      alert("Failed to save slider");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item: Item) => {
    setEditingId(item._id);
    setTitle(item.title);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this slider?")) return;
    await fetch(`/api/admin/slider?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Slider Manager</h1>

      {/* Add / Edit form */}
      <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Slider title"
            className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[160px]"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm border rounded-lg px-2 py-1.5"
          />
          {file && (
            <span className="text-xs text-gray-500">{file.name}</span>
          )}
          <button
            onClick={addOrUpdate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Saving..." : editingId ? "Update Slider" : "Add Slider"}
          </button>
          {editingId && (
            <button onClick={resetForm} className="border px-4 py-2 rounded-lg text-sm">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item._id}
            className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-4"
          >
            <span className="text-gray-400 font-medium w-6">{idx + 1}</span>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-20 h-14 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
            </div>
            <button
              onClick={() => startEdit(item)}
              className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => remove(item._id)}
              className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center text-gray-500 py-12">No slider items yet. Add your first slide!</p>
      )}
    </div>
  );
}