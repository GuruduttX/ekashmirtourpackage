import { Package } from "@/lib/constants";

export default function BookingCard({ pkg }: { pkg: any }) {
  return (
    <div className="sticky top-28 w-full min-w-0 px-2 sm:px-0">
      <div className="rounded-3xl border border-sky-100/60 bg-white p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
        <div className="mb-4 border-b border-slate-100 pb-4">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.24em] text-sky-500">
            Enquiry Form
          </p>
          <h3 className="font-heading text-xl font-bold text-slate-900">
            Plan Your Trip
          </h3>
          <p className="mt-2 text-sm leading-5 text-slate-500">
            Share your dates and group size for{" "}
            <span className="font-medium text-slate-700">{pkg.title}</span>.
          </p>
        </div>

        <form className="min-w-0 space-y-3.5">
          <div className="min-w-0">
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
            />
          </div>

          <div className="min-w-0 grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div className="min-w-0">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="min-w-0 grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="travelDate"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Travel Date
              </label>
              <input
                id="travelDate"
                name="travelDate"
                type="date"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div className="min-w-0">
              <label
                htmlFor="travelerCount"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Traveler Count
              </label>
              <input
                id="travelerCount"
                name="travelerCount"
                type="number"
                min="1"
                placeholder="2"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Share preferences or any special request."
              className="w-full min-w-0 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#3B82F6] py-4 text-[0.95rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB]"
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
