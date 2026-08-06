import { ChevronDown } from "lucide-react";

interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

interface Props {
  faqs?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "What is included in this tour package?",
    answer:
      "This package includes accommodation, AC transfers, guided sightseeing, and assistance from local experts. Exact inclusions vary based on the itinerary selected.",
  },
  {
    question: "Is this package suitable for senior citizens?",
    answer:
      "Yes. The itinerary follows a comfortable pace with rest breaks, minimal walking, and comfortable vehicles. Special care is taken throughout the journey.",
  },
  {
    question: "Can this package be customized?",
    answer:
      "Absolutely. You can add or remove destinations, adjust pickup points, dates, and duration as per your requirements.",
  },
  {
    question: "What is the best time to visit Kashmir?",
    answer:
      "October to March offers pleasant weather. Festivals like Eid and local fairs are spiritually vibrant but may be crowded. Summer (April–June) offers lush greenery.",
  },
];

export default function PackageFaqSection({ faqs = defaultFaqs }: Props) {
  const list = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-6 sm:py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-3">
        {/* HEADER */}
        <div className="mb-12 text-center md:text-start">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4 border border-cyan-100">
            Need Help?
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-3 mx-auto md:mx-0 h-[3px] w-44 bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent rounded-full" />
          <p className="mt-4 text-gray-700 max-w-2xl">
            Clear answers to common questions about this tour package so you can plan your Kashmir journey with confidence.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {list.map((faq, index) => (
            <details
              key={faq.id ?? index}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-sky-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-100 hover:-translate-y-1"
            >
              <summary className="list-none cursor-pointer px-3 py-3.5 sm:px-6 sm:py-6 flex items-center justify-between gap-2 sm:gap-6">
                <div className="flex items-start gap-2.5 sm:gap-4 min-w-0">
                  <div className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-cyan-50 text-cyan-600 font-semibold text-xs sm:text-sm shrink-0">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg leading-snug pt-0.5 sm:pt-1">
                    {faq.question}
                  </h3>
                </div>
                <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 rounded-full bg-sky-50 text-sky-500 transition-all duration-300 group-open:bg-sky-500 group-open:text-white group-open:rotate-180">
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </summary>
              <div className="px-3 pb-4 pt-0 sm:px-6 sm:pb-6">
                <div className="md:pl-[52px]">
                  <div className="pl-3 sm:pl-4 border-l-2 border-cyan-100">
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
