import StayHubHero from "@/components/stays/StayHubHero";
import StayArchive from "@/components/stays/StayArchive";
import StayHowToChoose from "@/components/stays/StayHowToChoose";
import StayFaqSection from "@/components/stays/StayFaqSection";
import type { Stay } from "@/data/stays";

/**
 * SOP §A6 — STAYS & HOUSEBOATS is a HUB → money silo.
 * Hub blueprint: hero → answer block → stay-type cards (down-links to every
 * spoke) → how to choose → across-links to Destinations / Cabs / Packages →
 * FAQ → enquiry CTA.
 *
 * This is the boilerplate shell. Each section below gets replaced by a real
 * component, one at a time.
 */
export default function StayHubView({ stays }: { stays: Stay[] }) {
  return (
    <>
      {/* Breadcrumbs live inside the hero. */}
      <StayHubHero />

      {/* Archive — the hub's down-links to every stay spoke. */}
      <StayArchive stays={stays} />

      {/* How to choose — comparison table + location calls + soft enquiry CTA. */}
      <StayHowToChoose stays={stays} />

      {/* TODO: <StayAcrossLinks /> — into Destinations, Cab hub, Package hub. */}

      {/* FAQ — hub-level questions, emits FAQPage schema. */}
      <StayFaqSection stays={stays} />
      {/* TODO: <StayEnquiryCTA /> — sticky Get Quote + WhatsApp. */}
    </>
  );
}
