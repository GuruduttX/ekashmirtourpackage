"use client";

import { Check, IndianRupee, Lock, Phone, ShieldCheck } from "lucide-react";

interface CabFareSummaryProps {
  basePrice?: number;
  confirmed: boolean;
  onConfirm: () => void;
}

export default function CabFareSummary({ basePrice, confirmed, onConfirm }: CabFareSummaryProps) {
  return (
    <div
      id="cab-fare-summary"
      className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-black/5"
    >
      <h3 className="text-xl font-bold text-slate-900">Fare Summary</h3>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Base Fare</span>
          <span className="flex items-center gap-0.5 font-semibold text-slate-900">
            <IndianRupee className="h-3.5 w-3.5" />
            {(basePrice ?? 0).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Taxes</span>
          <span className="font-semibold text-emerald-600">Included</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Extra km charge</span>
          <span className="font-semibold text-slate-900">As applicable</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-lg font-bold text-slate-900">Total</span>
        <span className="flex items-center gap-1 bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-lg font-bold text-transparent">
          Dist ×
          <IndianRupee className="h-4 w-4 text-sky-500" />
          {(basePrice ?? 0).toLocaleString("en-IN")}
        </span>
      </div>

      <button
        type="button"
        disabled={confirmed}
        onClick={onConfirm}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:from-emerald-500 disabled:to-emerald-500 disabled:shadow-none disabled:hover:translate-y-0"
      >
        {confirmed && <Check className="h-4 w-4" strokeWidth={3} />}
        {confirmed ? "Booking Confirmed" : "Confirm Booking"}
      </button>

      <p className="mt-3 text-center text-[11px] text-slate-400">Safe &amp; Secure Payments</p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center gap-0.5 rounded-lg bg-sky-50 py-1.5 text-sky-600">
          <Lock className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold">Secure</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 rounded-lg bg-sky-50 py-1.5 text-sky-600">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold">No hidden fees</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 rounded-lg bg-sky-50 py-1.5 text-sky-600">
          <Phone className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold">24/7 support</span>
        </div>
      </div>
    </div>
  );
}
