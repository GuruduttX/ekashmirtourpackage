"use client";

import { useState } from "react";
import { MapPin, Navigation, Phone, User } from "lucide-react";

interface FieldErrors {
  name: string;
  phone: string;
  pickup: string;
  destination: string;
}

interface CabTripDetailsFormProps {
  name: string;
  phone: string;
  pickup: string;
  destination: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPickupChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  errors: FieldErrors;
  showErrors?: boolean;
  confirmed: boolean;
  onConfirm: () => void;
}

const inputWrapBase =
  "flex items-center gap-2.5 rounded-xl border bg-slate-50 px-3.5 py-3 transition-colors focus-within:border-sky-400 focus-within:bg-white";
const inputEl =
  "w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none";
const label = "mb-1.5 hidden text-sm font-bold text-slate-900 sm:block";
const errorText = "mt-1.5 text-xs font-medium text-red-500";

export default function CabTripDetailsForm({
  name,
  phone,
  pickup,
  destination,
  onNameChange,
  onPhoneChange,
  onPickupChange,
  onDestinationChange,
  errors,
  showErrors = false,
  confirmed,
  onConfirm,
}: CabTripDetailsFormProps) {
  const [touched, setTouched] = useState<Record<keyof FieldErrors, boolean>>({
    name: false,
    phone: false,
    pickup: false,
    destination: false,
  });

  const markTouched = (field: keyof FieldErrors) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const isShown = (field: keyof FieldErrors) => (touched[field] || showErrors) && !!errors[field];

  const wrapFor = (field: keyof FieldErrors) =>
    `${inputWrapBase} ${isShown(field) ? "border-red-400 bg-red-50/40" : "border-slate-200"}`;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 font-heading text-xl font-bold text-slate-900 sm:text-2xl">Trip Details</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="trip-name" className={label}>
            Full Name
          </label>
          <div className={wrapFor("name")}>
            <User className="h-4 w-4 shrink-0 text-sky-500" />
            <input
              id="trip-name"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={markTouched("name")}
              placeholder="Enter your full name"
              className={inputEl}
            />
          </div>
          {isShown("name") && <p className={errorText}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="trip-phone" className={label}>
            Phone no
          </label>
          <div className={wrapFor("phone")}>
            <Phone className="h-4 w-4 shrink-0 text-sky-500" />
            <input
              id="trip-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              onBlur={markTouched("phone")}
              placeholder="Enter your phone no"
              className={inputEl}
            />
          </div>
          {isShown("phone") && <p className={errorText}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="trip-pickup" className={label}>
            Pickup Location
          </label>
          <div className={wrapFor("pickup")}>
            <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
            <input
              id="trip-pickup"
              type="text"
              value={pickup}
              onChange={(e) => onPickupChange(e.target.value)}
              onBlur={markTouched("pickup")}
              placeholder="Where should we pick you up?"
              className={inputEl}
            />
          </div>
          {isShown("pickup") && <p className={errorText}>{errors.pickup}</p>}
        </div>

        <div>
          <label htmlFor="trip-destination" className={label}>
            Drop Location
          </label>
          <div className={wrapFor("destination")}>
            <Navigation className="h-4 w-4 shrink-0 text-sky-500" />
            <input
              id="trip-destination"
              type="text"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              onBlur={markTouched("destination")}
              placeholder="Where are you headed?"
              className={inputEl}
            />
          </div>
          {isShown("destination") && <p className={errorText}>{errors.destination}</p>}
        </div>
      </div>

      <button
        type="button"
        disabled={confirmed}
        onClick={onConfirm}
        className="mt-5 w-full rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:hover:translate-y-0 lg:hidden"
      >
        {confirmed ? "Booking Done" : "Confirm Booking"}
      </button>
    </div>
  );
}
