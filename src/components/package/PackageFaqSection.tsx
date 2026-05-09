import { ChevronDown } from "lucide-react";

interface PackageFAQ {
  question: string;
  answer: string;
}

const packageFaqs: PackageFAQ[] = [
  {
    question: "What is included in this tour package?",
    answer:
      "This package includes temple darshan, AC cab for sightseeing, pickup & drop, and assistance from a local Braj guide. Exact inclusions may vary based on the itinerary.",
  },
  {
    question: "Is this package suitable for senior citizens?",
    answer:
      "Yes. The itinerary follows a slow pace with rest breaks, minimal walking, and comfortable vehicles. Special care is taken for elders during darshan.",
  },
  {
    question: "Can this package be customized?",
    answer:
      "Absolutely. You can add Govardhan Parikrama, Barsana, Nandgaon, or adjust pickup points, dates, and duration as per your needs.",
  },
  {
    question: "Are hotels included in this package?",
    answer:
      "Hotel stays are included only in multi-day packages. One-day tours do not include accommodation unless mentioned explicitly.",
  },
  {
    question: "What is the best time to visit Vrindavan?",
    answer:
      "October to March offers pleasant weather. Festivals like Janmashtami and Holi are spiritually vibrant but very crowded.",
  },
];

export default function PackageFaqSection() {
  return (
    <section className="py-6 sm:py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-3">
        {/* HEADER */}
        <div className="mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full 
            bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4 border border-cyan-100"
          >
            Need Help?
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div
            className="mt-3 h-[3px] w-44 
            bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent rounded-full"
          />

          <p className="mt-4 text-gray-700 max-w-2xl">
            Clear answers to common questions about this tour package, so you
            can plan your Mathura–Vrindavan yatra with confidence.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {packageFaqs.map((faq, index) => (
            <details
              key={index}
              className="group relative bg-white rounded-3xl border border-sky-100
            shadow-sm transition-all duration-300
            hover:shadow-md hover:border-cyan-100 hover:-translate-y-1"
            >
              {/* Summary */}
              <summary className="list-none cursor-pointer px-6 py-6 flex items-center justify-between gap-6">
                {/* LEFT SIDE */}
                <div className="flex items-start gap-4">
                  {/* Number Badge */}
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full 
                  bg-cyan-50 text-cyan-600 font-semibold text-sm shrink-0"
                  >
                    {index + 1}
                  </div>

                  {/* Question */}
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-snug pt-1">
                    {faq.question}
                  </h3>
                </div>

                {/* Toggle Icon */}
                <span
                  className="w-8 h-8 flex items-center justify-center shrink-0
                rounded-full bg-sky-50 text-sky-500 
                transition-all duration-300
                group-open:bg-sky-500 group-open:text-white
                group-open:rotate-180"
                >
                  <ChevronDown size={20} />
                </span>
              </summary>

              {/* Answer */}
              <div className="px-6 pb-6 pt-0">
                {/* pl-[52px] aligns perfectly with the text based on 36px badge + 16px gap */}
                <div className="pl-[52px]">
                  <div className="pl-4 border-l-2 border-cyan-100">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
