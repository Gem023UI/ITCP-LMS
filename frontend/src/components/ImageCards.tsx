import Reveal from "./Reveal";
import type { CardImage } from "../data/cardImage";
import "./ImageCards.css";

export type ImageCardsProps = {
  /** [left, center, right] */
  images: readonly CardImage[];
};

const SLOTS = ["left", "center", "right"] as const;
const DELAYS = [200, 100, 300]; // center reveals first

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
            <div className="image-card" data-slot={slot}>
              <img src={image.src} alt={image.alt} draggable={false} />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}