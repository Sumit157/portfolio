import { Plate } from '../Plate';

const LEDGER_LEFT = 60;
const LEDGER_RIGHT = 380;
const ROW_TOP = 96;
const ROW_PITCH = 46;
const ROWS = 7;

const BAR_LEFT = 430;
const BASELINE_Y = 400;
const BAR_WIDTH = 30;
const BAR_PITCH = 44;
const BAR_HEIGHTS = [110, 165, 95, 190, 145, 215, 120];
const ACCENT_BAR = 5;

export function ExpenseFigure({ fig }: { fig: string }) {
  return (
    <Plate
      fig={fig}
      caption="Ledger & Spend"
      tag="ExpenseIQ V2"
      legend={['Entries', 'Totals', 'Reference']}
      footLeft="Schematic — entries rolled into totals"
      footRight="Values illustrative"
    >
      <svg
        className="plate__svg"
        viewBox="0 0 800 500"
        role="img"
        aria-label="Schematic of an expense tracker: a ruled ledger of entries on the left, monthly spend bars with a reference baseline on the right."
      >
        <text className="plate__label" x={LEDGER_LEFT} y={62}>
          LEDGER
        </text>
        <text className="plate__label" x={BAR_LEFT} y={62}>
          SPEND
        </text>

        <line x1={400} y1={60} x2={400} y2={440} />

        {Array.from({ length: ROWS }, (_, i) => {
          const y = ROW_TOP + i * ROW_PITCH;
          const isMarked = i === 4;

          return (
            <g key={`row-${i}`}>
              <line x1={LEDGER_LEFT} y1={y - 20} x2={LEDGER_RIGHT} y2={y - 20} />
              <rect className="is-fill" x={LEDGER_LEFT} y={y - 7} width={88} height={10} />
              <rect
                className={isMarked ? 'is-accent' : 'is-fill'}
                x={LEDGER_RIGHT - 72}
                y={y - 7}
                width={72}
                height={10}
              />
            </g>
          );
        })}

        <line x1={LEDGER_LEFT} y1={392} x2={LEDGER_RIGHT} y2={392} />

        <line className="is-dashed" x1={BAR_LEFT} y1={270} x2={740} y2={270} />

        {BAR_HEIGHTS.map((height, i) => (
          <rect
            key={`bar-${i}`}
            className={i === ACCENT_BAR ? 'is-accent' : 'is-fill'}
            x={BAR_LEFT + i * BAR_PITCH}
            y={BASELINE_Y - height}
            width={BAR_WIDTH}
            height={height}
          />
        ))}

        <line x1={BAR_LEFT} y1={BASELINE_Y} x2={740} y2={BASELINE_Y} />

        {BAR_HEIGHTS.map((_, i) => (
          <text
            key={`tick-${i}`}
            className="plate__label"
            x={BAR_LEFT + i * BAR_PITCH + BAR_WIDTH / 2}
            y={BASELINE_Y + 26}
            textAnchor="middle"
          >
            {String(i + 1).padStart(2, '0')}
          </text>
        ))}
      </svg>
    </Plate>
  );
}
