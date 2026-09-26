import type { ReactNode } from 'react';

interface PlateProps {
  fig: string;
  caption: string;
  tag?: string;
  /* Exactly three labels — they sit under the left, centre and right of the drawing */
  legend: [string, string, string];
  footLeft: string;
  footRight?: string;
  children: ReactNode;
}

/*
  Figure chrome shared by every project plate: caption head, drawing canvas on
  a measured dot grid, three group labels, technical footnote.
*/
export function Plate({ fig, caption, tag, legend, footLeft, footRight, children }: PlateProps) {
  return (
    <figure className="plate">
      <figcaption className="plate__head">
        <span className="t-meta t-meta--primary">{`Fig. ${fig} — ${caption}`}</span>
        {tag && <span className="t-meta">{tag}</span>}
      </figcaption>

      <div className="plate__canvas">{children}</div>

      <div className="plate__legend">
        {legend.map((label) => (
          <span className="t-meta-small" key={label}>
            {label}
          </span>
        ))}
      </div>

      <div className="plate__foot">
        <span className="t-meta-small">{footLeft}</span>
        {footRight && <span className="t-meta-small">{footRight}</span>}
      </div>
    </figure>
  );
}
