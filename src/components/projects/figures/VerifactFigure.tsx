import { Plate } from '../Plate';

const SIGNAL_POINTS =
  '60,300 130,300 165,150 205,355 245,235 300,300 370,300 415,145 460,345 505,215 555,300 620,300 670,155 715,300 740,300';

const PEAKS: [number, number][] = [
  [165, 150],
  [415, 145],
  [670, 155],
];

const CLAIM_SEGMENTS = [
  { x: 60, width: 110 },
  { x: 182, width: 70 },
  { x: 264, width: 130 },
  { x: 406, width: 60 },
  { x: 478, width: 90 },
];

export function VerifactFigure({ fig }: { fig: string }) {
  return (
    <Plate
      fig={fig}
      caption="Credibility Signal"
      tag="VeriFact AI"
      legend={['Claim', 'Credibility Signal', 'Threshold']}
      footLeft="Schematic — a claim read as a credibility signal"
      footRight="Not to scale"
    >
      <svg
        className="plate__svg"
        viewBox="0 0 800 500"
        role="img"
        aria-label="Schematic of fact verification: a segmented claim line above a signal trace that crosses a threshold three times, each crossing marked."
      >
        <text className="plate__label" x={60} y={56}>
          CLAIM
        </text>

        {CLAIM_SEGMENTS.map((segment) => (
          <rect
            key={`segment-${segment.x}`}
            className="is-fill"
            x={segment.x}
            y={72}
            width={segment.width}
            height={16}
          />
        ))}

        <line className="is-dashed" x1={60} y1={170} x2={740} y2={170} />
        <line className="is-dashed" x1={60} y1={330} x2={740} y2={330} />

        <text className="plate__label" x={66} y={160}>
          THRESHOLD
        </text>

        <polyline className="is-accent-stroke" points={SIGNAL_POINTS} />

        {PEAKS.map(([cx, cy]) => (
          <circle key={`peak-${cx}`} cx={cx} cy={cy} r={7} />
        ))}
      </svg>
    </Plate>
  );
}
