import { Plate } from '../Plate';

const inputY = [60, 155, 250, 345, 440];
const hiddenY = [110, 205, 300, 395];
const outputY = [180, 320];

const INPUT_X = 60;
const HIDDEN_X = 400;
const OUTPUT_X = 740;

const inputEdges: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 2],
  [3, 3],
  [4, 3],
  [4, 2],
];

const outputEdges: [number, number][] = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [2, 0],
  [2, 1],
  [3, 1],
  [3, 0],
];

export function NeatFigure({ fig }: { fig: string }) {
  return (
    <Plate
      fig={fig}
      caption="Controller Topology"
      tag="NEAT"
      legend={['Sensor Inputs', 'Evolved Network', 'Control Outputs']}
      footLeft="Schematic — complexity grows over generations"
      footRight="Not to scale"
    >
      <svg
        className="plate__svg"
        viewBox="0 0 800 500"
        role="img"
        aria-label="Schematic of a NEAT controller: five sensor inputs connect to an evolved network of four hidden nodes, which connects to two control outputs."
      >
        <g className="plate__edges">
          {inputEdges.map(([from, to]) => (
            <line
              key={`i${from}-${to}`}
              x1={INPUT_X}
              y1={inputY[from]}
              x2={HIDDEN_X}
              y2={hiddenY[to]}
            />
          ))}
          {outputEdges.map(([from, to]) => (
            <line
              key={`o${from}-${to}`}
              x1={HIDDEN_X}
              y1={hiddenY[from]}
              x2={OUTPUT_X}
              y2={outputY[to]}
            />
          ))}
        </g>

        <g className="plate__nodes">
          {inputY.map((y, index) => (
            <g key={`in-${y}`}>
              <circle className="is-node" cx={INPUT_X} cy={y} r={9} />
              <text className="node-id" x={INPUT_X - 20} y={y + 5} textAnchor="end">
                {String(index + 1).padStart(2, '0')}
              </text>
            </g>
          ))}

          {hiddenY.map((y, index) => (
            <circle
              key={`hd-${y}`}
              className={index === 2 ? 'is-node is-accent' : 'is-node'}
              cx={HIDDEN_X}
              cy={y}
              r={6.5}
            />
          ))}

          {outputY.map((y, index) => (
            <g key={`out-${y}`}>
              <circle className="is-node" cx={OUTPUT_X} cy={y} r={9} />
              <text className="node-id" x={OUTPUT_X + 20} y={y + 5}>
                {String(index + 1).padStart(2, '0')}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </Plate>
  );
}
