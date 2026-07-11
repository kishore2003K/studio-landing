'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Cinematic Highlight Film',
    description: 'A narrative-driven 5-7 minute film.',
    tags: ['4K Resolution', 'Drone Footage', 'Story-Driven'],
  },
  {
    number: '02',
    title: 'Full Documentary Edit',
    description: 'A comprehensive 45-60 minute ceremony film.',
    tags: ['Multi-Cam', 'Full Audio', 'Raw Emotion'],
  },
  {
    number: '03',
    title: 'Pre-Wedding Journey',
    description: 'A creative and romantic pre-wedding film.',
    tags: ['Stylized', 'Concept Based', 'Save The Date'],
  },
  {
    number: '04',
    title: 'Photography & Albums',
    description: 'Timeless photography and premium albums.',
    tags: ['Candid', 'Portraits', 'Premium Albums'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="opacity-0 mb-20">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
            Our Packages
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl font-serif">
            Tailored to tell
            <br />
            your unique story<span className="text-accent">.</span>
          </h2>
        </div>

        {/* Service items */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <div
              key={service.number}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="group opacity-0 border-t border-border py-8 md:py-12 hover:border-accent/30 transition-colors duration-500 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                <span className="text-sm font-mono text-muted-foreground shrink-0 pt-2">
                  {service.number}
                </span>

                <div className="flex-1">
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors duration-300 font-serif">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs uppercase tracking-wider border border-border rounded-full text-muted-foreground group-hover:border-accent/30 group-hover:text-accent transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
