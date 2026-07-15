'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EVENT_TYPES = [
  { id: 'wedding', label: 'WEDDING' },
  { id: 'pre_wedding', label: 'PRE-WEDDING' },
  { id: 'engagement', label: 'ENGAGEMENT' },
  { id: 'corporate', label: 'CORPORATE' },
  { id: 'other', label: 'OTHER' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [selectedEventType, setSelectedEventType] = useState<string>('wedding');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  }

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative py-[120px] lg:py-[160px] text-white min-h-screen flex items-center bg-black overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
          
          {/* Left column - Giant Text */}
          <div ref={contentRef} className="opacity-0 font-serif">
            <h2 className="text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter text-white/40">
              <span className="block">“Every</span>
              <span className="block">wedding</span>
              <span className="block">is a story”</span>
            </h2>
          </div>

          {/* Right column - Glassmorphism Form */}
          <div ref={formRef} className="opacity-0 w-full max-w-2xl justify-self-end">
            <div className="bg-white/5 backdrop-blur-md border border-white/20 p-10 md:p-16 rounded-lg shadow-2xl">
              <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                
                {/* Text Inputs */}
                <div className="flex flex-col gap-6">
                  <input
                    type="text"
                    required
                    placeholder="NAME"
                    className="w-full block bg-transparent border-0 border-b border-white/30 px-0 py-3 text-[11px] md:text-[13px] uppercase tracking-[0.15em] outline-none focus:ring-0 focus:border-white transition-colors duration-500 placeholder:text-white/70"
                  />

                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    className="w-full block bg-transparent border-0 border-b border-white/30 px-0 py-3 text-[11px] md:text-[13px] uppercase tracking-[0.15em] outline-none focus:ring-0 focus:border-white transition-colors duration-500 placeholder:text-white/70"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="PHONE NUMBER"
                    className="w-full block bg-transparent border-0 border-b border-white/30 px-0 py-3 text-[11px] md:text-[13px] uppercase tracking-[0.15em] outline-none focus:ring-0 focus:border-white transition-colors duration-500 placeholder:text-white/70"
                  />
                </div>

                {/* Event Type (Selector Chips) */}
                <div>
                  <label className="block text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/70 mb-4">
                    EVENT TYPE
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {EVENT_TYPES.map((type) => {
                      const active = selectedEventType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedEventType(type.id)}
                          className={`px-5 py-2.5 text-[9px] md:text-[10px] uppercase tracking-[0.15em] rounded-full transition-all duration-300 border ${
                            active
                              ? 'bg-orange-900/40 text-orange-200 border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                              : 'bg-black/30 text-white/80 border-white/20 hover:border-white/50 hover:bg-white/10'
                          }`}
                        >
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="w-full py-5 bg-white/70 text-black text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 disabled:opacity-50 rounded-sm"
                >
                  {status === 'idle' && 'SUBMIT INQUIRY'}
                  {status === 'sending' && 'SENDING...'}
                  {status === 'sent' && 'RECEIVED'}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}