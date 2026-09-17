import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <AdminSidebar />

      {/* Main scrollable content area */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 overflow-y-auto h-screen">
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}