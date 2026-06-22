"use client";

import { useState } from "react";

const images = ["/klinder-1.webp", "/klinder-2.webp", "/klinder-3.webp"];

export default function KlinderCarousel() {
  const [active, setActive] = useState(0);

  const next = () => setActive((active + 1) % images.length);
  const prev = () => setActive((active - 1 + images.length) % images.length);

  return (
    <div className="carousel">
      <div className="carousel-stage">
        <button className="carousel-arrow carousel-arrow--left" onClick={prev} aria-label="Previous image">&lsaquo;</button>
        <div className="carousel-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="carousel-image"
            src={images[active]}
            alt={`Klinder screenshot ${active + 1}`}
          />
        </div>
        <button className="carousel-arrow carousel-arrow--right" onClick={next} aria-label="Next image">&rsaquo;</button>
      </div>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === active ? " carousel-dot--active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
