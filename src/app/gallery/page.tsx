"use client";

import { useEffect, useState } from "react";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => {
        if (d.items?.length) setItems(d.items);
        else {
          // Demo images
          setItems([
            { _id: "1", title: "CNC Parts", imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600", category: "cnc" },
            { _id: "2", title: "Welding Electrodes", imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600", category: "welding" },
            { _id: "3", title: "Springs", imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600", category: "springs" },
            { _id: "4", title: "Fabrication", imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600", category: "fabrication" },
            { _id: "5", title: "Precision Components", imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600", category: "cnc" },
            { _id: "6", title: "Industrial Tools", imageUrl: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600", category: "tools" },
          ]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="bg-slate-900 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Gallery</h1>
        <p className="text-gray-300 mt-2">Our work speaks for itself</p>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-xl shadow-md card-hover bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      {item.description && <p className="text-sm opacity-90">{item.description}</p>}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <span className="text-xs text-orange-500 uppercase">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
