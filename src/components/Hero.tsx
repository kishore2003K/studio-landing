'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          titleLine1Ref.current,
          { y: 120, opacity: 0, rotateX: 40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2 },
          '-=0.4'
        )
        .fromTo(
          titleLine2Ref.current,
          { y: 120, opacity: 0, rotateX: 40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-24"
    >
      {/* Background grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative accent line */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] w-full text-center relative z-10">
        <div ref={badgeRef} className="opacity-0 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-xs uppercase tracking-widest text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            Digital Design Studio
          </span>
        </div>

        <div className="overflow-hidden">
          <div
            ref={titleLine1Ref}
            className="opacity-0 text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter"
          >
            We Design
          </div>
        </div>

        <div className="overflow-hidden mt-2">
          <div
            ref={titleLine2Ref}
            className="opacity-0 text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter"
          >
            <span className="text-stroke">Motion</span>
            <span className="text-accent">.</span>
          </div>
        </div>

        <div ref={subtitleRef} className="opacity-0 mt-8 max-w-xl mx-auto">
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Choreographing digital experiences through motion design,
            interactive storytelling, and creative technology.
          </p>
        </div>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="magnetic-btn px-8 py-4 bg-accent text-background font-semibold uppercase tracking-wider text-sm rounded-full hover:scale-105 transition-transform duration-300"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="magnetic-btn px-8 py-4 border border-border font-semibold uppercase tracking-wider text-sm rounded-full hover:border-foreground transition-colors duration-300"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground to-transparent" />
      </div>
    </section>
  );
}
