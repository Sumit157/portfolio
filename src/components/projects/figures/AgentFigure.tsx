import { Plate } from '../Plate';

export function AgentFigure({ fig }: { fig: string }) {
  return (
    <Plate
      fig={fig}
      caption="Two Runtimes"
      tag="Ollama · Groq"
      legend={['Query', 'Local Runtime', 'Hosted API']}
      footLeft="Schematic — one task, two model runtimes"
      footRight="Not to scale"
    >
      <svg
        className="plate__svg"
        viewBox="0 0 800 500"
        role="img"
        aria-label="Schematic of a research agent: a query is dispatched to Ollama running locally and to Groq through its hosted API, each returning into a common output."
      >
        <defs>
          <marker
            id="agent-arrow"
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

        <rect x={40} y={215} width={140} height={70} />
        <text className="plate__label" x={110} y={256} textAnchor="middle">
          QUERY
        </text>

        <line x1={180} y1={240} x2={325} y2={155} markerEnd="url(#agent-arrow)" />
        <line x1={180} y1={260} x2={325} y2={350} markerEnd="url(#agent-arrow)" />

        <rect x={330} y={105} width={170} height={70} />
        <text className="plate__label" x={415} y={137} textAnchor="middle">
          OLLAMA
        </text>
        <text className="plate__label" x={415} y={164} textAnchor="middle">
          LOCAL
        </text>

        <rect x={330} y={325} width={170} height={70} />
        <text className="plate__label" x={415} y={357} textAnchor="middle">
          GROQ
        </text>
        <text className="plate__label" x={415} y={384} textAnchor="middle">
          HOSTED
        </text>

        <line x1={500} y1={140} x2={615} y2={240} markerEnd="url(#agent-arrow)" />
        <line x1={500} y1={360} x2={615} y2={260} markerEnd="url(#agent-arrow)" />

        <rect x={620} y={215} width={140} height={70} />
        <text className="plate__label" x={690} y={256} textAnchor="middle">
          OUTPUT
        </text>
      </svg>
    </Plate>
  );
}
