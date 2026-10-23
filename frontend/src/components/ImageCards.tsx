import * as React from "react";
import Reveal from "./Reveal";
import { useCursorLight } from "./CursorLight";
import type { CardImage } from "../data/cardImage";
import "./MetallicBlue.css";
import "./ImageCards.css";

export type ImageCardsProps = {
  /** [left, center, right] */
  images: readonly CardImage[];
};

const SLOTS = ["left", "center", "right"] as const;
const DELAYS = [200, 100, 300];

function Card({ image, slot }: { image: CardImage; slot: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useCursorLight(ref);

  return (
    <div
      ref={ref}
      className="image-card metallic-blue-surface"
      data-slot={slot}
    >
      <img src={image.src} alt={image.alt} draggable={false} />
    </div>
  );
}

export default function ImageCards({ images }: ImageCardsProps) {
  return (
    <div className="image-cards" role="group" aria-label="Course gallery">
      {SLOTS.map((slot, i) => {
        const image = images[i];
        if (!image) return null;
        return (
          <Reveal
            key={slot}
            className="image-card-slot"
            data-slot={slot}
            delay={DELAYS[i]}
          >
            <Card image={image} slot={slot} />
          </Reveal>
        );
      })}
    </div>
  );
}