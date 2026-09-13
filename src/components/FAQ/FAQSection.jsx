import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What does TRAIT Innovation do?',
      answer: 'TRAIT Innovation builds AI-powered, data-driven and digital technology solutions designed to address real-world challenges across different industries and use cases.'
    },
    {
      question: 'What industries does TRAIT work with?',
      answer: 'TRAIT works across multiple areas including artificial intelligence, legal technology, HR and recruitment, e-commerce, aviation, events, customer support and data analytics.'
    },
    {
      question: 'What kind of technology solutions does TRAIT build?',
      answer: 'TRAIT develops solutions such as AI assistants, data analytics systems, recruitment and HR platforms, interview solutions, customer support agents, commerce solutions, aviation assistance and other digital technology solutions.'
    },
    {
      question: 'Can businesses discuss custom technology solutions?',
      answer: 'Yes. TRAIT\'s focus is on applying technology to real-world problems, so businesses and organizations can discuss their specific requirements and explore suitable technology solutions.'
    },
    {
      question: 'How can I get in touch with TRAIT?',
      answer: 'Visitors can use the "Let\'s Talk" / contact option on the website to start a conversation with the TRAIT Innovation team.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-36 bg-gradient-to-b from-[#EBF6F6] via-[#E2F2F2] to-[#F4F4F6] relative text-[#0A0F1D]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-slate-800 text-xs font-mono font-bold tracking-wider uppercase border border-slate-200 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Questions & Answers
          </h2>
          <p className="text-slate-700 font-normal">
            Everything you need to know about TRAIT Innovation's work, capability, and engagement options.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-500/40 bg-white shadow-lg shadow-brand-500/5'
                    : 'border-slate-200/90 bg-white/90 backdrop-blur-md hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-base md:text-lg focus:outline-none font-display"
                >
                  <span>{faq.question}</span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 mt-1 animate-in fade-in duration-300">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
