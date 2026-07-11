'use client';

import { useState } from 'react';

const guidelines = [
  'Be ready on time according to the event schedule.',
  'Keep costumes, jewellery, and accessories prepared in advance.',
  'Have proper sleep and light food to stay fresh and energetic.',
  'Stay relaxed and enjoy the moments for natural photos and videos.',
  'Please arrive on time with planned costumes and accessories for a smooth and creative prewedding shoot.',
];

const terms = [
  '20% advance payment is required to confirm the booking.',
  'Balance payment must be completed on or before the event date.',
  'Photo and video editing will be done in our professional style.',
  'Delivery time for photos, videos, and album will be 30–45 working days.',
  'Any additional hours or services will be charged extra.',
  'Album printing will start only after client approval of the design.',
  'Travel and accommodation charges may apply for outstation events.',
  'Raw photos will be provided only if the client provides their own SSD or storage device.',
  'Additional sheets will be charged at RS:500 each.',
  'Once the booking is confirmed, the advance amount is non-refundable.',
];

export default function Guidelines() {
  const [openSection, setOpenSection] = useState<'guidelines' | 'terms' | null>(null);

  const toggleSection = (section: 'guidelines' | 'terms') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="py-24 md:py-32 bg-muted/20 border-t border-border/50">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-serif">
            Important Information
          </h2>
          <p className="text-muted-foreground mt-4">
            Everything you need to know for a seamless experience.
          </p>
        </div>

        <div className="space-y-6">
          {/* Guidelines Accordion */}
          <div className="border border-border/60 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10">
            <button
              onClick={() => toggleSection('guidelines')}
              className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none hover:bg-muted/10 transition-colors"
            >
              <span className="font-semibold text-lg font-serif">Bride & Groom Guidelines</span>
              <svg
                className={`w-6 h-6 text-accent transform transition-transform duration-300 ${openSection === 'guidelines' ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'guidelines' ? 'max-h-[600px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <ul className="space-y-4 mt-2">
                {guidelines.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-foreground/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms Accordion */}
          <div className="border border-border/60 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md transition-colors hover:bg-white/10">
            <button
              onClick={() => toggleSection('terms')}
              className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none hover:bg-muted/10 transition-colors"
            >
              <span className="font-semibold text-lg font-serif">Terms & Conditions</span>
              <svg
                className={`w-6 h-6 text-accent transform transition-transform duration-300 ${openSection === 'terms' ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'terms' ? 'max-h-[1000px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <ul className="space-y-4 mt-2">
                {terms.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-foreground/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
