"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  Settings, Zap, Cog, Wrench, Box, Factory,
  CheckCircle, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Users, TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "CNC and VMC Machining",
    desc: "High precision CNC & VMC machining for all production needs.",
    icon: <Settings size={42} />,
  },
  {
    title: "Spot Welding",
    desc: "Strong and durable welding for complex assemblies.",
    icon: <Zap size={42} />,
  },
  {
    title: "Spring Manufacturing",
    desc: "Custom springs with strict quality standards.",
    icon: <Cog size={42} />,
  },
  {
    title: "Fabrication Services",
    desc: "Complete fabrication from small to large structures.",
    icon: <Wrench size={42} />,
  },
  {
    title: "5-Axis CNC Machining",
    desc: "Complex geometry machining in single setup.",
    icon: <Box size={42} />,
  },
  {
    title: "Other Services",
    desc: "Prototype, tooling, and custom machining solutions.",
    icon: <Factory size={42} />,
  },
];

interface SliderItem {
  _id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
}

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
}

export default function HomePage() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);
  const [galleryAnimating, setGalleryAnimating] = useState(false);

  useEffect(() => {
    fetch("/api/slider")
      .then((r) => r.json())
      .then((d) => {
        if (d.items?.length) setSliders(d.items);
        else {
          setSliders([
            {
              _id: "1",
              title: "Industrial Springs Manufactured With Precision Engineering",
              subtitle: "3,200+ Welding & Fabrication Projects Delivered To Industries",
              imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1400",
            },
            {
              _id: "2",
              title: "High Precision CNC & VMC Machining",
              subtitle: "Tolerances as tight as ±0.005mm",
              imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400",
            },
            {
              _id: "3",
              title: "Spot Welding Electrodes & Fabrication",
              subtitle: "Strong, durable welding for complex assemblies",
              imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400",
            },
          ]);
        }
      })
      .catch(() => { });

    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => {
        if (d.items?.length) setGallery(d.items.slice(0, 8));
        else {
          setGallery([
            { _id: "1", title: "CNC Parts", imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600", category: "CNC" },
            { _id: "2", title: "Welding", imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600", category: "Welding" },
            { _id: "3", title: "Springs", imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600", category: "Springs" },
            { _id: "4", title: "Fabrication", imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600", category: "Fabrication" },
          ]);
        }
      })
      .catch(() => { });
  }, []);

  const goTo = useCallback((index: number) => {
    if (animating || sliders.length < 2) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 700);
  }, [animating, sliders.length]);

  const next = useCallback(() => {
    goTo((current + 1) % sliders.length);
  }, [current, sliders.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + sliders.length) % sliders.length);
  }, [current, sliders.length, goTo]);
  const galleryVisibleCount = 5;

  const galleryNext = useCallback(() => {
    if (gallery.length <= galleryVisibleCount || galleryAnimating) return;

    setGalleryAnimating(true);

    setGalleryStart((prev) => {
      return (prev + 1) % gallery.length;
    });

    setTimeout(() => {
      setGalleryAnimating(false);
    }, 500);
  }, [gallery.length, galleryAnimating]);

  const galleryPrev = useCallback(() => {
    if (gallery.length <= galleryVisibleCount || galleryAnimating) return;

    setGalleryAnimating(true);

    setGalleryStart((prev) => {
      return (prev - 1 + gallery.length) % gallery.length;
    });

    setTimeout(() => {
      setGalleryAnimating(false);
    }, 500);
  }, [gallery.length, galleryAnimating]);

  /* Gallery Auto Slider */
  useEffect(() => {
    if (gallery.length <= galleryVisibleCount) return;

    const timer = setInterval(() => {
      galleryNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [gallery.length, galleryNext]);
  useEffect(() => {
    if (sliders.length < 2) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [sliders, next]);

  const services = [
    { icon: <Settings className="w-8 h-8 text-orange-500" />, title: "CNC and VMC Machining", desc: "High precision CNC & VMC machining for all production needs." },
    { icon: <Zap className="w-8 h-8 text-orange-500" />, title: "Spot Welding", desc: "Strong and durable welding for complex assemblies." },
    { icon: <Cog className="w-8 h-8 text-orange-500" />, title: "Spring Manufacturing", desc: "Custom springs with strict quality standards." },
    { icon: <Wrench className="w-8 h-8 text-orange-500" />, title: "Fabrication Services", desc: "Complete fabrication from small to large structures." },
    { icon: <Box className="w-8 h-8 text-orange-500" />, title: "5-Axis CNC Machining", desc: "Complex geometry machining in single setup." },
    { icon: <Factory className="w-8 h-8 text-orange-500" />, title: "Other Services", desc: "Prototype, tooling, and custom machining solutions." },
  ];

  const features = [
    "Quality Control System, 100% Satisfaction Guarantee",
    "Highly Professional Staff, Accurate Testing Processes",
    "Unrivalled workmanship, Professional and Qualified",
    "Environmental Sensitivity, Personalised solutions",
  ];

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="relative h-[460px] md:h-[580px] overflow-hidden bg-slate-950 group">
        {sliders.length > 0 ? (
          <>
            {sliders.map((s, i) => (
              <div
                key={s._id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${i === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                  }`}
              >
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out ${i === current ? "scale-110" : "scale-100"
                    }`}
                  style={{ backgroundImage: `url(${s.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-slate-900/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center z-20">
                  <div className={`max-w-2xl text-white transition-all duration-700 delay-150 ${i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}>
                    <span className="inline-block mb-3 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold tracking-wider uppercase">
                      HyCare Industries
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4 drop-shadow-lg">
                      {s.title}
                    </h1>
                    {s.subtitle && (
                      <p className="text-base md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">{s.subtitle}</p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <Link href={s.link || "/about"} className="btn-primary shadow-lg shadow-orange-500/30">
                        More About Us <ArrowRight size={18} />
                      </Link>
                      <Link href="/gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
                        View Gallery
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={prev} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-orange-500 transition-all">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-orange-500 transition-all">
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {sliders.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-orange-500" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`} />
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">HyCare Industries</h1>
              <p className="text-xl">Precision Engineering Solutions</p>
            </div>
          </div>
        )}
      </section>
      {/*about */}

    <section className="relative overflow-hidden bg-white py-16 lg:py-24">

  {/* ================= BACKGROUND DECORATIONS ================= */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">

    {/* Top left dots */}
    <div className="absolute top-16 left-8 grid grid-cols-5 gap-3 opacity-40">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-300"
        />
      ))}
    </div>

    {/* Top right curved shape */}
    <div
      className="absolute -top-40 -right-40
                 w-[500px] h-[500px]
                 rounded-full
                 bg-slate-50"
    />

    {/* Bottom left gear-like circle */}
    <div
      className="absolute -bottom-40 -left-40
                 w-[350px] h-[350px]
                 rounded-full
                 border-[45px] border-slate-100"
    />

    {/* Bottom right orange line */}
    <div
      className="absolute -bottom-24 -right-20
                 w-80 h-56
                 border-2 border-orange-500
                 rotate-[-35deg]"
    />

    {/* Small dots bottom right */}
    <div className="absolute bottom-12 right-20 grid grid-cols-4 gap-3 opacity-40">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-orange-400"
        />
      ))}
    </div>

  </div>


  {/* ================= MAIN CONTAINER ================= */}
  <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

    <div className="grid lg:grid-cols-[0.95fr_1.25fr]
                    gap-12 lg:gap-20 items-center">


      {/* =====================================================
          LEFT IMAGE AREA
      ===================================================== */}
      <div className="relative mx-auto w-full max-w-[560px]">

        {/* Orange back layer */}
        <div
          className="absolute
                     -top-5 -left-5
                     w-[75%] h-[90%]
                     bg-orange-500
                     rounded-[22px]
                     rotate-[-7deg]"
        />

        {/* Dark blue back layer */}
        <div
          className="absolute
                     -bottom-7 -left-7
                     w-[75%] h-[70%]
                     bg-[#142b47]
                     rounded-[22px]
                     rotate-[-8deg]"
        />


        {/* Main image */}
        <div
          className="relative z-10
                     h-[400px] md:h-[500px]
                     overflow-hidden
                     rounded-[24px]
                     border-4 border-white
                     shadow-2xl
                     rotate-[-3deg]"
        >

          <img
            src="../images/img/job.jpg"
            alt="HyCare Engineering"
            className="w-full h-full object-cover
                       transition-transform duration-700
                       hover:scale-105"
          />

          {/* Image dark overlay */}
          <div
            className="absolute inset-0
                       bg-gradient-to-t
                       from-[#0d223b]/40
                       via-transparent
                       to-transparent"
          />

        </div>


        {/* =================================================
            ORANGE FLOATING CARD
        ================================================= */}
        <div
          className="absolute z-20
                     top-12 left-0
                     w-[210px] md:w-[240px]
                     bg-gradient-to-br
                     from-orange-500 to-orange-600
                     text-white
                     rounded-[18px]
                     p-6
                     shadow-2xl"
        >

          <div
            className="w-12 h-12
                       rounded-full
                       bg-white/15
                       flex items-center justify-center
                       mb-5"
          >
            <Settings size={26} />
          </div>

          <p
            className="text-lg md:text-xl
                       font-semibold
                       leading-snug"
          >
            Latest Solutions,
            <br />
            And Decades Of
            <br />
            Experience.
          </p>

          <div className="mt-5 w-10 h-[2px] bg-white" />

        </div>

      </div>


      {/* =====================================================
          RIGHT CONTENT
      ===================================================== */}
      <div>

        {/* Small title */}
        <div className="flex items-center gap-4 mb-5">

          <span className="w-9 h-[2px] bg-orange-500" />

          <p
            className="text-orange-500
                       uppercase
                       tracking-widest
                       font-semibold
                       text-sm"
          >
            About Us
          </p>

        </div>


        {/* Main heading */}
        <h2
          className="text-4xl md:text-5xl lg:text-[52px]
                     leading-[1.08]
                     font-extrabold
                     text-[#172b46]"
        >
          Specialized Training In CNC Machining, Fabrication,
          <br />

         {" "}
          <span className="text-orange-500">
            Welding Technology, and Industrial Maintenance.
          </span>
        </h2>


        {/* Your original heading/content */}
        <p
          className="mt-6
                     text-gray-600
                     text-base md:text-lg
                     leading-relaxed
                     max-w-3xl"
        >
          HyCare Engineering provides a full range of industrial
          services and solutions in manufacturing and engineering
          worldwide. We help businesses build better and faster
          with reliable solutions.
        </p>


        {/* =================================================
            FEATURES - 2 COLUMN
        ================================================= */}
        <div
          className="grid sm:grid-cols-2
                     gap-x-8 gap-y-6
                     mt-8"
        >

          {/* Feature 1 */}
          <div className="flex gap-4">

            <div
              className="w-12 h-12 shrink-0
                         rounded-full
                         bg-orange-50
                         flex items-center justify-center"
            >
              <ShieldCheck
                size={25}
                className="text-orange-500"
              />
            </div>

            <div>
              <h4 className="font-bold text-[#172b46]">
                Quality Control System
              </h4>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                100% satisfaction guarantee with reliable
                quality standards.
              </p>
            </div>

          </div>


          {/* Feature 2 */}
          <div className="flex gap-4">

            <div
              className="w-12 h-12 shrink-0
                         rounded-full
                         bg-orange-50
                         flex items-center justify-center"
            >
              <Settings
                size={25}
                className="text-orange-500"
              />
            </div>

            <div>
              <h4 className="font-bold text-[#172b46]">
                Accurate Testing
              </h4>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Highly professional staff and accurate
                testing processes.
              </p>
            </div>

          </div>


          {/* Feature 3 */}
          <div className="flex gap-4">

            <div
              className="w-12 h-12 shrink-0
                         rounded-full
                         bg-orange-50
                         flex items-center justify-center"
            >
              <Users
                size={25}
                className="text-orange-500"
              />
            </div>

            <div>
              <h4 className="font-bold text-[#172b46]">
                Professional Team
              </h4>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Qualified professionals delivering
                excellent workmanship.
              </p>
            </div>

          </div>


          {/* Feature 4 */}
          <div className="flex gap-4">

            <div
              className="w-12 h-12 shrink-0
                         rounded-full
                         bg-orange-50
                         flex items-center justify-center"
            >
              <TrendingUp
                size={25}
                className="text-orange-500"
              />
            </div>

            <div>
              <h4 className="font-bold text-[#172b46]">
                Reliable Solutions
              </h4>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Personalised and practical industrial
                solutions for every requirement.
              </p>
            </div>

          </div>

        </div>


        {/* =================================================
            BUTTON
        ================================================= */}
        <Link
          href="/about"
          className="group
                     inline-flex
                     items-center
                     gap-4
                     mt-9
                     px-7 py-3.5
                     rounded-full
                     bg-orange-500
                     text-white
                     font-semibold
                     shadow-lg
                     shadow-orange-500/20
                     transition-all duration-300
                     hover:bg-[#172b46]
                     hover:shadow-xl"
        >
          More About Us

          <span
            className="w-8 h-8
                       rounded-full
                       bg-white/20
                       flex items-center justify-center
                       transition-transform
                       group-hover:translate-x-1"
          >
            <ArrowRight size={18} />
          </span>

        </Link>

      </div>

    </div>


    {/* =====================================================
        STATS BAR
    ===================================================== */}
    <div
      className="relative
                 mt-20 lg:mt-24
                 bg-[#f5f8fc]
                 rounded-[28px]
                 shadow-sm
                 border border-slate-100
                 px-6 md:px-10
                 py-7"
    >

      <div
        className="grid
                   md:grid-cols-2
                   lg:grid-cols-3"
      >

        {/* Stat 1 */}
        <div
          className="flex items-center gap-4
                     py-4 lg:py-2
                     lg:border-r
                     border-slate-200"
        >

          <div
            className="w-14 h-14
                       rounded-full
                       bg-orange-50
                       flex items-center justify-center"
          >
            <Settings
              size={27}
              className="text-orange-500"
            />
          </div>

          <div>
            <p
              className="text-3xl md:text-4xl
                         font-extrabold
                         text-[#172b46]"
            >
              8,500+
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Industrial Springs Manufactured
            </p>
          </div>

        </div>


        {/* Stat 2 */}
        <div
          className="flex items-center gap-4
                     py-4 lg:py-2
                     lg:px-10
                     lg:border-r
                     border-slate-200"
        >

          <div
            className="w-14 h-14
                       rounded-full
                       bg-orange-50
                       flex items-center justify-center"
          >
            <TrendingUp
              size={27}
              className="text-orange-500"
            />
          </div>

          <div>
            <p
              className="text-3xl md:text-4xl
                         font-extrabold
                         text-[#172b46]"
            >
              3,200+
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Welding & Fabrication Projects
            </p>
          </div>

        </div>


        {/* Stat 3 */}
        <div
          className="flex items-center gap-4
                     py-4 lg:py-2
                     lg:px-10"
        >

          <div
            className="w-14 h-14
                       rounded-full
                       bg-orange-50
                       flex items-center justify-center"
          >
            <ShieldCheck
              size={27}
              className="text-orange-500"
            />
          </div>

          <div>
            <p
              className="text-3xl md:text-4xl
                         font-extrabold
                         text-[#172b46]"
            >
              100%
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Quality & Satisfaction
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* SPOT WELDING */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-16 lg:py-24">

        {/* ========================================================= */}
        {/* DECORATIVE BACKGROUND */}
        {/* ========================================================= */}

        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full
               bg-cyan-300/20 blur-3xl"
        />

        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full
               bg-teal-300/20 blur-3xl"
        />


        {/* ========================================================= */}
        {/* MAIN CONTAINER */}
        {/* ========================================================= */}

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">


            {/* ===================================================== */}
            {/* LEFT CONTENT */}
            {/* ===================================================== */}

            <div className="max-w-xl">

              {/* Label */}

              <div className="inline-flex items-center gap-2 mb-5">

                <span className="w-10 h-[2px] bg-cyan-500" />

                <span
                  className="text-sm font-semibold uppercase
                       tracking-[0.18em] text-cyan-600"
                >
                  Industrial Welding
                </span>

              </div>


              {/* Heading */}

              <h2
                className="text-4xl sm:text-5xl lg:text-[56px]
                     font-bold leading-[1.08] text-slate-900"
              >

                <span className="block">
                  Precision
                </span>

                <span className="block text-cyan-500">
                  Spot Welding
                </span>

                <span className="block text-slate-800">
                  Electrodes
                </span>

              </h2>


              {/* Description */}

              <p
                className="mt-6 text-base md:text-lg
                     leading-8 text-slate-600"
              >
                We manufacture high-quality spot welding electrodes using
                modern precision techniques and premium raw materials,
                designed for reliable performance in demanding industrial
                applications.
              </p>


              {/* ===================================================== */}
              {/* FEATURES */}
              {/* ===================================================== */}

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">

                {/* Feature 1 */}

                <div className="flex items-center gap-3">

                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full
                         bg-cyan-100 text-cyan-600
                         flex items-center justify-center
                         font-bold text-lg"
                  >
                    ✓
                  </span>

                  <span className="text-sm md:text-base text-slate-700">
                    Long service life
                  </span>

                </div>


                {/* Feature 2 */}

                <div className="flex items-center gap-3">

                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full
                         bg-cyan-100 text-cyan-600
                         flex items-center justify-center
                         font-bold text-lg"
                  >
                    ✓
                  </span>

                  <span className="text-sm md:text-base text-slate-700">
                    Reproducible quality
                  </span>

                </div>


                {/* Feature 3 */}

                <div className="flex items-center gap-3">

                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full
                         bg-cyan-100 text-cyan-600
                         flex items-center justify-center
                         font-bold text-lg"
                  >
                    ✓
                  </span>

                  <span className="text-sm md:text-base text-slate-700">
                    High density &amp; hardness
                  </span>

                </div>


                {/* Feature 4 */}

                <div className="flex items-center gap-3">

                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full
                         bg-cyan-100 text-cyan-600
                         flex items-center justify-center
                         font-bold text-lg"
                  >
                    ✓
                  </span>

                  <span className="text-sm md:text-base text-slate-700">
                    Low maintenance
                  </span>

                </div>

              </div>


              {/* ===================================================== */}
              {/* BUTTON */}
              {/* ===================================================== */}

              <div className="mt-9">

                <button
                  type="button"
                  className="inline-flex items-center gap-3
                       px-7 py-3.5
                       rounded-full
                       bg-cyan-500
                       text-white
                       font-semibold
                       shadow-lg shadow-cyan-500/25
                       hover:bg-cyan-600
                       hover:shadow-xl
                       hover:-translate-y-0.5
                       transition-all duration-300"
                >

                  <span>
                    Explore Products
                  </span>

                  <span className="text-lg">
                    →
                  </span>

                </button>

              </div>

            </div>


            {/* ===================================================== */}
            {/* RIGHT IMAGE COLLAGE */}
            {/* ===================================================== */}

            <div
              className="relative w-full
                   max-w-[620px]
                   h-[470px]
                   sm:h-[540px]
                   lg:h-[560px]
                   mx-auto"
            >


              {/* =================================================== */}
              {/* IMAGE 1 - TOP LEFT */}
              {/* =================================================== */}

              <div
                className="absolute
                     left-0
                     top-0
                     w-[60%]
                     h-[53%]
                     overflow-hidden
                     rounded-[28px]
                     border-4 border-white
                     shadow-xl
                     z-10
                     group"
              >

                <img
                  src="../images/img/spot1.jpg"
                  alt="Spot welding electrodes"
                  className="w-full h-full
                       object-cover
                       transition-transform
                       duration-700
                       group-hover:scale-110"
                />

              </div>


              {/* =================================================== */}
              {/* IMAGE 2 - TOP RIGHT */}
              {/* =================================================== */}

              <div
                className="absolute
                     right-0
                     top-[6%]
                     w-[41%]
                     h-[40%]
                     overflow-hidden
                     rounded-[28px]
                     border-4 border-white
                     shadow-xl
                     z-20
                     group"
              >

                <img
                  src="../images/img/spot2.WEBP"
                  alt="Welding electrode rods"
                  className="w-full h-full
                       object-cover
                       transition-transform
                       duration-700
                       group-hover:scale-110"
                />

              </div>


              {/* =================================================== */}
              {/* IMAGE 3 - BOTTOM LEFT */}
              {/* =================================================== */}

              <div
                className="absolute
                     left-0
                     bottom-[2%]
                     w-[60%]
                     h-[52%]
                     overflow-hidden
                     rounded-[28px]
                     border-4 border-white
                     shadow-xl
                     z-10
                     group"
              >

                <img
                  src="../images/img/spot3.jpg"
                  alt="Copper welding electrodes"
                  className="w-full h-full
                       object-cover
                       transition-transform
                       duration-700
                       group-hover:scale-110"
                />

              </div>


              {/* =================================================== */}
              {/* IMAGE 4 - BOTTOM RIGHT */}
              {/* =================================================== */}

              <div
                className="absolute
                     right-0
                     bottom-[2%]
                     w-[41%]
                     h-[51%]
                     overflow-hidden
                     rounded-[28px]
                     border-4 border-white
                     shadow-xl
                     z-20
                     group"
              >

                <img
                  src="../images/img/spot4.jpg"
                  alt="Industrial welding products"
                  className="w-full h-full
                       object-cover
                       transition-transform
                       duration-700
                       group-hover:scale-110"
                />

              </div>


              {/* =================================================== */}
              {/* CENTER PRECISION BADGE */}
              {/* =================================================== */}

              <div
                className="absolute
                     left-[58%]
                     top-[54%]
                     -translate-x-1/2
                     -translate-y-1/2
                     z-40"
              >

                <div
                  className="w-[82px]
                       h-[82px]
                       sm:w-[94px]
                       sm:h-[94px]
                       rounded-full
                       bg-white
                       border-[6px]
                       border-cyan-100
                       shadow-2xl
                       flex
                       flex-col
                       items-center
                       justify-center"
                >

                  {/* Lightning icon */}

                  <span
                    className="text-2xl
                         sm:text-3xl
                         leading-none
                         text-cyan-500"
                  >
                    ⚡
                  </span>

                  {/* Text */}

                  <span
                    className="mt-1
                         text-[8px]
                         sm:text-[10px]
                         font-bold
                         uppercase
                         tracking-wider
                         text-slate-600"
                  >
                    Precision
                  </span>

                </div>

              </div>


              {/* =================================================== */}
              {/* QUALITY FLOATING CARD */}
              {/* =================================================== */}

              <div
                className="absolute
                     left-[-10px]
                     sm:left-[-18px]
                     bottom-[-12px]
                     sm:bottom-[-18px]
                     z-50
                     bg-white
                     rounded-2xl
                     shadow-xl
                     border
                     border-slate-100
                     px-5
                     py-4"
              >

                <p
                  className="text-[11px]
                       text-slate-400
                       uppercase
                       tracking-wider"
                >
                  Quality
                </p>

                <p
                  className="mt-0.5
                       text-base
                       sm:text-lg
                       font-bold
                       text-slate-800
                       whitespace-nowrap"
                >
                  Built to Perform.
                </p>

              </div>


              {/* =================================================== */}
              {/* TOP RIGHT PLUS BUTTON */}
              {/* =================================================== */}

              <div
                className="absolute
                     right-[-8px]
                     sm:right-[-18px]
                     top-[-20px]
                     sm:top-[-24px]
                     z-50
                     w-16
                     h-16
                     rounded-full
                     bg-cyan-500
                     shadow-xl
                     flex
                     items-center
                     justify-center
                     text-white
                     text-2xl
                     font-semibold
                     hover:bg-cyan-600
                     hover:scale-105
                     transition-all
                     duration-300"
              >
                +
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-20 bg-[#F1F5F3]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Main Container */}
          <div className="bg-white rounded-2xl overflow-hidden p-8 md:p-10">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

              {/* ================= LEFT CONTENT ================= */}
              <div className="bg-[#FDB644] p-7 md:p-8 lg:min-h-[630px] flex flex-col justify-start">

                <p className="text-[#63738A] text-2xl md:text-3xl mb-3">
                  Our Services
                </p>

                <h2 className="text-[#10243E] text-3xl md:text-4xl font-medium mb-6">
                  Our Expertise
                </h2>

                <p className="text-[#40516A] text-base md:text-lg leading-8 max-w-sm">
                  Comprehensive CNC machining services with advanced
                  equipment and experienced operators for all your
                  manufacturing needs.
                </p>

                <Link
                  href="/services"
                  className="
              inline-flex
              items-center
              justify-center
              w-fit
              mt-7
              px-6
              py-4
              rounded-full
              bg-[#FF8415]
              text-white
              font-semibold
              text-base
              hover:bg-[#10243E]
              transition-all
            "
                >
                  Explore All Our Services
                </Link>

              </div>


              {/* ================= RIGHT SERVICES ================= */}
              <div className="lg:col-span-3">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  {services.map((s, i) => (

                    <div
                      key={i}
                      className="
                  group
                  relative
                  bg-[#F5F7F9]
                  rounded-2xl
                  min-h-[290px]
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
                    >

                      {/* Light Icon Background */}
                      <div
                        className="
                    absolute
                    top-0
                    left-0
                    w-[52%]
                    h-[52%]
                    bg-[#F4F0E9]
                    rounded-br-[0px]
                  "
                      />

                      {/* Content */}
                      <div className="relative z-10 p-7">

                        {/* Icon */}
                        <div className="
                    text-[#22394D]
                    text-4xl
                    mb-8
                    w-12
                    h-12
                    flex
                    items-center
                    justify-center
                  ">
                          {s.icon}
                        </div>

                        {/* Number */}
                        <span
                          className="
                      absolute
                      top-6
                      right-6
                      font-mono
                      text-xs
                      text-[#A1A8B0]
                    "
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Title */}
                        <h3
                          className="
                      text-[#10243E]
                      text-xl
                      font-medium
                      leading-tight
                      mb-3
                      max-w-[220px]
                      group-hover:text-[#E2601B]
                      transition-colors
                    "
                        >
                          {s.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="
                      text-[#637083]
                      text-base
                      leading-7
                      max-w-[240px]
                    "
                        >
                          {s.desc}
                        </p>

                      </div>
                    </div>

                  ))}

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HOME GALLERY */}


      <section className="home-gallery-section">

        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="home-gallery-header">

            <div>
              <span className="home-gallery-badge">
                OUR WORK
              </span>

              <h2 className="home-gallery-title">
                Explore Our
                <span> Latest Projects</span>
              </h2>
            </div>

            <p className="home-gallery-description">
              Take a closer look at our precision machining,
              welding, fabrication and industrial manufacturing work.
            </p>

          </div>


          {/* Gallery Wrapper */}
          <div className="gallery-slider-wrapper">

            {/* Left Arrow */}
            {gallery.length > galleryVisibleCount && (
              <button
                type="button"
                onClick={galleryPrev}
                disabled={galleryAnimating}
                className="gallery-arrow gallery-arrow-left"
                aria-label="Previous gallery images"
              >
                <ChevronLeft size={24} />
              </button>
            )}


            {/* Gallery */}
            <div className="professional-gallery-grid">

              {Array.from({
                length: Math.min(
                  galleryVisibleCount,
                  gallery.length
                ),
              }).map((_, position) => {

                const realIndex =
                  (galleryStart + position) % gallery.length;

                const item = gallery[realIndex];

                if (!item) return null;

                return (
                  <div
                    key={`${item._id}-${galleryStart}-${position}`}
                    className={`professional-gallery-card ${position === 0
                      ? "gallery-main-card"
                      : ""
                      } ${galleryAnimating
                        ? "gallery-slide-animation"
                        : ""
                      }`}
                  >

                    {/* Image */}
                    <div className="professional-gallery-image">

                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading={position < 2 ? "eager" : "lazy"}
                      />

                      {/* Image Number */}
                      <div className="gallery-number">
                        {String(realIndex + 1).padStart(2, "0")}
                      </div>

                      {/* Category */}
                      <div className="gallery-category-tag">
                        {item.category}
                      </div>

                      {/* Hover Overlay */}
                      <div className="professional-gallery-overlay">

                        <div className="gallery-overlay-content">

                          <span>
                            {item.category}
                          </span>

                          <h3>
                            {item.title}
                          </h3>

                          {item.description && (
                            <p>
                              {item.description}
                            </p>
                          )}

                          <Link
                            href="/gallery"
                            className="gallery-project-link"
                          >
                            View Project
                            <ArrowRight size={16} />
                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>


            {/* Right Arrow */}
            {gallery.length > galleryVisibleCount && (
              <button
                type="button"
                onClick={galleryNext}
                disabled={galleryAnimating}
                className="gallery-arrow gallery-arrow-right"
                aria-label="Next gallery images"
              >
                <ChevronRight size={24} />
              </button>
            )}

          </div>


          {/* Bottom */}
          <div className="gallery-bottom">

            <div className="gallery-progress">

              <span
                className="gallery-progress-active"
                style={{
                  width: gallery.length
                    ? `${((galleryStart + 1) / gallery.length) * 100}%`
                    : "0%",
                }}
              />

            </div>


            <div className="gallery-bottom-right">

              <span className="gallery-counter">
                {gallery.length
                  ? String(galleryStart + 1).padStart(2, "0")
                  : "00"}
                {" / "}
                {String(gallery.length).padStart(2, "0")}
              </span>

              <Link
                href="/gallery"
                className="gallery-all-button"
              >
                View Full Gallery
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
     <section className="relative overflow-hidden bg-[#101b2d] py-20 lg:py-28 text-white">

  {/* Background Decoration */}
  <div className="absolute inset-0 pointer-events-none">

    <div className="absolute -top-40 -right-40
                    w-[500px] h-[500px]
                    rounded-full
                    bg-orange-500/10 blur-3xl" />

    <div className="absolute -bottom-40 -left-40
                    w-[500px] h-[500px]
                    rounded-full
                    bg-blue-500/10 blur-3xl" />

    <div className="absolute top-20 right-20
                    w-32 h-32
                    border border-white/10
                    rotate-45" />

    <div className="absolute bottom-20 left-20
                    w-24 h-24
                    border border-orange-500/20
                    rotate-45" />

  </div>


  <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

    {/* ================= HEADER ================= */}
    <div className="grid lg:grid-cols-[0.8fr_1.2fr]
                    gap-10 items-end mb-14">

      <div>

        <div className="flex items-center gap-3 mb-4">

          <span className="w-10 h-[2px] bg-orange-500" />

          <p className="text-orange-400 text-sm
                        font-semibold tracking-[0.3em] uppercase">
            Some Reasons
          </p>

        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl
                       font-extrabold leading-tight">
          Why
          <span className="text-orange-500"> Choose </span>
          Us?
        </h2>

      </div>


      <div className="lg:max-w-xl lg:ml-auto">

        <p className="text-gray-300 text-base md:text-lg
                      leading-relaxed">
          We deliver precision, quality and reliability
          for every industrial project.
        </p>

        <Link
          href="/application-form"
          className="inline-flex items-center gap-3
                     mt-6
                     px-6 py-3.5
                     rounded-full
                     bg-orange-500
                     text-white
                     font-semibold
                     transition-all duration-300
                     hover:bg-orange-400
                     hover:-translate-y-1
                     shadow-lg shadow-orange-500/20"
        >
          Submit Application Form

          <span className="text-xl">
            →
          </span>

        </Link>

      </div>

    </div>


    {/* ================= REASONS ================= */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">


      {/* 01 */}
      <div
        className="group relative
                   min-h-[220px]
                   p-7
                   rounded-2xl
                   bg-white/[0.06]
                   border border-white/10
                   backdrop-blur-sm
                   overflow-hidden
                   transition-all duration-500
                   hover:-translate-y-2
                   hover:border-orange-500/50
                   hover:bg-white/[0.09]"
      >

        <span
          className="absolute -right-5 -top-8
                     text-[110px]
                     font-black
                     text-white/[0.035]
                     leading-none"
        >
          01
        </span>

        <div className="relative">

          <div className="flex items-center justify-between mb-7">

            <span
              className="flex items-center justify-center
                         w-12 h-12
                         rounded-xl
                         bg-orange-500
                         text-[#101b2d]
                         font-extrabold"
            >
              01
            </span>

            <span
              className="text-orange-500 text-2xl
                         transition-transform duration-300
                         group-hover:translate-x-1"
            >
              ↗
            </span>

          </div>

          <h3 className="text-xl font-bold mb-3">
            High Quality Hardware
          </h3>

          <p className="text-gray-400 leading-relaxed">
            We use top-notch hardware to develop
            the most efficient apps for our customers.
          </p>

        </div>

      </div>


      {/* 02 */}
      <div
        className="group relative
                   min-h-[220px]
                   p-7
                   rounded-2xl
                   bg-white/[0.06]
                   border border-white/10
                   backdrop-blur-sm
                   overflow-hidden
                   transition-all duration-500
                   hover:-translate-y-2
                   hover:border-orange-500/50
                   hover:bg-white/[0.09]"
      >

        <span className="absolute -right-5 -top-8
                         text-[110px] font-black
                         text-white/[0.035] leading-none">
          02
        </span>

        <div className="relative">

          <div className="flex items-center justify-between mb-7">

            <span className="flex items-center justify-center
                             w-12 h-12 rounded-xl
                             bg-orange-500
                             text-[#101b2d] font-extrabold">
              02
            </span>

            <span className="text-orange-500 text-2xl
                             group-hover:translate-x-1
                             transition-transform">
              ↗
            </span>

          </div>

          <h3 className="text-xl font-bold mb-3">
            Dedicated 24/7 Support
          </h3>

          <p className="text-gray-400 leading-relaxed">
            You can rely on our 24/7 tech support
            that will gladly solve any app issue you may have.
          </p>

        </div>

      </div>


      {/* 03 */}
      <div
        className="group relative
                   min-h-[220px]
                   p-7 rounded-2xl
                   bg-white/[0.06]
                   border border-white/10
                   backdrop-blur-sm
                   overflow-hidden
                   transition-all duration-500
                   hover:-translate-y-2
                   hover:border-orange-500/50
                   hover:bg-white/[0.09]"
      >

        <span className="absolute -right-5 -top-8
                         text-[110px] font-black
                         text-white/[0.035] leading-none">
          03
        </span>

        <div className="relative">

          <div className="flex items-center justify-between mb-7">

            <span className="flex items-center justify-center
                             w-12 h-12 rounded-xl
                             bg-orange-500
                             text-[#101b2d] font-extrabold">
              03
            </span>

            <span className="text-orange-500 text-2xl
                             group-hover:translate-x-1
                             transition-transform">
              ↗
            </span>

          </div>

          <h3 className="text-xl font-bold mb-3">
            Quality Assurance
          </h3>

          <p className="text-gray-400 leading-relaxed">
            At Hycare Engineering, quality is our top priority.
            Every product and service undergoes rigorous testing
            to meet the highest industry standards.
          </p>

        </div>

      </div>


      {/* 04 */}
      <div
        className="group relative
                   min-h-[220px]
                   p-7 rounded-2xl
                   bg-white/[0.06]
                   border border-white/10
                   backdrop-blur-sm
                   overflow-hidden
                   transition-all duration-500
                   hover:-translate-y-2
                   hover:border-orange-500/50
                   hover:bg-white/[0.09]"
      >

        <span className="absolute -right-5 -top-8
                         text-[110px] font-black
                         text-white/[0.035] leading-none">
          04
        </span>

        <div className="relative">

          <div className="flex items-center justify-between mb-7">

            <span className="flex items-center justify-center
                             w-12 h-12 rounded-xl
                             bg-orange-500
                             text-[#101b2d] font-extrabold">
              04
            </span>

            <span className="text-orange-500 text-2xl
                             group-hover:translate-x-1
                             transition-transform">
              ↗
            </span>

          </div>

          <h3 className="text-xl font-bold mb-3">
            Customer-Centric Approach
          </h3>

          <p className="text-gray-400 leading-relaxed">
            We believe in building lasting relationships
            with our clients. Our team works closely with you
            to understand your requirements and deliver
            solutions that exceed expectations.
          </p>

        </div>

      </div>


      {/* 05 */}
      <div
        className="group relative
                   min-h-[220px]
                   p-7 rounded-2xl
                   bg-white/[0.06]
                   border border-white/10
                   backdrop-blur-sm
                   overflow-hidden
                   transition-all duration-500
                   hover:-translate-y-2
                   hover:border-orange-500/50
                   hover:bg-white/[0.09]"
      >

        <span className="absolute -right-5 -top-8
                         text-[110px] font-black
                         text-white/[0.035] leading-none">
          05
        </span>

        <div className="relative">

          <div className="flex items-center justify-between mb-7">

            <span className="flex items-center justify-center
                             w-12 h-12 rounded-xl
                             bg-orange-500
                             text-[#101b2d] font-extrabold">
              05
            </span>

            <span className="text-orange-500 text-2xl
                             group-hover:translate-x-1
                             transition-transform">
              ↗
            </span>

          </div>

          <h3 className="text-xl font-bold mb-3">
            Experienced Team
          </h3>

          <p className="text-gray-400 leading-relaxed">
            Our skilled professionals bring years of
            expertise and a passion for excellence to
            every project.
          </p>

        </div>

      </div>


      {/* 06 */}
      <div
        className="group relative
                   min-h-[220px]
                   p-7 rounded-2xl
                   bg-white/[0.06]
                   border border-white/10
                   backdrop-blur-sm
                   overflow-hidden
                   transition-all duration-500
                   hover:-translate-y-2
                   hover:border-orange-500/50
                   hover:bg-white/[0.09]"
      >

        <span className="absolute -right-5 -top-8
                         text-[110px] font-black
                         text-white/[0.035] leading-none">
          06
        </span>

        <div className="relative">

          <div className="flex items-center justify-between mb-7">

            <span className="flex items-center justify-center
                             w-12 h-12 rounded-xl
                             bg-orange-500
                             text-[#101b2d] font-extrabold">
              06
            </span>

            <span className="text-orange-500 text-2xl
                             group-hover:translate-x-1
                             transition-transform">
              ↗
            </span>

          </div>

          <h3 className="text-xl font-bold mb-3">
            Advanced Technology
          </h3>

          <p className="text-gray-400 leading-relaxed">
            We invest in the latest technology and equipment
            to ensure precision, efficiency, and innovation
            in our processes.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>  

      {/* FAQ */}
      <section className="relative overflow-hidden bg-[#f6f8fb] py-20 lg:py-28">

  {/* ================= BACKGROUND ================= */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">

    {/* Big FAQ text */}
    <span
      className="absolute -top-8 -right-10
                 text-[180px] md:text-[240px]
                 font-black
                 text-slate-200/50
                 leading-none select-none"
    >
      FAQ
    </span>

    {/* Orange circle */}
    <div
      className="absolute -bottom-32 -left-32
                 w-80 h-80
                 rounded-full
                 bg-orange-500/10 blur-3xl"
    />

    {/* Decorative lines */}
    <div
      className="absolute top-1/2 right-0
                 w-40 h-[2px]
                 bg-orange-500/20"
    />

    <div
      className="absolute top-[52%] right-0
                 w-24 h-[2px]
                 bg-orange-500/20"
    />

  </div>


  <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

    <div className="grid lg:grid-cols-[0.8fr_1.4fr]
                    gap-12 lg:gap-20 items-start">


      {/* =================================================
          LEFT SIDE
      ================================================= */}
      <div className="lg:sticky lg:top-24">

        {/* Label */}
        <div className="flex items-center gap-3 mb-5">

          <span className="w-10 h-[2px] bg-orange-500" />

          <span
            className="text-orange-500
                       text-sm
                       font-bold
                       tracking-[0.25em]
                       uppercase"
          >
            Common Questions
          </span>

        </div>


        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl
                     font-extrabold
                     leading-[1.05]
                     text-[#15263d]"
        >
          CNC Machining
          <br />

          <span className="text-orange-500">
            FAQ
          </span>
        </h2>


        {/* Description */}
        <p
          className="mt-6
                     text-gray-600
                     text-base md:text-lg
                     leading-relaxed
                     max-w-md"
        >
          Get answers to frequently asked questions
          about our CNC machining services, quality,
          materials and delivery process.
        </p>


        {/* Small information card */}
        <div
          className="mt-8
                     relative
                     overflow-hidden
                     rounded-2xl
                     bg-[#15263d]
                     p-6
                     text-white
                     shadow-xl"
        >

          {/* Orange accent */}
          <div
            className="absolute top-0 left-0
                       w-1 h-full
                       bg-orange-500"
          />

          <p className="text-sm text-gray-400 mb-2">
            Need more information?
          </p>

          <h3 className="text-lg font-semibold">
            Talk to our technical team
          </h3>

          <p className="text-sm text-gray-400 mt-2">
            We are happy to discuss your machining
            requirements and project specifications.
          </p>

          <Link
            href="/application-form"
            className="inline-flex
                       items-center gap-2
                       mt-5
                       text-orange-400
                       font-semibold
                       text-sm
                       hover:text-orange-300
                       transition-colors"
          >
            Submit Application

            <span className="text-lg">
              →
            </span>
          </Link>

        </div>

      </div>


      {/* =================================================
          RIGHT SIDE FAQ
      ================================================= */}
      <div className="space-y-4">


        {/* ================= FAQ 01 ================= */}
        <details
          className="group
                     bg-white
                     rounded-2xl
                     border border-slate-200
                     overflow-hidden
                     shadow-sm
                     open:border-orange-300
                     open:shadow-lg
                     transition-all duration-300"
        >

          <summary
            className="list-none
                       cursor-pointer
                       px-5 md:px-7
                       py-5 md:py-6
                       flex items-center gap-5"
          >

            {/* Number */}
            <span
              className="flex items-center justify-center
                         w-11 h-11 shrink-0
                         rounded-xl
                         bg-[#15263d]
                         text-white
                         font-bold
                         text-sm
                         group-open:bg-orange-500
                         group-open:text-white
                         transition-colors duration-300"
            >
              01
            </span>


            {/* Question */}
            <span
              className="flex-1
                         text-base md:text-lg
                         font-bold
                         text-[#15263d]"
            >
              What tolerances can you achieve with CNC machining?
            </span>


            {/* Plus */}
            <span
              className="flex items-center justify-center
                         w-9 h-9
                         rounded-full
                         bg-slate-100
                         text-xl
                         text-[#15263d]
                         group-open:bg-orange-500
                         group-open:text-white
                         transition-all duration-300"
            >
              <span className="group-open:hidden">
                +
              </span>

              <span className="hidden group-open:block">
                −
              </span>
            </span>

          </summary>


          {/* Answer */}
          <div
            className="px-5 md:px-7
                       pb-6
                       pl-[76px] md:pl-[84px]"
          >

            <div className="h-px bg-slate-100 mb-5" />

            <p className="text-gray-600 leading-relaxed">
              We can achieve tolerances as tight as
              ±0.005mm for standard CNC machining
              operations.
            </p>

          </div>

        </details>


        {/* ================= FAQ 02 ================= */}
        <details
          className="group
                     bg-white
                     rounded-2xl
                     border border-slate-200
                     overflow-hidden
                     shadow-sm
                     open:border-orange-300
                     open:shadow-lg
                     transition-all duration-300"
        >

          <summary
            className="list-none
                       cursor-pointer
                       px-5 md:px-7
                       py-5 md:py-6
                       flex items-center gap-5"
          >

            <span
              className="flex items-center justify-center
                         w-11 h-11 shrink-0
                         rounded-xl
                         bg-[#15263d]
                         text-white
                         font-bold
                         text-sm
                         group-open:bg-orange-500"
            >
              02
            </span>


            <span
              className="flex-1
                         text-base md:text-lg
                         font-bold
                         text-[#15263d]"
            >
              What is the typical lead time for CNC machined parts?
            </span>


            <span
              className="flex items-center justify-center
                         w-9 h-9
                         rounded-full
                         bg-slate-100
                         text-xl
                         group-open:bg-orange-500
                         group-open:text-white"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:block">−</span>
            </span>

          </summary>


          <div
            className="px-5 md:px-7
                       pb-6
                       pl-[76px] md:pl-[84px]"
          >

            <div className="h-px bg-slate-100 mb-5" />

            <p className="text-gray-600 leading-relaxed">
              Typical lead time ranges from 5–15 working
              days depending on complexity and quantity.
            </p>

          </div>

        </details>


        {/* ================= FAQ 03 ================= */}
        <details
          className="group
                     bg-white
                     rounded-2xl
                     border border-slate-200
                     overflow-hidden
                     shadow-sm
                     open:border-orange-300
                     open:shadow-lg
                     transition-all duration-300"
        >

          <summary
            className="list-none
                       cursor-pointer
                       px-5 md:px-7
                       py-5 md:py-6
                       flex items-center gap-5"
          >

            <span
              className="flex items-center justify-center
                         w-11 h-11 shrink-0
                         rounded-xl
                         bg-[#15263d]
                         text-white
                         font-bold
                         text-sm
                         group-open:bg-orange-500"
            >
              03
            </span>


            <span
              className="flex-1
                         text-base md:text-lg
                         font-bold
                         text-[#15263d]"
            >
              Do you provide material certificates?
            </span>


            <span
              className="flex items-center justify-center
                         w-9 h-9
                         rounded-full
                         bg-slate-100
                         text-xl
                         group-open:bg-orange-500
                         group-open:text-white"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:block">−</span>
            </span>

          </summary>


          <div
            className="px-5 md:px-7
                       pb-6
                       pl-[76px] md:pl-[84px]"
          >

            <div className="h-px bg-slate-100 mb-5" />

            <p className="text-gray-600 leading-relaxed">
              Yes, we provide full material certificates
              and quality inspection reports with every order.
            </p>

          </div>

        </details>


        {/* ================= BOTTOM CONTACT ================= */}
        <div
          className="mt-7
                     rounded-2xl
                     border border-orange-200
                     bg-orange-50
                     p-5 md:p-6
                     flex flex-col sm:flex-row
                     sm:items-center
                     justify-between
                     gap-4"
        >

          <div>

            <p className="font-bold text-[#15263d]">
              Have a different question?
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Contact our team for detailed technical information.
            </p>

          </div>


          <Link
            href="/application-form"
            className="inline-flex
                       items-center
                       justify-center
                       px-5 py-3
                       rounded-xl
                       bg-[#15263d]
                       text-white
                       text-sm
                       font-semibold
                       hover:bg-orange-500
                       transition-colors"
          >
            Contact Us
          </Link>

        </div>

      </div>

    </div>

  </div>

</section>
    </div>
  );
}