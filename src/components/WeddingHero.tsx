'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const data = [
  {
    place: 'The Woodlands',
    title: 'MAJESTIC',
    title2: 'NATURE',
    description: 'A magical wedding framed by towering mountains and lush forests.',
    image: '/wedding_hero_bg_1783780173180.png',
  },
  {
    place: 'Bridal Suite',
    title: 'THE PERFECT',
    title2: 'RINGS',
    description: 'Capturing the essence of your eternal vows.',
    image: '/wedding_card_1_1783780185249.png',
  },
  {
    place: 'Enchanted Forest',
    title: 'A ROMANTIC',
    title2: 'WALK',
    description: 'A romantic stroll through a sunlit forest path.',
    image: '/wedding_card_2_1783780197089.png',
  },
  {
    place: 'Twilight Meadow',
    title: 'MAGICAL',
    title2: 'RECEPTION',
    description: 'An outdoor reception glowing under the evening stars.',
    image: '/wedding_card_3_1783780207183.png',
  },
];

export default function WeddingHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let order = [0, 1, 2, 3];
      let detailsEven = true;
      let clicks = 0;

      let offsetTop = 200;
      let offsetLeft = 700;
      let cardWidth = 200;
      let cardHeight = 300;
      let gap = 40;
      let numberSize = 50;
      const ease = "sine.inOut";

      let isRunning = true;
      let loopTimeout: NodeJS.Timeout;

      function getCard(index: number) {
        return `.card-${index}`;
      }
      function getCardContent(index: number) {
        return `.card-content-${index}`;
      }
      function getSliderItem(index: number) {
        return `.slide-item-${index}`;
      }

      function init() {
        const [active, ...rest] = order;
        const detailsActive = detailsEven ? ".details-even" : ".details-odd";
        const detailsInactive = detailsEven ? ".details-odd" : ".details-even";
        const height = window.innerHeight;
        const width = window.innerWidth;

        // Responsive calculations
        if (width < 1024) {
          offsetTop = height - 250;
          offsetLeft = 40;
          cardWidth = 140;
          cardHeight = 200;
          gap = 20;
        } else {
          offsetTop = height - 430;
          offsetLeft = width - 730;
        }

        gsap.set(".pagination", {
          top: offsetTop + (width < 1024 ? 220 : 330),
          left: offsetLeft,
          y: 200,
          opacity: 0,
          zIndex: 60,
        });
        gsap.set(".hero-nav", { y: -200, opacity: 0 });

        gsap.set(getCard(active), {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        });
        gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
        gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
        gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
        gsap.set(`${detailsInactive} .place-text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });

        gsap.set(".progress-sub-foreground", {
          width: 500 * (1 / order.length) * (active + 1),
        });

        rest.forEach((i, index) => {
          gsap.set(getCard(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
          });
          gsap.set(getCardContent(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            zIndex: 40,
            y: offsetTop + cardHeight - 100,
          });
          gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
        });

        gsap.set(".indicator", { x: -window.innerWidth });

        const startDelay = 0.6;

        gsap.to(".cover", {
          x: width + 400,
          delay: 0.5,
          ease,
          onComplete: () => {
            setTimeout(() => {
              if (isRunning) loop();
            }, 500);
          },
        });
        rest.forEach((i, index) => {
          gsap.to(getCard(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 30,
            delay: 0.05 * index + startDelay,
            ease,
          });
          gsap.to(getCardContent(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 40,
            delay: 0.05 * index + startDelay,
            ease,
          });
        });
        gsap.to(".pagination", { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to(".hero-nav", { y: 0, opacity: 1, ease, delay: startDelay });
        gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
        
        // Initial setup for the first slide text
        document.querySelector(`${detailsActive} .place-text`)!.textContent = data[order[0]].place;
        document.querySelector(`${detailsActive} .title-1`)!.textContent = data[order[0]].title;
        document.querySelector(`${detailsActive} .title-2`)!.textContent = data[order[0]].title2;
        document.querySelector(`${detailsActive} .desc`)!.textContent = data[order[0]].description;
        gsap.set(`${detailsActive} .place-text`, { y: 0 });
        gsap.set(`${detailsActive} .title-1`, { y: 0 });
        gsap.set(`${detailsActive} .title-2`, { y: 0 });
        gsap.set(`${detailsActive} .desc`, { y: 0 });
        gsap.set(`${detailsActive} .cta`, { y: 0 });
      }

      function step() {
        return new Promise((resolve) => {
          order.push(order.shift() as number);
          detailsEven = !detailsEven;

          const detailsActive = detailsEven ? ".details-even" : ".details-odd";
          const detailsInactive = detailsEven ? ".details-odd" : ".details-even";

          document.querySelector(`${detailsActive} .place-text`)!.textContent = data[order[0]].place;
          document.querySelector(`${detailsActive} .title-1`)!.textContent = data[order[0]].title;
          document.querySelector(`${detailsActive} .title-2`)!.textContent = data[order[0]].title2;
          document.querySelector(`${detailsActive} .desc`)!.textContent = data[order[0]].description;

          gsap.set(detailsActive, { zIndex: 22 });
          gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
          gsap.to(`${detailsActive} .place-text`, { y: 0, delay: 0.1, duration: 0.7, ease });
          gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
          gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
          gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
          gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease });

          gsap.set(detailsInactive, { zIndex: 12 });

          const [active, ...rest] = order;
          const prv = rest[rest.length - 1];

          gsap.set(getCard(prv), { zIndex: 10 });
          gsap.set(getCard(active), { zIndex: 20 });
          gsap.to(getCard(prv), { scale: 1.5, ease });

          gsap.to(getCardContent(active), {
            y: offsetTop + cardHeight - 10,
            opacity: 0,
            duration: 0.3,
            ease,
          });
          gsap.to(getSliderItem(active), { x: 0, ease });
          gsap.to(getSliderItem(prv), { x: -numberSize, ease });
          gsap.to(".progress-sub-foreground", {
            width: 500 * (1 / order.length) * (active + 1),
            ease,
          });

          gsap.to(getCard(active), {
            x: 0,
            y: 0,
            ease,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            onComplete: () => {
              const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
              gsap.set(getCard(prv), {
                x: xNew,
                y: offsetTop,
                width: cardWidth,
                height: cardHeight,
                zIndex: 30,
                borderRadius: 10,
                scale: 1,
              });

              gsap.set(getCardContent(prv), {
                x: xNew,
                y: offsetTop + cardHeight - 100,
                opacity: 1,
                zIndex: 40,
              });
              gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

              gsap.set(detailsInactive, { opacity: 0 });
              gsap.set(`${detailsInactive} .place-text`, { y: 100 });
              gsap.set(`${detailsInactive} .title-1`, { y: 100 });
              gsap.set(`${detailsInactive} .title-2`, { y: 100 });
              gsap.set(`${detailsInactive} .desc`, { y: 50 });
              gsap.set(`${detailsInactive} .cta`, { y: 60 });
              clicks -= 1;
              if (clicks > 0) {
                step();
              }
            },
          });

          rest.forEach((i, index) => {
            if (i !== prv) {
              const xNew = offsetLeft + index * (cardWidth + gap);
              gsap.set(getCard(i), { zIndex: 30 });
              gsap.to(getCard(i), {
                x: xNew,
                y: offsetTop,
                width: cardWidth,
                height: cardHeight,
                ease,
                delay: 0.1 * (index + 1),
              });

              gsap.to(getCardContent(i), {
                x: xNew,
                y: offsetTop + cardHeight - 100,
                opacity: 1,
                zIndex: 40,
                ease,
                delay: 0.1 * (index + 1),
              });
              gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
            }
          });
        });
      }

      function animate(target: string, duration: number, properties: any) {
        return new Promise((resolve) => {
          gsap.to(target, {
            ...properties,
            duration: duration,
            onComplete: resolve,
          });
        });
      }

      async function loop() {
        if (!isRunning) return;
        await animate(".indicator", 2, { x: 0 });
        await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
        gsap.set(".indicator", { x: -window.innerWidth });
        await step();
        if (isRunning) {
          loopTimeout = setTimeout(loop, 100);
        }
      }
      
      // Initialize after a tiny delay to ensure DOM is ready
      setTimeout(() => init(), 100);

      // Add click handlers for manual navigation
      const leftArrow = document.querySelector(".arrow-left");
      const rightArrow = document.querySelector(".arrow-right");
      
      const handleNext = () => {
        clicks += 1;
        if (clicks === 1) {
          step();
        }
      };

      if (rightArrow) rightArrow.addEventListener("click", handleNext);

      return () => {
        isRunning = false;
        clearTimeout(loopTimeout);
        if (rightArrow) rightArrow.removeEventListener("click", handleNext);
      };
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const DetailsBlock = ({ className }: { className: string }) => (
    <div className={`details ${className} absolute top-[150px] md:top-[240px] left-[20px] md:left-[60px] z-[22]`}>
      <div className="place-box h-[46px] overflow-hidden">
        <div className="place-text pt-[16px] text-xl font-medium relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[4px] before:rounded-full before:bg-white"></div>
      </div>
      <div className="title-box-1 mt-[2px] h-[60px] md:h-[100px] overflow-hidden">
        <div className="title-1 font-semibold text-5xl md:text-[72px] font-serif leading-none"></div>
      </div>
      <div className="title-box-2 mt-[2px] h-[60px] md:h-[100px] overflow-hidden">
        <div className="title-2 font-semibold text-5xl md:text-[72px] font-serif leading-none"></div>
      </div>
      <div className="desc mt-4 w-[90vw] md:w-[500px] text-white/90"></div>
      <div className="cta w-[90vw] md:w-[500px] mt-6 flex items-center">
        <button className="bookmark border-none bg-accent w-9 h-9 rounded-full text-black grid place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="discover border border-white bg-transparent h-9 rounded-full text-white px-6 text-xs uppercase ml-4">
          Discover Location
        </button>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background text-white/90 font-sans">
      <style>{`
        .card {
          box-shadow: 6px 6px 10px 2px rgba(0, 0, 0, 0.6);
        }
        .slide-numbers {
          width: 50px;
          height: 50px;
          overflow: hidden;
          z-index: 60;
          position: relative;
        }
        .slide-item {
          width: 50px;
          height: 50px;
          position: absolute;
          color: white;
          top: 0;
          left: 0;
          display: grid;
          place-items: center;
          font-size: 32px;
          font-weight: bold;
        }
      `}</style>

      <div className="indicator fixed top-0 left-0 right-0 h-[5px] bg-accent z-[60]" />

      <nav className="hero-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 font-medium">
        <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
          <div className="w-4 h-4 bg-white rounded-full flex-shrink-0" />
          <span className="hidden md:inline">CLIKZ WEDDING FILMS</span>
        </div>
        <div className="flex gap-6 text-xs uppercase tracking-widest">
          <a href="#" className="relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-accent hover:text-white/80 transition-colors">Home</a>
          <a href="#work" className="hover:text-white/80 transition-colors">Films</a>
          <a href="#services" className="hover:text-white/80 transition-colors">Packages</a>
          <a href="#about" className="hover:text-white/80 transition-colors">About</a>
          <a href="#contact" className="hover:text-white/80 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Cards */}
      {data.map((item, index) => (
        <div 
          key={index} 
          className={`card card-${index} absolute left-0 top-0 bg-center bg-cover`} 
          style={{ backgroundImage: `url(${item.image})` }} 
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Card Contents (Thumbnails) */}
      {data.map((item, index) => (
        <div key={index} className={`card-content card-content-${index} absolute left-0 top-0 pl-4 text-white/90`}>
          <div className="content-start w-[30px] h-[5px] rounded-full bg-white/90" />
          <div className="content-place mt-[6px] text-[13px] font-medium">{item.place}</div>
          <div className="content-title-1 font-semibold text-xl font-serif leading-tight">{item.title}</div>
          <div className="content-title-2 font-semibold text-xl font-serif leading-tight">{item.title2}</div>
        </div>
      ))}

      <DetailsBlock className="details-even" />
      <DetailsBlock className="details-odd" />

      {/* Pagination */}
      <div className="pagination absolute left-0 top-0 inline-flex items-center">
        <div className="arrow arrow-left z-[60] w-[50px] h-[50px] rounded-full border-2 border-white/30 grid place-items-center cursor-pointer hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 stroke-2 text-white/60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="arrow arrow-right z-[60] w-[50px] h-[50px] rounded-full border-2 border-white/30 grid place-items-center cursor-pointer hover:bg-white/10 transition-colors ml-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 stroke-2 text-white/60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        
        <div className="progress-sub-container ml-6 z-[60] w-[200px] md:w-[500px] h-[50px] flex items-center hidden sm:flex">
          <div className="progress-sub-background w-[200px] md:w-[500px] h-[3px] bg-white/20">
            <div className="progress-sub-foreground h-[3px] bg-accent" />
          </div>
        </div>
        
        <div className="slide-numbers hidden md:block ml-6">
          {data.map((_, index) => (
            <div key={index} className={`slide-item slide-item-${index}`}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="cover absolute left-0 top-0 w-[100vw] h-[100vh] bg-background z-[100]" />
    </div>
  );
}
