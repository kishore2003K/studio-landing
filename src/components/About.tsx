'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statEls = statsRef.current?.querySelectorAll('.stat-item');
      if (statEls) {
        gsap.fromTo(
          statEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted opacity-0"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter opacity-20 font-serif">
                  C
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-4">
                  Clikz Studio
                </div>
              </div>
            </div>
            {/* Decorative corner marks */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/20" />
          </div>

          {/* Text */}
          <div ref={textRef}>
            <div className="opacity-0">
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 font-serif">
                Capturing love<span className="text-accent">.</span>
              </h2>
            </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We craft cinematic films that let you relive your most cherished memories forever.
              </p>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '250+', label: 'Weddings Filmed' },
            { value: '15+', label: 'Destinations' },
            { value: '10', label: 'Awards Won' },
            { value: '8', label: 'Years Experience' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center md:text-left opacity-0"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
