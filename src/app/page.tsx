'use client';

import SmoothScroll from '@/components/SmoothScroll';
import WeddingHero from '@/components/WeddingHero';
import Slider from '@/components/Slider';
import Services from '@/components/Services';
import About from '@/components/About';
import Marquee from '@/components/Marquee';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <WeddingHero />
        <Slider />
        <Marquee />
        <Services />
        <About />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
