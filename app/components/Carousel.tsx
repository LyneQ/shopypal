"use client";

import React from "react";

type CarouselProps = {
  images: { src: string; alt?: string }[];
  className?: string;
};

export default function Carousel({ images, className }: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const count = images.length;

  React.useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  if (!count) {
    return (
      <div className={"w-full aspect-square flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 " + (className || "")}>
        <div className="text-5xl">🧸</div>
      </div>
    );
  }

  const go = (next: number) => {
    setIndex((prev) => {
      const n = ((prev + next) % count + count) % count;
      return n;
    });
  };

  const goTo = (i: number) => setIndex(i);

  return (
    <div className={"relative select-none " + (className || "")}>
      <div className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div
          className="relative w-full"
          style={{ aspectRatio: "1 / 1" }}
        >
          {/* Track */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="min-w-full h-full flex items-center justify-center bg-black/5 dark:bg-white/5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt || `Image ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Prev/Next buttons */}
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="absolute w-6 left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/80"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="absolute w-6 right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/80"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => goTo(i)}
              className={
                "h-2 w-2 rounded-full transition-colors " +
                (i === index ? "bg-black dark:bg-white" : "bg-black/30 dark:bg-white/30 hover:bg-black/60 dark:hover:bg-white/60")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
