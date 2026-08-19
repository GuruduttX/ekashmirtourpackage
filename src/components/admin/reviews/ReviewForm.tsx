"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import CMSMediaSection from "@/components/admin/cms/CMSMediaSection";

export interface PackageOption {
  _id: string;
  title: string;
}

/** Cloudinary folder for everything uploaded from this form. */
const EDITOR_TYPE = "review";

export interface ReviewFormData {
  packageId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  authorAvatarAlt: string;
  rating: number;
  title: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  isVerifiedPurchase: boolean;
  /** Optional review photo. Empty array means a text-only review. */
  images: Array<{ id?: string; url: string; alt: string }>;
}

interface ReviewFormProps {
  packages: PackageOption[];
  initialData?: Partial<ReviewFormData>;
  submitLabel: string;
  isSaving: boolean;
  onSubmit: (data: ReviewFormData) => Promise<void>;
}

const defaultFormState: ReviewFormData = {
  packageId: "",
  authorName: "",
  authorEmail: "",
  authorAvatar: "",
  authorAvatarAlt: "",
  rating: 5,
  title: "",
  content: "",
  status: "pending",
  isVerifiedPurchase: false,
  images: [],
};

export default function ReviewForm({
  packages,
  initialData,
  submitLabel,
  isSaving,
  onSubmit,
}: ReviewFormProps) {
  const [form, setForm] = useState<ReviewFormData>({
    ...defaultFormState,
    ...(initialData ?? {}),
    images: initialData?.images ?? [],
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setForm({ ...defaultFormState, ...initialData, images: initialData.images ?? [] });
    }
  }, [initialData]);

  const handleChange = (field: keyof ReviewFormData, value: string | number | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const photo = form.images[0] ?? { url: "", alt: "" };

  /** CMSMediaSection speaks {image, alt}; the review model stores {id, url, alt}. */
  const handlePhotoChange = (field: "image" | "alt", value: string) => {
    setForm((current) => {
      const existing = current.images[0] ?? { id: crypto.randomUUID(), url: "", alt: "" };
      const next = { ...existing, [field === "image" ? "url" : "alt"]: value };
      // Submit drops the row if it never got a photo, so alt can be typed first.
      return { ...current, images: next.url.trim() || next.alt.trim() ? [next] : [] };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.packageId) {
      setError("Please select a package.");
      return;
    }
    if (!form.authorName.trim() || !form.authorEmail.trim() || !form.content.trim()) {
      setError("Name, email, and review text are required.");
      return;
    }

    setError("");
    await onSubmit({
      ...form,
      images: form.images.filter((image) => image.url.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-200">Package</label>
          <select
            value={form.packageId}
            onChange={(event) => handleChange("packageId", event.target.value)}
            className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
          >
            <option value="">Select package</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-200">Review status</label>
          <select
            value={form.status}
            onChange={(event) => handleChange("status", event.target.value as ReviewFormData["status"])}
            className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-200">Reviewer name</label>
          <input
            type="text"
            value={form.authorName}
            onChange={(event) => handleChange("authorName", event.target.value)}
            className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
            placeholder="Name"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-200">Reviewer email</label>
          <input
            type="email"
            value={form.authorEmail}
            onChange={(event) => handleChange("authorEmail", event.target.value)}
            className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
            placeholder="Email"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-200">Review title</label>
          <input
            type="text"
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
            placeholder="Short review headline"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-200">Rating</label>
          <input
            type="number"
            min={1}
            max={5}
            step={0.5}
            value={form.rating}
            onChange={(event) => handleChange("rating", Number(event.target.value))}
            className="w-full rounded-2xl border border-[#19315d] bg-[#07111f] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-200">Review text</label>
        <textarea
          value={form.content}
          onChange={(event) => handleChange("content", event.target.value)}
          rows={6}
          className="w-full rounded-3xl border border-[#19315d] bg-[#07111f] px-4 py-4 text-sm text-slate-100 outline-none transition focus:border-blue-500"
          placeholder="Tell us about the experience"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <CMSMediaSection
            image={form.authorAvatar}
            alt={form.authorAvatarAlt}
            label="Reviewer avatar"
            editorType={EDITOR_TYPE}
            onChange={(field, value) =>
              handleChange(field === "image" ? "authorAvatar" : "authorAvatarAlt", value)
            }
          />
          <p className="text-xs text-slate-500">
            Headshot shown on the review card. Leave empty to fall back to the
            reviewer&apos;s initial.
          </p>
        </div>

        <div className="space-y-2">
          <CMSMediaSection
            image={photo.url}
            alt={photo.alt}
            label="Tour photo (optional)"
            editorType={EDITOR_TYPE}
            onChange={handlePhotoChange}
          />
          <p className="text-xs text-slate-500">
            A photo of them on the tour. Leave empty for a text-only review card.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={form.isVerifiedPurchase}
            onChange={(event) => handleChange("isVerifiedPurchase", event.target.checked)}
            className="h-4 w-4 rounded border-[#19315d] bg-[#07111f] text-blue-500 focus:ring-blue-500"
          />
          Verified purchase
        </label>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
