import FaqAccordion from "@/components/ui/FaqAccordion";
import { DESTINATION_FAQS, type DestinationFaq } from "@/data/destinationFaqs";

/**
 * FAQ section for the /destinations hub and each /destinations/[slug] page.
 *
 * The accordion itself moved to @/components/ui/FaqAccordion when the
 * /experiences hub needed the same thing. This is now just the destination
 * defaults — the hub renders it bare, a destination page passes its own
 * questions and heading. Existing call sites are unchanged.
 *
 * As before, the FAQPage JSON-LD is emitted by the PAGE, not here: one FAQPage
 * block per URL, fed from this same array so markup and text cannot drift.
 */
export default function DestinationFaqSection({
  faqs = DESTINATION_FAQS,
  eyebrow = "Before you book",
  headingLead = "Kashmir destination",
  headingAccent = "questions",
}: {
  faqs?: DestinationFaq[];
  eyebrow?: string;
  headingLead?: string;
  headingAccent?: string;
} = {}) {
  return (
    <FaqAccordion
      faqs={faqs}
      eyebrow={eyebrow}
      headingLead={headingLead}
      headingAccent={headingAccent}
    />
  );
}
