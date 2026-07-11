'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div ref={contentRef}>
            <div className="opacity-0">
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 font-serif">
                Let&apos;s talk about
                <br />
                your big day<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="opacity-0">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Have a project in mind? We&apos;d love to hear about it. Drop us a
                line and let&apos;s start a conversation.
              </p>
            </div>

            <div className="opacity-0 space-y-4">
              <a
                href="mailto:clikzweddingfilms@gmail.com"
                className="block text-2xl md:text-3xl font-bold tracking-tight hover:text-accent transition-colors duration-300"
              >
                clikzweddingfilms@gmail.com
              </a>
              <a
                href="tel:+919994122652"
                className="block text-2xl font-bold tracking-tight hover:text-accent transition-colors duration-300 mb-8"
              >
                +91 9994122652
              </a>
              <div className="flex gap-6 text-muted-foreground mt-8">
                <a href="https://instagram.com/clikz_.photography" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors duration-300 text-xs uppercase tracking-widest">
                  Instagram
                </a>
                <a href="#" className="hover:text-foreground transition-colors duration-300 text-xs uppercase tracking-widest">
                  YouTube
                </a>
                <a href="#" className="hover:text-foreground transition-colors duration-300 text-xs uppercase tracking-widest">
                  Facebook
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="opacity-0 mt-12 rounded-2xl overflow-hidden h-64 border border-border bg-muted/50">
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
            </div>
          </div>

          {/* Right column - Form */}
          <div ref={formRef} className="opacity-0">
              <div className="bg-muted/20 p-8 rounded-2xl border border-border">
                <form className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-sm focus:border-accent focus:bg-muted focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-sm focus:border-accent focus:bg-muted focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      Wedding Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your wedding plans (Date, Location, etc)..."
                      className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-sm focus:border-accent focus:bg-muted focus:outline-none transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                      Interested In
                    </label>
                    <select className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-sm focus:border-accent focus:bg-muted focus:outline-none transition-colors duration-300 text-muted-foreground appearance-none cursor-pointer">
                      <option value="">Select a package</option>
                      <option value="cinematic">Cinematic Highlight Film</option>
                      <option value="documentary">Full Documentary Edit</option>
                      <option value="prewedding">Pre-Wedding Shoot</option>
                      <option value="photography">Photography & Albums</option>
                      <option value="custom">Custom Package</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full py-4 bg-accent text-background font-bold uppercase tracking-widest text-xs rounded-lg hover:opacity-90 transition-opacity duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
