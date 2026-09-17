"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Edit2, Layers } from "lucide-react";

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

  useEffect(() => {
    load();
  }, []);

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
        const up = await fetch("/api/upload?type=slider", {
          method: "POST",
          body: fd,
        });
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
          imageUrl =
            "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200";
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
    <div className="w-full max-w-full overflow-x-hidden px-3 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Slider Manager
      </h1>

      {/* Add / Edit form */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3 lg:items-center">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Slider title"
            className="border rounded-lg px-3 py-2 text-sm w-full lg:flex-1 lg:min-w-[160px]"
          />
          <div className="flex items-center gap-2 min-w-0">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-xs sm:text-sm border rounded-lg px-2 py-1.5 w-full min-w-0 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-100"
            />
          </div>
          {file && (
            <span className="text-xs text-gray-500 truncate sm:col-span-2 lg:col-span-1">
              {file.name}
            </span>
          )}
          <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
            <button
              onClick={addOrUpdate}
              disabled={loading}
              className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 sm:py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Slider"
                : "Add Slider"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="border px-4 py-2.5 sm:py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item._id}
            className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4"
          >
            <span className="text-gray-400 font-medium w-5 sm:w-6 shrink-0 text-sm sm:text-base">
              {idx + 1}
            </span>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-16 h-11 sm:w-20 sm:h-14 object-cover rounded-lg shrink-0"
            />
            <div className="flex-1 min-w-0 basis-full sm:basis-0 order-3 sm:order-none">
              <p className="font-medium text-sm sm:text-base truncate">
                {item.title}
              </p>
            </div>
            <div className="flex gap-2 shrink-0 ml-auto sm:ml-0">
              <button
                onClick={() => startEdit(item)}
                className="text-xs bg-yellow-100 text-yellow-800 px-2.5 sm:px-3 py-1.5 rounded inline-flex items-center gap-1"
              >
                <Edit2 size={12} className="sm:hidden" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                onClick={() => remove(item._id)}
                className="text-xs bg-red-100 text-red-700 px-2.5 sm:px-3 py-1.5 rounded inline-flex items-center gap-1"
              >
                <Trash2 size={12} className="sm:hidden" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="bg-white rounded-xl border border-dashed p-8 sm:p-12 text-center text-gray-400">
          <Layers size={28} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm text-gray-500">
            No slider items yet. Add your first slide!
          </p>
        </div>
      )}
    </div>
  );
}