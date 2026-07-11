'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 ${
        scrolled
          ? 'nav-blur bg-background/80 border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tighter">
          MŌTION<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors duration-300">
            Work
          </a>
          <a href="#services" className="hover:text-foreground transition-colors duration-300">
            Services
          </a>
          <a href="#about" className="hover:text-foreground transition-colors duration-300">
            About
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors duration-300">
            Contact
          </a>
        </div>

        <a
          href="#contact"
          className="magnetic-btn px-5 py-2 border border-border text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 rounded-full"
        >
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}
