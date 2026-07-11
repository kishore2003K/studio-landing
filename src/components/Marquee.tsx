'use client';

export default function Marquee() {
  const items = [
    'Cinematic Films',
    'Love Stories',
    'Candid Moments',
    'Timeless Memories',
    'Pre-Wedding Shoots',
    'Drone Videography',
    'Destination Weddings',
    'Documentary Style',
  ];

  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-2xl md:text-4xl font-bold tracking-tighter text-muted-foreground/30 hover:text-foreground transition-colors duration-300 cursor-default"
          >
            {item}
            <span className="text-accent ml-8">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
