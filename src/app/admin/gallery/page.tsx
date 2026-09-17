"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Edit2, Image as ImageIcon, X } from "lucide-react";

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

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const editFileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []));
  };

  useEffect(() => {
    load();
  }, []);

  const addPhoto = async () => {
    if (!title.trim()) {
      alert("Please enter title");
      return;
    }
    setLoading(true);
    try {
      let imageUrl =
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600";

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/upload?type=gallery", {
          method: "POST",
          body: fd,
        });
        const upData = await up.json();
        if (upData.url) imageUrl = upData.url;
      }

      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          imageUrl,
          isActive: true,
          order: items.length,
        }),
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

  /* ================= EDIT LOGIC ================= */

  const startEdit = (item: Item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditFile(null);
    if (editFileRef.current) editFileRef.current.value = "";
  };

  const closeEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditCategory("");
    setEditFile(null);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    if (!editTitle.trim()) {
      alert("Please enter title");
      return;
    }
    setEditSaving(true);
    try {
      const existing = items.find((i) => i._id === editingId);
      let imageUrl = existing?.imageUrl || "";

      if (editFile) {
        const fd = new FormData();
        fd.append("file", editFile);
        const up = await fetch("/api/upload?type=gallery", {
          method: "POST",
          body: fd,
        });
        const upData = await up.json();
        if (upData.url) imageUrl = upData.url;
      }

      await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title: editTitle,
          category: editCategory,
          imageUrl,
        }),
      });

      closeEdit();
      load();
    } catch (e) {
      alert("Failed to update photo");
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden px-3 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-1">Photo Dashboard</h1>
      <p className="text-gray-500 text-xs sm:text-sm mb-5 sm:mb-6">
        Manage gallery photos across categories
      </p>

      {/* Add form */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3 lg:items-end">
          <div className="lg:flex-1 lg:min-w-[160px]">
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter photo title"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="lg:flex-1 lg:min-w-[140px]">
            <label className="block text-xs text-gray-500 mb-1">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-1 lg:min-w-[180px]">
            <label className="block text-xs text-gray-500 mb-1">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs sm:text-sm border rounded-lg px-2 py-1.5 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-100"
            />
          </div>
          <button
            onClick={addPhoto}
            disabled={loading}
            className="w-full sm:col-span-2 lg:col-span-1 lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 sm:py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition"
          >
            {loading ? "Adding..." : "Add Photo"}
          </button>
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm border p-3 flex items-center gap-3"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-16 h-12 object-cover rounded shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <p className="text-xs text-gray-500 truncate">
                {item.category}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => startEdit(item)}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1.5 rounded inline-flex items-center gap-1"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => remove(item._id)}
                className="text-xs bg-red-100 text-red-700 px-2 py-1.5 rounded inline-flex items-center gap-1"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed p-8 text-center text-gray-400">
            <ImageIcon size={28} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No photos added yet</p>
          </div>
        )}
      </div>

      {/* Tablet/Desktop: table */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                  PHOTO
                </th>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                  TITLE
                </th>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                  CATEGORY
                </th>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded inline-flex items-center gap-1 hover:bg-yellow-200 transition"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => remove(item._id)}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded inline-flex items-center gap-1 hover:bg-red-200 transition"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No photos added yet
            </p>
          )}
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white sm:rounded-xl shadow-lg w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b bg-gray-50 sticky top-0 z-10">
              <h2 className="font-bold text-base sm:text-lg">Edit Photo</h2>
              <button
                onClick={closeEdit}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Image
                </label>
                <img
                  src={items.find((i) => i._id === editingId)?.imageUrl}
                  alt="current"
                  className="w-full h-40 object-cover rounded-lg border mb-2"
                />
                <label className="block text-xs text-gray-500 mb-1">
                  Replace image (optional)
                </label>
                <input
                  ref={editFileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditFile(e.target.files?.[0] || null)
                  }
                  className="w-full text-xs sm:text-sm border rounded-lg px-2 py-1.5 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-4 sm:px-6 py-4 border-t bg-gray-50 sticky bottom-0">
              <button
                onClick={closeEdit}
                className="border px-4 py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={editSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-60"
              >
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}