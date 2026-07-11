'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    title: 'Basic Package',
    price: '₹ 45,999/-',
    features: [
      '1 Photographer',
      '1 Videographer',
      '70-Pages album',
      '1 Wedding Highlights',
      'Full function Video + Pendrive',
      '2 Photo frames',
      '1 Calendar',
    ],
  },
  {
    title: 'Package 1',
    price: '₹ 50,999/-',
    features: [
      '1 Photographer',
      '1 Videographer',
      '80-Pages album',
      '1 Wedding Highlights',
      'Full function Video + Pendrive',
      '2 Photo frames',
      '1 Calendar',
      'Pre-Wedding Photoshoot',
    ],
  },
  {
    title: 'Package 2',
    price: '₹ 59,999/-',
    features: [
      '1 Photographer',
      '1 Videographer',
      '80-Pages album',
      '1 Wedding Highlights',
      'Full function Video + Pendrive',
      '2 Photo frames',
      '1 Calendar',
      'Pre-Wedding Photoshoot',
      'Pre-Wedding Video',
    ],
  },
  {
    title: 'Standard Package',
    price: '₹ 75,999/-',
    features: [
      '1 Photographer',
      '1 Videographer',
      '100-Pages Premium Album',
      '1 Wedding Highlights',
      'Full function Video + Pendrive',
      '2 Photo frames',
      '1 Calendar',
      'Pre-Wedding Photoshoot',
      'Pre-Wedding Video',
    ],
  },
  {
    title: 'Premium Package',
    price: '₹ 95,999/-',
    features: [
      '1 Photographer',
      '1 Videographer',
      'Candid photo / video / Helicam',
      '100-Pages Premium Album + Mini Album',
      '1 Wedding Highlights + Wedding Reel',
      'Full function Video + Pendrive',
      '2 Photo frames',
      '1 Calendar',
      'Pre-Wedding Photoshoot',
      'Pre-Wedding Video',
    ],
  },
  {
    title: 'Luxury Package',
    price: '₹ 1,79,999/-',
    features: [
      'Traditional & Candid Photographer',
      'Traditional & Candid Videographer',
      '1 Helicam',
      'LED Wall + Live Editing',
      'Pre-Wedding Photo + Video',
      '200 Pages Premium Album',
      '1 Mini album',
      'Album Box + Bag',
      '2 Photo frames & Calendar',
      '1 Cinematic Wedding Highlights',
      'Bride & Groom Get Ready Reels',
      '1 Wedding Reel',
      'Full Function Video',
      '1 Pendrive + Box',
    ],
  },
];

const CARD_COUNT = packages.length;
const STEP = 360 / CARD_COUNT; // 60deg for 6 cards
const CARD_WIDTH = 340;
// Exact radius so adjacent hexagon faces meet edge-to-edge (r = (w/2) / tan(180/n))
const RADIUS = Math.round(CARD_WIDTH / 2 / Math.tan(Math.PI / CARD_COUNT));

const mod360 = (deg: number) => ((deg % 360) + 360) % 360;

const PackageCard = ({ pkg }: { pkg: (typeof packages)[0] }) => (
  <div className="h-full flex flex-col bg-background border border-border rounded-2xl p-6 hover:border-accent/50 hover:shadow-2xl transition-all duration-300 overflow-hidden text-left shadow-lg">
    <div className="mb-4 border-b border-border pb-4 shrink-0">
      <h3 className="text-xl md:text-2xl font-bold font-serif mb-1">{pkg.title}</h3>
      <div className="text-2xl md:text-3xl font-bold text-accent">{pkg.price}</div>
    </div>
    <ul className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
      {pkg.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <svg className="w-4 h-4 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[13px] md:text-sm text-foreground/80 leading-snug">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Carousel State
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isHovered || !isClient) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - STEP);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered, isClient]);

  const handleNext = () => setRotation((prev) => prev - STEP);
  const handlePrev = () => setRotation((prev) => prev + STEP);

  // Jump directly to a card, always taking the shortest rotation path
  const goToIndex = (index: number) => {
    const targetMod = mod360(-index * STEP);
    const currentMod = mod360(rotation);
    let diff = targetMod - currentMod;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setRotation((prev) => prev + diff);
  };

  // Which package currently faces front, for the dot indicator
  const activeIndex = Math.round(mod360(-rotation) / STEP) % CARD_COUNT;

  // GSAP animations for mobile grid header and items
  useEffect(() => {
    if (!isClient) return;
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isClient]);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-32 bg-muted/30 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center">
          <span className="text-xs uppercase tracking-widest text-accent mb-4 block font-bold">
            Our Packages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-serif">
            Tailored for every story
          </h2>
        </div>

        {/* --- MOBILE FALLBACK: Standard Grid --- */}
        <div className="grid grid-cols-1 md:hidden gap-8">
          {packages.map((pkg, i) => (
            <div key={pkg.title} ref={(el) => { itemsRef.current[i] = el; }}>
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>

        {/* --- DESKTOP: 3D Rotating Carousel --- */}
        <div
          className="hidden md:flex flex-col items-center justify-center relative w-full h-[600px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous package"
            className="absolute left-0 lg:left-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border text-foreground hover:bg-accent hover:text-white transition-colors hover:scale-110 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next package"
            className="absolute right-0 lg:right-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border text-foreground hover:bg-accent hover:text-white transition-colors hover:scale-110 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* perspective set inline — avoids relying on an arbitrary Tailwind class */}
          <div
            className="relative w-[340px] h-[500px]"
            style={{ perspective: '2000px' }}
          >
            <div
              className="relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)` }}
            >
              {packages.map((pkg, i) => {
                const angle = i * STEP;
                const effectiveAngle = mod360(angle + rotation);
                const distance = Math.min(effectiveAngle, 360 - effectiveAngle);
                const isFront = distance < 1;
                const scale = isFront ? 1 : distance <= STEP ? 0.82 : 0.68;
                const opacity = isFront ? 1 : distance <= STEP ? 0.45 : 0.12;

                return (
                  <div
                    key={pkg.title}
                    onClick={() => !isFront && goToIndex(i)}
                    className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isFront ? '' : 'cursor-pointer'
                      }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scale})`,
                      opacity,
                      transition:
                        'transform 1000ms cubic-bezier(0.25,1,0.5,1), opacity 1000ms cubic-bezier(0.25,1,0.5,1)',
                    }}
                  >
                    <PackageCard pkg={pkg} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot navigation, synced to the front-facing card */}
          <div className="mt-8 flex items-center gap-2">
            {packages.map((pkg, i) => (
              <button
                key={pkg.title}
                onClick={() => goToIndex(i)}
                aria-label={`Show ${pkg.title}`}
                aria-current={i === activeIndex}
                className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-6 bg-accent' : 'w-2 bg-border hover:bg-accent/50'
                  }`}
              />
            ))}
          </div>

          <div className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Auto-rotating • Hover to pause
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--border);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}