
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
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className || ""}`}
      >
        <div className="text-center">
          <Images size={30} className="mx-auto mb-2 opacity-50" />

          <p className="text-xs">
            Image unavailable
          </p>
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
      className={`${bgClass} rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition`}
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-1">
            {value}
          </h3>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${iconClass}`}
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
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">

      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto text-gray-400">
        {icon}
      </div>

      <h3 className="font-semibold text-gray-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 mt-5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
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
     LOAD DASHBOARD CONTENT
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
        console.error(
          "Authentication error:",
          error
        );

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-11 h-11 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Loading dashboard...
          </p>

        </div>

      </div>
    );
  }

  /* =======================================================
     USER ROLE
  ======================================================= */

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  const canManageContent =
    isAdmin || isUser;

  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-sm">

                  <Settings
                    size={25}
                    className="text-white"
                  />

                </div>

                <div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Manage your website content and applications
                  </p>

                </div>

              </div>


              {/* USER INFO */}

              <div className="flex flex-wrap items-center gap-2 mt-5">

                <span className="text-sm text-gray-500">
                  Welcome,
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {user?.name || user?.username}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

              <div className="flex flex-wrap gap-3">

                <Link
                  href="/admin/slider"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
                >
                  <Layers size={17} />
                  Manage Slider
                </Link>

                <Link
                  href="/admin/gallery"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

          <StatCard
            title="Slider Images"
            value={sliders.length}
            icon={<Layers size={23} />}
            iconClass="bg-blue-600"
            bgClass="bg-blue-50"
          />

          <StatCard
            title="Gallery Photos"
            value={gallery.length}
            icon={<Images size={23} />}
            iconClass="bg-orange-500"
            bgClass="bg-orange-50"
          />

          {isAdmin && (
            <>
              <StatCard
                title="Users"
                value="Manage"
                icon={<Users size={23} />}
                iconClass="bg-purple-600"
                bgClass="bg-purple-50"
              />

              <StatCard
                title="Applications"
                value="Manage"
                icon={<FileText size={23} />}
                iconClass="bg-green-600"
                bgClass="bg-green-50"
              />
            </>
          )}

        </div>


        {/* =================================================
            HOME SLIDER
            ONLY 3 IMAGES
        ================================================= */}

        {canManageContent && (

          <section className="mt-8">

            {/* HEADER */}

            <div className="flex items-end justify-between gap-4 mb-5">

              <div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Home Slider
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Preview of your homepage slider images.
                </p>

              </div>

              <Link
                href="/admin/slider"
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                View All
                <ArrowRight size={16} />
              </Link>

            </div>


            {/* SLIDER CARDS */}

            {sliders.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {sliders
                  .slice(0, 3)
                  .map((slide) => (

                    <div
                      key={slide._id}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                      {/* IMAGE */}

                      <div className="relative h-56 sm:h-60 bg-gray-100 overflow-hidden">

                        <SafeImage
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />


                        {/* ACTIVE BADGE */}

                        <div className="absolute top-3 right-3">

                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
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

                      <div className="p-4">

                        <h3 className="font-bold text-gray-900 truncate">
                          {slide.title}
                        </h3>

                        {slide.subtitle && (

                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
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
            ONLY 4 IMAGES
        ================================================= */}

        {canManageContent && (

          <section className="mt-9">

            {/* HEADER */}

            <div className="flex items-end justify-between gap-4 mb-5">

              <div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Gallery
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Latest project and machine images.
                </p>

              </div>

              <Link
                href="/admin/gallery"
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                View All
                <ArrowRight size={16} />
              </Link>

            </div>


            {/* GALLERY */}

            {gallery.length > 0 ? (

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {gallery
                  .slice(0, 4)
                  .map((item) => (

                    <div
                      key={item._id}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                      {/* IMAGE */}

                      <div className="relative h-44 sm:h-48 bg-gray-100 overflow-hidden">

                        <SafeImage
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />


                        {/* ACTIVE */}

                        <div className="absolute top-2 right-2">

                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
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

                      <div className="p-3">

                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 truncate">
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

          <section className="mt-9 mb-8">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">

              {/* HEADER */}

              <div className="flex items-center gap-3 mb-5">

                <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center">

                  <Settings
                    size={20}
                    className="text-white"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    Admin Controls
                  </h2>

                  <p className="text-sm text-gray-500">
                    Manage users and applications.
                  </p>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* USERS */}

                <Link
                  href="/admin/users"
                  className="group flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:bg-purple-50/40 transition"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">

                      <Users
                        size={20}
                        className="text-purple-600"
                      />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-900">
                        Users
                      </p>

                      <p className="text-xs text-gray-500">
                        Manage registered users
                      </p>

                    </div>

                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-400 group-hover:text-purple-600 transition"
                  />

                </Link>


                {/* APPLICATIONS */}

                <Link
                  href="/admin/applications"
                  className="group flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:bg-green-50/40 transition"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">

                      <FileText
                        size={20}
                        className="text-green-600"
                      />

                    </div>

                    <div>

                      <p className="font-semibold text-gray-900">
                        Applications
                      </p>

                      <p className="text-xs text-gray-500">
                        View submitted applications
                      </p>

                    </div>

                  </div>

                  <ArrowRight
                    size={18}
                    className="text-gray-400 group-hover:text-green-600 transition"
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
