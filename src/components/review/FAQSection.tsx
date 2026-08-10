"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function FAQSection() {
  const faqs = [
    {
      question: "How can I leave a review?",
      answer: "After your trip concludes, you will receive an email with a secure link to share your experience and photos with us."
    },
    {
      question: "Are reviews verified?",
      answer: "Yes. We cross-reference every review with our booking database to ensure it comes from a genuine traveler who traveled with eKashmir."
    },
    {
      question: "How do you collect customer feedback?",
      answer: "We collect feedback through post-trip surveys, direct emails, and follow-up calls to ensure we capture the complete picture of your experience."
    },
    {
      question: "Can I update my review?",
      answer: "Absolutely. If you need to add more details or photos to your review, simply reach out to our support team and we will help you update it."
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-16 sm:py-20 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-light">
          Everything you need to know about our review process.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-3 sm:space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.details 
            key={index}
            variants={itemVariants}
            className="group border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-sky-200 hover:-translate-y-1.5 transition-all duration-300 ease-out [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-5 sm:p-6 text-slate-900 font-medium">
              <h3 className="text-base sm:text-lg pr-4 group-hover:text-sky-950 transition-colors duration-300">
                {faq.question}
              </h3>
              <span className="relative h-5 w-5 shrink-0 text-sky-500 group-hover:scale-105 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0 transition-opacity duration-200"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100 transition-opacity duration-200"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 font-light text-sm sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
              <p>{faq.answer}</p>
            </div>
          </motion.details>
        ))}
      </motion.div>
    </section>
  );
}