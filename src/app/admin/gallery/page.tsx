"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2 } from "lucide-react";

interface Item {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  order: number;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("CNC STRENGTH");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  };

  useEffect(() => { load(); }, []);

  const addPhoto = async () => {
    if (!title.trim()) {
      alert("Please enter title");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600";

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/upload?type=gallery", { method: "POST", body: fd });
        const upData = await up.json();
        if (upData.url) imageUrl = upData.url;
      }

      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, imageUrl, isActive: true, order: items.length }),
      });

      setTitle("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      load();
    } catch (e) {
      alert("Failed to add photo");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Photo Dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">Manage gallery photos across categories</p>

      {/* Add form - matches video */}
      <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter photo title"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="min-w-[180px]">
            <label className="block text-xs text-gray-500 mb-1">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm border rounded-lg px-2 py-1.5"
            />
          </div>
          <button
            onClick={addPhoto}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Photo"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">PHOTO</th>
              <th className="text-left px-4 py-3 font-semibold">TITLE</th>
              <th className="text-left px-4 py-3 font-semibold">CATEGORY</th>
              <th className="text-left px-4 py-3 font-semibold">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-gray-600">{item.category}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => remove(item._id)}
                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded inline-flex items-center gap-1"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="text-center text-gray-500 py-10">No photos added yet</p>
        )}
      </div>
    </div>
  );
}