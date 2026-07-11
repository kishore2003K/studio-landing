'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Ananya & Rahul',
    category: 'Cinematic Film',
    year: '2025',
    image: '/wedding_card_2_1783780197089.png',
  },
  {
    id: 2,
    title: 'Sophia & James',
    category: 'Documentary',
    year: '2025',
    image: '/wedding_hero_bg_1783780173180.png',
  },
  {
    id: 3,
    title: 'Priya & Karan',
    category: 'Pre-Wedding',
    year: '2024',
    image: '/wedding_card_1_1783780185249.png',
  },
  {
    id: 4,
    title: 'Emma & Liam',
    category: 'Highlight',
    year: '2024',
    image: '/wedding_card_3_1783780207183.png',
  },
];

export default function Slider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<gsap.core.Tween | null>(null);
  const isAnimating = useRef(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating.current || index === currentIndexRef.current) return;
      isAnimating.current = true;

      const direction = index > currentIndexRef.current ? 1 : -1;
      const currentSlide = slidesRef.current[currentIndexRef.current];
      const nextSlide = slidesRef.current[index];

      if (!currentSlide || !nextSlide) {
        isAnimating.current = false;
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          currentIndexRef.current = index;
          setActiveIndex(index);
          isAnimating.current = false;
          resetAutoPlay();
        },
      });

      // Animate out current slide
      tl.to(currentSlide, {
        opacity: 0,
        y: -60 * direction,
        scale: 0.95,
        duration: 0.5,
        ease: 'power3.in',
      });

      // Set up next slide
      gsap.set(nextSlide, { opacity: 0, y: 80 * direction, scale: 1.05 });

      // Animate in next slide
      tl.to(
        nextSlide,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      // Animate title text
      const titleEl = nextSlide.querySelector('.slide-title');
      const metaEl = nextSlide.querySelector('.slide-meta');

      if (titleEl) {
        tl.fromTo(
          titleEl,
          { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }

      if (metaEl) {
        tl.fromTo(
          metaEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // Update progress bar
      gsap.to(progressRef.current, {
        scaleX: (index + 1) / slides.length,
        duration: 0.4,
        ease: 'power2.out',
      });
    },
    []
  );

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      autoPlayRef.current.kill();
    }

    // Reset progress bar
    gsap.set(progressRef.current, { scaleX: 0 });

    autoPlayRef.current = gsap.to(
      { val: 0 },
      {
        val: 1,
        duration: 4,
        ease: 'none',
        onUpdate: function () {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${this.targets()[0].val})`;
          }
        },
        onComplete: () => {
          const next =
            (currentIndexRef.current + 1) % slides.length;
          goToSlide(next);
        },
      }
    );
  }, [goToSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      // Set initial slide
      const firstSlide = slidesRef.current[0];
      if (firstSlide) {
        gsap.set(firstSlide, { opacity: 1, y: 0 });
      }

      resetAutoPlay();
    }, sliderRef);

    return () => {
      ctx.revert();
      if (autoPlayRef.current) {
        autoPlayRef.current.kill();
      }
    };
  }, [resetAutoPlay]);

  return (
    <section ref={sliderRef} id="work" className="relative py-24 md:py-32 opacity-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-serif">
              Featured Films
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                goToSlide(
                  (currentIndexRef.current - 1 + slides.length) % slides.length
                )
              }
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8L10 4" />
              </svg>
            </button>
            <button
              onClick={() =>
                goToSlide((currentIndexRef.current + 1) % slides.length)
              }
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden bg-muted">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              ref={(el) => { slidesRef.current[i] = el; }}
              className="slider-slide rounded-2xl relative"
            >
              <Image 
                src={slide.image} 
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                <div className="slide-title text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none tracking-tighter mb-4 font-serif">
                  {slide.title}
                </div>
                <div className="slide-meta flex items-center gap-6 text-muted-foreground">
                  <span className="text-sm uppercase tracking-widest">
                    {slide.category}
                  </span>
                  <span className="w-8 h-px bg-muted-foreground" />
                  <span className="text-sm">{slide.year}</span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-8 right-8 md:top-16 md:right-16 text-8xl md:text-[10rem] font-bold opacity-10 leading-none tracking-tighter">
                {String(slide.id).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px bg-border rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Slide indicators */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
