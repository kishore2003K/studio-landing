'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PACKAGES = [
  { id: 'cinematic', label: 'Cinematic Highlight Film' },
  { id: 'documentary', label: 'Full Documentary Edit' },
  { id: 'prewedding', label: 'Pre-Wedding Shoot' },
  { id: 'photography', label: 'Photography & Albums' },
  { id: 'custom', label: 'Custom Package' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to actual submit endpoint
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* ambient sprocket-hole rail, evokes a film strip running down the page */}
      <div
        aria-hidden
        className="hidden lg:block absolute left-6 top-0 bottom-0 w-3 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, currentColor 0, currentColor 10px, transparent 10px, transparent 28px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <div ref={contentRef}>
            <div className="opacity-0">
              <div className="flex items-center gap-2 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
                  Now Booking · 2026–2027
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 font-serif">
                Let&apos;s talk about
                <br />
                your <span className="italic font-normal text-accent">big day</span>.
              </h2>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">
                Reel 01 — Scene: Inquiry — Take 01
              </p>
            </div>

            <div className="opacity-0">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Available across South India. Drop us a line and let&apos;s start a conversation
                about your big day — we usually reply within 24 hours.
              </p>
            </div>

            {/* Call sheet style contact block */}
            <div className="opacity-0 space-y-5 border-t border-border/60 pt-8">
              <div className="grid grid-cols-[80px_1fr] gap-y-4 items-baseline">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Studio
                </span>
                <span className="font-serif text-lg font-bold">Marthandam Road, Attoor Junction</span>

                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Email
                </span>
                <a
                  href="mailto:clikzweddingfilms@gmail.com"
                  className="text-xl md:text-2xl font-bold tracking-tight hover:text-accent transition-colors duration-300 w-fit"
                >
                  clikzweddingfilms@gmail.com
                </a>

                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Phone
                </span>
                <a
                  href="tel:+919994122652"
                  className="text-xl md:text-2xl font-bold tracking-tight hover:text-accent transition-colors duration-300 w-fit"
                >
                  +91 99941 22652
                </a>
              </div>

              <div className="flex gap-6 text-muted-foreground pt-4">
                {[
                  { label: 'Instagram', href: 'https://instagram.com/clikz_.photography' },
                  { label: 'YouTube', href: '#' },
                  { label: 'Facebook', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative text-xs uppercase tracking-widest hover:text-foreground transition-colors duration-300"
                  >
                    {social.label}
                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>

            {/* Google Map with viewfinder framing */}
            <div className="opacity-0 mt-12 relative">
              <div className="relative rounded-2xl overflow-hidden h-64 border border-border bg-muted/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.324391696503!2d78.1030095!3d9.9250009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559475fc19bea54a!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716301234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale invert opacity-70 hover:opacity-100 transition-opacity duration-500"
                />
                {/* corner brackets, camera viewfinder cue */}
                {[
                  'top-3 left-3 border-t-2 border-l-2',
                  'top-3 right-3 border-t-2 border-r-2',
                  'bottom-3 left-3 border-b-2 border-l-2',
                  'bottom-3 right-3 border-b-2 border-r-2',
                ].map((pos) => (
                  <span
                    key={pos}
                    aria-hidden
                    className={`pointer-events-none absolute h-4 w-4 border-white/70 ${pos}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div ref={formRef} className="opacity-0 lg:sticky lg:top-24">
            <div className="relative bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-border/50 shadow-2xl">
              {/* corner brackets on the form card too, ties the two panels together */}
              {[
                'top-4 left-4 border-t-2 border-l-2',
                'top-4 right-4 border-t-2 border-r-2',
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`pointer-events-none absolute h-5 w-5 border-accent/40 ${pos}`}
                />
              ))}

              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Inquiry Form
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-mono">
                  TC 00:00:00:01
                </span>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border-0 border-b-2 border-border/50 px-0 py-3 text-base focus:ring-0 focus:border-accent transition-colors duration-300 placeholder:text-muted-foreground/50 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-0 border-b-2 border-border/50 px-0 py-3 text-base focus:ring-0 focus:border-accent transition-colors duration-300 placeholder:text-muted-foreground/50 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Wedding Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your wedding plans (date, location, etc)..."
                    className="w-full bg-transparent border-0 border-b-2 border-border/50 px-0 py-3 text-base focus:ring-0 focus:border-accent transition-colors duration-300 resize-none placeholder:text-muted-foreground/50 text-foreground"
                  />
                </div>

                {/* Pill-based package picker replaces the native select */}
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PACKAGES.map((pkg) => {
                      const active = selectedPackage === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide border transition-all duration-300 ${active
                              ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                              : 'bg-transparent text-muted-foreground border-border/60 hover:border-accent/60 hover:text-foreground'
                            }`}
                        >
                          {pkg.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="mt-8 w-full py-5 bg-accent text-background font-bold uppercase tracking-widest text-sm rounded-xl hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-accent/20 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {status === 'idle' && 'Send Message'}
                  {status === 'sending' && 'Sending…'}
                  {status === 'sent' && 'Message Sent ✓'}
                </button>

                <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">
                  We usually reply within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}