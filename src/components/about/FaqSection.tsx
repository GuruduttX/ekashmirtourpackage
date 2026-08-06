"use client";
import React, { useState } from 'react';
import { Mail, Phone, Plus, Minus, Search, Bus } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
// ==========================================
// 📄 File: components/about/FaqSection.jsx (or .tsx)
// ==========================================
export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  const faqs = [
    { question: "What is your Cancellation Policy?", answer: "Our cancellation policy is flexible. You can cancel up to 48 hours before your trip for a full refund." },
    { question: "What is your Cancellation Policy?", answer: "Please refer to our terms and conditions for detailed cancellation rules." },
    { question: "What is your Cancellation Policy?", answer: "For peak season, cancellations must be made 7 days in advance." },
    { question: "What is your Cancellation Policy?", answer: "Contact our support team for any special cancellation requests." },
  ];

  return (
    <section className="w-full py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white mb-8">
      <div 
        ref={ref}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-[2rem] font-extrabold text-gray-900 text-center leading-tight">Frequently Asked</h2>
          <h2 className="text-[2rem] font-extrabold text-[#00B4D8] mb-6 text-center leading-tight">questions</h2>
          <p className="text-gray-600 text-sm leading-relaxed pr-4 font-medium text-center">
            communication and utilizes cutting edge logistic planning to get your shipment completed on time. itself founded
          </p>
        </div>
        
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border-2 rounded-2xl transition-all duration-300 ${openIndex === idx ? 'border-[#00B4D8] bg-white shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900"
              >
                <span className="text-[15px]">{faq.question}</span>
                <div className={`flex-shrink-0 ml-4 p-1 rounded-md transition-colors duration-300 bg-[#E5F7FA] text-[#00B4D8]`}>
                  {openIndex === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FaqSection;
