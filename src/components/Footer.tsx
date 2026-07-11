'use client';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold tracking-tighter tracking-[0.2em]">
            CLIKZ WEDDING FILMS<span className="text-accent">.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors duration-300">
              Films
            </a>
            <a href="#services" className="hover:text-foreground transition-colors duration-300">
              Packages
            </a>
            <a href="#about" className="hover:text-foreground transition-colors duration-300">
              About
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors duration-300">
              Contact
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2026 Clikz Wedding Films Studio
          </div>
        </div>
      </div>
    </footer>
  );
}
