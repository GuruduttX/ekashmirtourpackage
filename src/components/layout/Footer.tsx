import Link from "next/link";

const FOOTER_NAV = {
  Packages: [
    "Gulmarg Snow Retreat",
    "Dal Lake Escape",
    "Pahalgam Trek",
    "Kashmir Grand Circuit",
  ],
  Company: ["Our Story", "The Team", "Sustainability", "Press"],
  Support: ["FAQ", "Contact Us", "Terms of Service", "Privacy Policy"],
};

const SOCIAL = [
  { label: "X", symbol: "𝕏" },
  { label: "Facebook", symbol: "f" },
  { label: "Instagram", symbol: "◈" },
  { label: "LinkedIn", symbol: "in" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0F172A] text-white">
      {/* ── Top bar ── */}
      <div className="border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs font-light tracking-wide">
            ✦ Trusted by 4,200+ travelers across India
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/25 text-xs">📞 +91 94190 00000</span>
            <span className="text-white/25 text-xs">✉ hello@ekashmir.in</span>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column — wider */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-0 mb-5">
              <span className="text-[#3B82F6] font-heading text-2xl font-bold">
                e
              </span>
              <span className="text-white font-heading text-2xl font-semibold tracking-tight">
                Kashmir
              </span>
            </div>
            <p className="text-white/38 text-sm leading-relaxed font-light max-w-[260px] mb-7">
              Crafting immersive Kashmir journeys for the discerning traveler.
              Where silence speaks and mountains breathe.
            </p>

            {/* Social row */}
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/18 transition-all duration-200 text-sm font-medium"
                >
                  {s.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_NAV).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/75 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/32 hover:text-white/65 text-sm font-light transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/6 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/22 text-xs font-light">
            © 2025 eKashmirTourPackages. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/22 hover:text-white/50 text-xs font-light transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
