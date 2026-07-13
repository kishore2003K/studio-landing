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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (!trackRef.current) return;

    // Calculate width of one card + gap
    const cardEl = trackRef.current.children[0] as HTMLElement;
    if (!cardEl) return;

    const style = window.getComputedStyle(cardEl);
    const marginRight = parseFloat(style.marginRight) || 0;
    const cardOuterWidth = cardEl.offsetWidth + 24; // 24px is gap-6 in Tailwind

    setActiveIndex(index);

    gsap.to(trackRef.current, {
      x: -index * cardOuterWidth,
      duration: 1.2,
      ease: 'expo.inOut',
    });

    // Subtle scale and fade effect on cards to highlight the active one
    Array.from(trackRef.current.children).forEach((child, i) => {
      // Animate the card wrapper
      gsap.to(child, {
        scale: i === index ? 1 : 0.9,
        opacity: i === index ? 1 : 0.4,
        duration: 1.2,
        ease: 'expo.inOut',
      });

      // Dramatic zoom reveal on the image inside
      const img = child.querySelector('img');
      if (img) {
        if (i === index) {
          gsap.fromTo(
            img,
            { scale: 1.3, filter: 'brightness(1.2)' },
            { scale: 1.05, filter: 'brightness(1)', duration: 1.5, ease: 'expo.out' }
          );
        } else {
          gsap.to(img, {
            scale: 1,
            filter: 'brightness(0.7)',
            duration: 1.2,
            ease: 'expo.inOut',
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      // Initialize card scales
      if (trackRef.current) {
        Array.from(trackRef.current.children).forEach((child, i) => {
          gsap.set(child, {
            scale: i === 0 ? 1 : 0.95,
            opacity: i === 0 ? 1 : 0.4,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearTimeout(timer);
  }, [activeIndex, goToSlide]);

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-32 opacity-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-serif">
              Featured Films
            </h2>
          </div>

          <div className="flex items-center gap-4 hidden sm:flex">
            <button
              onClick={() => goToSlide((activeIndex - 1 + slides.length) % slides.length)}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 border-border hover:bg-foreground hover:text-background"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8L10 4" />
              </svg>
            </button>
            <button
              onClick={() => goToSlide((activeIndex + 1) % slides.length)}
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 border-border hover:bg-foreground hover:text-background"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider Track Container */}
        <div className="relative w-full">
          <div ref={trackRef} className="flex gap-6 flex-nowrap w-max">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className="card-item relative flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] cursor-pointer"
                onClick={() => goToSlide(i)}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-white border border-white/10">
                    {slide.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-2">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl md:text-3xl font-semibold font-serif tracking-tight">
                      {slide.title}
                    </h3>
                    <span className="text-sm font-mono text-muted-foreground">
                      {slide.year}
                    </span>
                  </div>
                  <div className="w-12 h-px bg-accent/50 mt-4 transition-all duration-300" style={{ opacity: i === activeIndex ? 1 : 0.3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Controls & Progress indicators */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex
                    ? 'w-10 bg-accent'
                    : 'w-3 bg-border hover:bg-muted-foreground/60'
                  }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 sm:hidden">
            <button
              onClick={() => goToSlide((activeIndex - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 border-border hover:bg-foreground hover:text-background"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8L10 4" />
              </svg>
            </button>
            <button
              onClick={() => goToSlide((activeIndex + 1) % slides.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 border-border hover:bg-foreground hover:text-background"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4L10 8L6 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
