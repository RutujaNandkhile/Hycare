import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Factory,
  Send,
} from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#07111f]">

        {/* Background Shapes */}
        <div className="absolute -top-32 -right-32 w-96 h-96
                        rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 w-80 h-80
                        rounded-full bg-blue-500/10 blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">

          <div className="max-w-3xl">

            {/* Small Heading */}
            <div className="flex items-center gap-3 mb-5">

              <span className="w-10 h-[2px] bg-orange-500"></span>

              <span className="text-orange-400 text-sm font-semibold
                               uppercase tracking-[3px]">
                Get In Touch
              </span>

            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold
                           text-white leading-tight">

              Let's Build Something

              <span className="text-orange-500">
                {" "}Precise.
              </span>

            </h1>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg
                          mt-5 max-w-2xl leading-7">

              Have an industrial project, machining requirement or
              fabrication enquiry? Talk to our team and let's find
              the right solution for your requirements.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}
      <section className="relative -mt-7 z-10">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                          bg-white rounded-2xl shadow-xl
                          border border-gray-100 overflow-hidden">


            {/* PHONE */}
            <a
              href="tel:7620335231"
              className="group p-6
                         border-b lg:border-b-0 lg:border-r
                         border-gray-100
                         hover:bg-slate-50 transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-lg
                                bg-orange-50 flex items-center justify-center">

                  <Phone
                    size={20}
                    className="text-orange-500"
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-gray-300
                             group-hover:text-orange-500 transition"
                />

              </div>

              <p className="text-xs uppercase tracking-widest
                            text-gray-400 mt-5">
                Call Us
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">
                7620335231
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                8605659955
              </p>

            </a>


            {/* EMAIL */}
            <a
              href="mailto:hycareengineering23@gmail.com"
              className="group p-6
                         border-b lg:border-b-0 lg:border-r
                         border-gray-100
                         hover:bg-slate-50 transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-lg
                                bg-orange-50 flex items-center justify-center">

                  <Mail
                    size={20}
                    className="text-orange-500"
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-gray-300
                             group-hover:text-orange-500 transition"
                />

              </div>

              <p className="text-xs uppercase tracking-widest
                            text-gray-400 mt-5">
                Email
              </p>

              <h3 className="font-semibold text-gray-900
                             mt-1 text-sm break-all">
                hycareengineering23@gmail.com
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Send us your enquiry
              </p>

            </a>


            {/* LOCATION */}
            <div
              className="group p-6
                         border-b md:border-b-0 lg:border-r
                         border-gray-100
                         hover:bg-slate-50 transition"
            >

              <div className="w-10 h-10 rounded-lg
                              bg-orange-50 flex items-center justify-center">

                <MapPin
                  size={20}
                  className="text-orange-500"
                />

              </div>

              <p className="text-xs uppercase tracking-widest
                            text-gray-400 mt-5">
                Location
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">
                Pimpri-Chinchwad
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Pune, Maharashtra, India
              </p>

            </div>


            {/* WORKING HOURS */}
            <div className="p-6 hover:bg-slate-50 transition">

              <div className="w-10 h-10 rounded-lg
                              bg-orange-50 flex items-center justify-center">

                <Clock
                  size={20}
                  className="text-orange-500"
                />

              </div>

              <p className="text-xs uppercase tracking-widest
                            text-gray-400 mt-5">
                Working Hours
              </p>

              <h3 className="font-semibold text-gray-900 mt-1">
                Mon – Sat
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                8:00 AM – 7:00 PM
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ENQUIRY SECTION
      ===================================================== */}
      <section className="py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr]
                          gap-10 items-start">


            {/* =================================================
                LEFT SIDE
            ================================================= */}
            <div className="lg:pt-6">

              {/* Label */}
              <div className="flex items-center gap-3 mb-4">

                <span className="w-8 h-[2px] bg-orange-500"></span>

                <span className="text-orange-500 text-sm
                                 font-semibold tracking-[2px]
                                 uppercase">
                  Enquiry
                </span>

              </div>


              {/* Heading */}
              <h2 className="text-3xl md:text-4xl
                             font-bold text-slate-900
                             leading-tight">

                Tell Us About Your

                <span className="text-orange-500">
                  {" "}Project.
                </span>

              </h2>


              {/* Description */}
              <p className="text-gray-500 mt-4 leading-7 max-w-lg">

                Whether you need CNC machining, VMC machining,
                fabrication, spot welding electrodes or spring
                manufacturing, our team is ready to discuss your
                requirement.

              </p>


              {/* Industrial Card */}
              <div className="mt-7 flex items-center gap-4
                              p-4 bg-slate-900 rounded-xl
                              text-white">

                <div className="w-11 h-11 rounded-lg
                                bg-orange-500
                                flex items-center justify-center
                                shrink-0">

                  <Factory size={21} />

                </div>

                <div>

                  <p className="font-semibold">
                    Industrial Engineering Solutions
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Precision • Quality • Reliability
                  </p>

                </div>

              </div>


              {/* Quick Contact */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                <a
                  href="tel:7620335231"
                  className="border border-gray-200
                             rounded-xl p-4 bg-white
                             hover:border-orange-400
                             transition"
                >

                  <Phone
                    size={18}
                    className="text-orange-500 mb-2"
                  />

                  <p className="text-xs text-gray-400">
                    Call Directly
                  </p>

                  <p className="font-semibold text-sm
                                text-gray-800 mt-1">
                    7620335231
                  </p>

                </a>


                <a
                  href="mailto:hycareengineering23@gmail.com"
                  className="border border-gray-200
                             rounded-xl p-4 bg-white
                             hover:border-orange-400
                             transition"
                >

                  <Mail
                    size={18}
                    className="text-orange-500 mb-2"
                  />

                  <p className="text-xs text-gray-400">
                    Email Us
                  </p>

                  <p className="font-semibold text-sm
                                text-gray-800 mt-1">
                    Send Email
                  </p>

                </a>

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE FORM
            ================================================= */}
            <div className="bg-white rounded-2xl
                            border border-gray-200
                            shadow-lg p-6 md:p-8">


              {/* Form Header */}
              <div className="flex items-center
                              justify-between mb-6">

                <div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Send an Enquiry
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Fill in the details and we'll get back to you.
                  </p>

                </div>


                <div className="hidden sm:flex w-11 h-11
                                rounded-full bg-orange-50
                                items-center justify-center">

                  <Send
                    size={19}
                    className="text-orange-500"
                  />

                </div>

              </div>


              {/* FORM */}
              <form className="space-y-4">


                {/* NAME + EMAIL */}
                <div className="grid md:grid-cols-2 gap-4">

                  <div>

                    <label className="text-sm font-medium
                                      text-gray-700">
                      Your Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="mt-2 w-full border
                                 border-gray-200 rounded-lg
                                 px-4 py-3 bg-gray-50
                                 focus:bg-white
                                 focus:border-orange-500
                                 focus:ring-2
                                 focus:ring-orange-100
                                 outline-none transition"
                    />

                  </div>


                  <div>

                    <label className="text-sm font-medium
                                      text-gray-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="mt-2 w-full border
                                 border-gray-200 rounded-lg
                                 px-4 py-3 bg-gray-50
                                 focus:bg-white
                                 focus:border-orange-500
                                 focus:ring-2
                                 focus:ring-orange-100
                                 outline-none transition"
                    />

                  </div>

                </div>


                {/* PHONE */}
                <div>

                  <label className="text-sm font-medium
                                    text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="mt-2 w-full border
                               border-gray-200 rounded-lg
                               px-4 py-3 bg-gray-50
                               focus:bg-white
                               focus:border-orange-500
                               focus:ring-2
                               focus:ring-orange-100
                               outline-none transition"
                  />

                </div>


                {/* SUBJECT */}
                <div>

                  <label className="text-sm font-medium
                                    text-gray-700">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="What can we help you with?"
                    className="mt-2 w-full border
                               border-gray-200 rounded-lg
                               px-4 py-3 bg-gray-50
                               focus:bg-white
                               focus:border-orange-500
                               focus:ring-2
                               focus:ring-orange-100
                               outline-none transition"
                  />

                </div>


                {/* MESSAGE */}
                <div>

                  <label className="text-sm font-medium
                                    text-gray-700">
                    Message
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Tell us about your project or requirement..."
                    className="mt-2 w-full border
                               border-gray-200 rounded-lg
                               px-4 py-3 bg-gray-50
                               focus:bg-white
                               focus:border-orange-500
                               focus:ring-2
                               focus:ring-orange-100
                               outline-none transition
                               resize-none"
                  />

                </div>


                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full flex items-center
                             justify-center gap-2
                             bg-orange-500
                             hover:bg-orange-600
                             text-white font-semibold
                             py-3.5 rounded-lg
                             transition
                             shadow-lg
                             shadow-orange-500/20"
                >

                  Send Enquiry

                  <ArrowUpRight size={18} />

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}