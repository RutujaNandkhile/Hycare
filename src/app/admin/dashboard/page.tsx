
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  Images,
  Users,
  FileText,
  ArrowRight,
  Plus,
  Settings,
} from "lucide-react";

interface User {
  username: string;
  name: string;
  role: "user" | "admin";
}

interface Slider {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  isActive: boolean;
}

interface Gallery {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  isActive: boolean;
}

/* =========================================================
   IMAGE COMPONENT
========================================================= */

function SafeImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
      >
        <div className="text-center px-3">
          <Images size={28} className="mx-auto mb-2 opacity-50" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon,
  iconClass,
  bgClass,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClass: string;
  bgClass: string;
}) {
  return (
    <div
      className={`${bgClass} rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {title}
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            {value}
          </h3>
        </div>

        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center text-white ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  icon,
  title,
  description,
  href,
  buttonText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 sm:p-10 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
        {icon}
      </div>

      <h3 className="font-semibold text-gray-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 mt-5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
      >
        <Plus size={16} />
        {buttonText}
      </Link>
    </div>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD CONTENT
  ======================================================= */

  const loadContent = async () => {
    try {
      const [sliderRes, galleryRes] = await Promise.all([
        fetch("/api/slider", {
          cache: "no-store",
        }),

        fetch("/api/gallery", {
          cache: "no-store",
        }),
      ]);

      if (!sliderRes.ok) {
        throw new Error("Failed to load slider");
      }

      if (!galleryRes.ok) {
        throw new Error("Failed to load gallery");
      }

      const sliderData = await sliderRes.json();
      const galleryData = await galleryRes.json();

      setSliders(sliderData.items || []);
      setGallery(galleryData.items || []);
    } catch (error) {
      console.error(
        "Failed to load dashboard content:",
        error
      );
    }
  };

  /* =======================================================
     AUTHENTICATION
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const initDashboard = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!data.user) {
          router.replace("/login");
          return;
        }

        if (mounted) {
          setUser(data.user);
          await loadContent();
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.replace("/login");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initDashboard();

    return () => {
      mounted = false;
    };
  }, [router]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-11 h-11 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  const canManageContent = isAdmin || isUser;

  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-7">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 lg:gap-6">

            {/* LEFT CONTENT */}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 sm:gap-4">

                <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-blue-600 flex items-center justify-center shadow-sm">
                  <Settings
                    size={22}
                    className="text-white sm:w-6 sm:h-6"
                  />
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                    Admin Dashboard
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                    Manage your website content and applications
                  </p>
                </div>
              </div>

              {/* USER INFO */}

              <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-5">
                <span className="text-xs sm:text-sm text-gray-500">
                  Welcome,
                </span>

                <span className="text-xs sm:text-sm font-semibold text-gray-900 max-w-[180px] truncate">
                  {user?.name || user?.username}
                </span>

                <span
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                    isAdmin
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* RIGHT BUTTONS */}

            {canManageContent && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex gap-2.5 w-full xl:w-auto">

                <Link
                  href="/admin/slider"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm whitespace-nowrap"
                >
                  <Layers size={17} />
                  Manage Slider
                </Link>

                <Link
                  href="/admin/gallery"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm whitespace-nowrap"
                >
                  <Images size={17} />
                  Manage Gallery
                </Link>

              </div>
            )}
          </div>
        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6">

          <StatCard
            title="Slider Images"
            value={sliders.length}
            icon={<Layers size={20} />}
            iconClass="bg-blue-600"
            bgClass="bg-blue-50"
          />

          <StatCard
            title="Gallery Photos"
            value={gallery.length}
            icon={<Images size={20} />}
            iconClass="bg-orange-500"
            bgClass="bg-orange-50"
          />

          {isAdmin && (
            <>
              <StatCard
                title="Users"
                value="Manage"
                icon={<Users size={20} />}
                iconClass="bg-purple-600"
                bgClass="bg-purple-50"
              />

              <StatCard
                title="Applications"
                value="Manage"
                icon={<FileText size={20} />}
                iconClass="bg-green-600"
                bgClass="bg-green-50"
              />
            </>
          )}

        </div>

        {/* =================================================
            HOME SLIDER
        ================================================= */}

        {canManageContent && (
          <section className="mt-7 sm:mt-9">

            {/* SECTION HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Home Slider
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Preview of your homepage slider images.
                </p>
              </div>

              <Link
                href="/admin/slider"
                className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                View All
                <ArrowRight size={15} />
              </Link>

            </div>

            {/* SLIDER CARDS */}

            {sliders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

                {sliders.slice(0, 3).map((slide) => (
                  <div
                    key={slide._id}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >

                    {/* IMAGE */}

                    <div className="relative h-48 sm:h-52 lg:h-56 xl:h-60 bg-gray-100 overflow-hidden">

                      <SafeImage
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* ACTIVE BADGE */}

                      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                        <span
                          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
                            slide.isActive
                              ? "bg-green-500 text-white"
                              : "bg-gray-800 text-white"
                          }`}
                        >
                          {slide.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </div>
                    </div>

                    {/* TEXT */}

                    <div className="p-3.5 sm:p-4">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                        {slide.title}
                      </h3>

                      {slide.subtitle && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Layers size={28} />}
                title="No slider images"
                description="Add slider images to display them on your homepage."
                href="/admin/slider"
                buttonText="Add Slider"
              />
            )}
          </section>
        )}

        {/* =================================================
            GALLERY
        ================================================= */}

        {canManageContent && (
          <section className="mt-7 sm:mt-9">

            {/* SECTION HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Gallery
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Latest project and machine images.
                </p>
              </div>

              <Link
                href="/admin/gallery"
                className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                View All
                <ArrowRight size={15} />
              </Link>

            </div>

            {/* GALLERY */}

            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

                {gallery.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >

                    {/* IMAGE */}

                    <div className="relative h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 bg-gray-100 overflow-hidden">

                      <SafeImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* ACTIVE */}

                      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                        <span
                          className={`px-1.5 sm:px-2.5 py-1 rounded-full text-[8px] sm:text-[10px] font-bold ${
                            item.isActive
                              ? "bg-green-500 text-white"
                              : "bg-gray-800 text-white"
                          }`}
                        >
                          {item.isActive
                            ? "ACTIVE"
                            : "INACTIVE"}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-2.5 sm:p-3">
                      <p className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                        {item.title}
                      </p>

                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1 truncate">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Images size={28} />}
                title="No gallery photos"
                description="Upload project and machine photos to your gallery."
                href="/admin/gallery"
                buttonText="Add Photos"
              />
            )}
          </section>
        )}

        {/* =================================================
            ADMIN CONTROLS
        ================================================= */}

        {isAdmin && (
          <section className="mt-7 sm:mt-9 mb-5 sm:mb-8">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 lg:p-6">

              {/* HEADER */}

              <div className="flex items-center gap-3 mb-4 sm:mb-5">

                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                  <Settings
                    size={19}
                    className="text-white"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Admin Controls
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Manage users and applications.
                  </p>
                </div>

              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                {/* USERS */}

                <Link
                  href="/admin/users"
                  className="group flex items-center justify-between gap-3 border border-gray-200 rounded-xl p-3.5 sm:p-4 hover:border-purple-300 hover:bg-purple-50/40 transition"
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                      <Users
                        size={19}
                        className="text-purple-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">
                        Users
                      </p>

                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                        Manage registered users
                      </p>
                    </div>

                  </div>

                  <ArrowRight
                    size={17}
                    className="text-gray-400 group-hover:text-purple-600 transition shrink-0"
                  />
                </Link>

                {/* APPLICATIONS */}

                <Link
                  href="/admin/applications"
                  className="group flex items-center justify-between gap-3 border border-gray-200 rounded-xl p-3.5 sm:p-4 hover:border-green-300 hover:bg-green-50/40 transition"
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <FileText
                        size={19}
                        className="text-green-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">
                        Applications
                      </p>

                      <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                        View submitted applications
                      </p>
                    </div>

                  </div>

                  <ArrowRight
                    size={17}
                    className="text-gray-400 group-hover:text-green-600 transition shrink-0"
                  />
                </Link>

              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

