import { Plate } from '../Plate';

const COLUMN_X = [460, 590, 720];
const ROW_Y = [150, 250, 350];
const NODE_R = 15;

const DIVIDER_X = [525, 655];

export function FilesystemFigure({ fig }: { fig: string }) {
  return (
    <Plate
      fig={fig}
      caption="Replication Map"
      tag="AWS"
      legend={['Client', 'Storage Nodes', 'Replicas']}
      footLeft="Schematic — one file, three copies"
      footRight="Not to scale"
    >
      <svg
        className="plate__svg"
        viewBox="0 0 800 500"
        role="img"
        aria-label="Schematic of a distributed file system: a client reaches a coordinator, which distributes data to nine storage nodes arranged in three replicated groups."
      >
        <defs>
          <marker
            id="fs-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path className="arrow-head" d="M0 0 L10 5 L0 10 z" />
          </marker>
        </defs>

        <rect x={50} y={215} width={130} height={70} />
        <text className="plate__label" x={115} y={256} textAnchor="middle">
          CLIENT
        </text>

        <line x1={180} y1={250} x2={250} y2={250} markerEnd="url(#fs-arrow)" />

        <circle className="is-accent" cx={275} cy={250} r={18} />
        <text className="plate__label" x={275} y={306} textAnchor="middle">
          COORDINATOR
        </text>

        <line x1={293} y1={240} x2={430} y2={155} markerEnd="url(#fs-arrow)" />
        <line x1={293} y1={250} x2={430} y2={250} markerEnd="url(#fs-arrow)" />
        <line x1={293} y1={260} x2={430} y2={345} markerEnd="url(#fs-arrow)" />

        {DIVIDER_X.map((x) => (
          <line key={`div-${x}`} className="is-dashed" x1={x} y1={80} x2={x} y2={420} />
        ))}

        {COLUMN_X.flatMap((cx) =>
          ROW_Y.map((cy) => <circle key={`n-${cx}-${cy}`} cx={cx} cy={cy} r={NODE_R} />)
        )}

        {ROW_Y.map((cy) => (
          <g key={`rep-${cy}`}>
            <line className="is-dashed" x1={478} y1={cy} x2={572} y2={cy} />
            <line className="is-dashed" x1={608} y1={cy} x2={702} y2={cy} />
          </g>
        ))}

        <text className="plate__label" x={740} y={70} textAnchor="end">
          REPLICA SET
        </text>

        {COLUMN_X.map((cx, i) => (
          <text
            key={`col-${cx}`}
            className="plate__label"
            x={cx}
            y={444}
            textAnchor="middle"
          >
            {String(i + 1).padStart(2, '0')}
          </text>
        ))}
      </svg>
    </Plate>
  );
}
