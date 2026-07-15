'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-black text-white font-sans relative overflow-hidden" style={{ paddingTop: '50px' }}>
      <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center" style={{ paddingLeft: '40px', paddingRight: '40px' }}>

        {/* Centered inner wrapper to ensure equal left/right spacing */}
        <div className="w-full max-w-[1100px] mx-auto pt-5">
          {/* Content-width top border */}
          <div className="w-full h-[1px] bg-white/20 mb-16 md:mb-20 " ></div>

          {/* 4-Column Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 lg:gap-x-12 gap-y-14 w-full text-left" style={{ paddingTop: '20px' }}>

            {/* Column 1: Our Address */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-serif uppercase tracking-widest font-medium mb-6 text-white/50">
                OUR ADDRESS
              </h3>
              <div className="text-[14px] leading-relaxed text-white/90 font-normal flex flex-col gap-1.5">
                <p>Clikz Wedding Films Studio,</p>
                <p>Marthandam Road,</p>
                <p>Attoor Junction,</p>
                <p>Tamil Nadu, India</p>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-serif uppercase tracking-widest font-medium mb-6 text-white/50">
                SERVICES
              </h3>
              <div className="flex flex-col items-start gap-1.5 text-[14px] leading-relaxed text-white/90 font-normal">
                <a href="#" className="hover:text-white/70 transition-colors w-fit">Cinematic Wedding Films,</a>
                <a href="#" className="hover:text-white/70 transition-colors w-fit">Engagement Shorts,</a>
                <a href="#" className="hover:text-white/70 transition-colors w-fit">Pre-Wedding Shoots,</a>
                <a href="#" className="hover:text-white/70 transition-colors w-fit">Highlight Reels,</a>
                <a href="#" className="hover:text-white/70 transition-colors w-fit">Photography Add-on</a>
              </div>
            </div>

            {/* Column 3: Studio Info */}
            <div className="flex flex-col">
              <h3 className="text-[11px] font-serif uppercase tracking-widest font-medium mb-6 text-white/50">
                STUDIO INFO
              </h3>
              <div className="text-[14px] leading-relaxed text-white/90 font-normal flex flex-col gap-1.5">
                <p>Based in South India,</p>
                <p>
                  Inquire:<br />
                  <a href="mailto:clikzweddingfilms@gmail.com" className="hover:text-white/70 transition-colors">
                    clikzweddingfilms@gmail.com
                  </a>
                </p>
                <p>Call: +91 99941 22652</p>
              </div>
            </div>

            {/* Column 4: Socials */}
            <div className="flex flex-col items-start">
              <h3 className="text-[11px] font-serif uppercase tracking-widest font-medium mb-6 text-white/50">
                SOCIALS
              </h3>
              <div className="flex items-center gap-4 text-white/80">
                {/* Instagram */}
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.186 0 12 0 12s0 3.814.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.814 24 12 24 12s0-3.814-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-.8-1.1-1.1-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.3-.4.1-.1.1-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.5 5L2 22l5-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.1c-1.5 0-3-.4-4.3-1.1l-.3-.2-3.2.8.9-3.1-.2-.3C4.2 15 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex items-center justify-center mt-20 md:mt-28" style={{ paddingBottom: '50px' }}>
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 text-center font-medium">
            © {currentYear} CLIKZ WEDDING FILMS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}