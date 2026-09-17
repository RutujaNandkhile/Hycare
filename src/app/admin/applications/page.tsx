"use client";

import { useEffect, useState } from "react";

interface App {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  contacted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [selected, setSelected] = useState<App | null>(null);

  const load = () => {
    fetch("/api/admin/applications")
      .then((r) => r.json())
      .then((d) => setApps(d.applications || []));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
    if (selected?._id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden px-3 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Application List
      </h1>

      {/* Mobile: card list */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {apps.map((a, i) => (
          <div
            key={a._id}
            className="bg-white rounded-xl shadow-sm border p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{a.name}</p>
                <p className="text-xs text-blue-600 truncate">{a.email}</p>
                <p className="text-xs text-gray-500 mt-0.5">{a.phone}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-medium shrink-0 ${
                  statusColors[a.status] || ""
                }`}
              >
                {a.status}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Service: <span className="text-gray-700">{a.service}</span>
            </p>

            <button
              onClick={() => setSelected(a)}
              className="mt-3 w-full text-center text-orange-600 border border-orange-200 rounded-lg py-2 text-sm font-medium hover:bg-orange-50 transition"
            >
              View
            </button>
          </div>
        ))}
        {apps.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No Applications Found
          </p>
        )}
      </div>

      {/* Tablet/Desktop: table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">NAME</th>
                <th className="text-left px-4 py-3 font-semibold">EMAIL</th>
                <th className="text-left px-4 py-3 font-semibold">PHONE</th>
                <th className="text-left px-4 py-3 font-semibold">
                  SERVICE
                </th>
                <th className="text-left px-4 py-3 font-semibold">
                  STATUS
                </th>
                <th className="text-left px-4 py-3 font-semibold">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a, i) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {a.name}
                  </td>
                  <td className="px-4 py-3 text-blue-600">{a.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{a.phone}</td>
                  <td className="px-4 py-3">{a.service}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        statusColors[a.status] || ""
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(a)}
                      className="text-orange-600 hover:underline text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {apps.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No Applications Found
          </p>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 sm:p-4">
          <div className="bg-white sm:rounded-xl p-5 sm:p-6 w-full h-full sm:h-auto sm:max-w-lg sm:max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-lg mb-4">Application Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selected.name}
              </p>
              <p className="break-words">
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Phone:</strong> {selected.phone}
              </p>
              {selected.company && (
                <p>
                  <strong>Company:</strong> {selected.company}
                </p>
              )}
              <p>
                <strong>Service:</strong> {selected.service}
              </p>
              <p>
                <strong>Message:</strong>
              </p>
              <p className="bg-gray-50 p-3 rounded break-words">
                {selected.message}
              </p>
              <p className="mt-3">
                <strong>Status:</strong>
              </p>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected._id, e.target.value)}
                className="border rounded px-3 py-2 w-full sm:w-auto"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full border rounded-lg py-2.5 sm:py-2 text-sm font-medium hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}