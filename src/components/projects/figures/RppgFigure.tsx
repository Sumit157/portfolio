import { Plate } from '../Plate';

const SAMPLE_X = [150, 210, 270];
const SAMPLE_Y = [195, 240, 285];

const PULSE =
  'M400,240 L440,240 L455,150 L475,300 L495,235 L515,245 L570,240 L585,240 L600,150 L620,300 L640,235 L660,245 L740,240';

const PEAKS: [number, number][] = [
  [455, 150],
  [600, 150],
];

export function RppgFigure({ fig }: { fig: string }) {
  return (
    <Plate
      fig={fig}
      caption="Pulse Trace"
      tag="rPPG"
      legend={['Video Frames', 'Green Channel ROI', 'Pulse Trace']}
      footLeft="Schematic — a face sampled across video frames"
      footRight="Not to scale"
    >
      <svg
        className="plate__svg"
        viewBox="0 0 800 500"
        role="img"
        aria-label="Schematic of rPPG sampling: a video frame with a region of interest holding nine sample points, feeding a repeating pulse waveform."
      >
        <rect x={60} y={100} width={300} height={280} />
        <rect className="is-dashed" x={110} y={155} width={200} height={170} />

        <text className="plate__label" x={114} y={146}>
          ROI
        </text>
        <text className="plate__label" x={64} y={126}>
          FRAME
        </text>

        {SAMPLE_Y.flatMap((cy) =>
          SAMPLE_X.map((cx) => <circle key={`s-${cx}-${cy}`} cx={cx} cy={cy} r={6} />)
        )}

        <line className="is-dashed" x1={360} y1={240} x2={400} y2={240} />

        <text className="plate__label" x={404} y={126}>
          PULSE TRACE
        </text>

        <path className="is-accent-stroke" d={PULSE} />

        {PEAKS.map(([cx, cy]) => (
          <circle key={`peak-${cx}`} cx={cx} cy={cy} r={6} />
        ))}
      </svg>
    </Plate>
  );
}
