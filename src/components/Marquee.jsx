import { MazeGlyph } from "./MazeRing";

const ITEMS = ["A Symphony of Scents", "Perfumery", "Sphere & Cube", "4ourgarden"];

function Chunk({ hidden }) {
  return (
    <div className="marquee-chunk" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}>
          {item}
          <MazeGlyph className="glyph" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        <Chunk />
        <Chunk hidden />
      </div>
    </div>
  );
}
