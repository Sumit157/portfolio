const patterns = [
  // NEAT — evolving network topology
  (id: string) => (
    <g stroke="#d4a574" strokeWidth="1" fill="none">
      <circle cx="60" cy="60" r="4" fill="#d4a574" />
      <circle cx="140" cy="40" r="3" fill="#8a909b" />
      <circle cx="140" cy="90" r="3" fill="#8a909b" />
      <circle cx="140" cy="140" r="3" fill="#8a909b" />
      <circle cx="220" cy="65" r="4" fill="#d4a574" />
      <circle cx="220" cy="115" r="3" fill="#8a909b" />
      <line x1="60" y1="60" x2="140" y2="40" />
      <line x1="60" y1="60" x2="140" y2="90" />
      <line x1="60" y1="60" x2="140" y2="140" />
      <line x1="140" y1="40" x2="220" y2="65" />
      <line x1="140" y1="90" x2="220" y2="65" />
      <line x1="140" y1="90" x2="220" y2="115" />
      <line x1="140" y1="140" x2="220" y2="115" />
      <clipPath id={id}><rect width="280" height="180" /></clipPath>
    </g>
  ),
  // VeriFact — claim / verification signal
  () => (
    <g fill="none" stroke="#8a909b">
      <path d="M0 100 L60 100 L80 40 L110 160 L140 60 L160 100 L280 100" stroke="#d4a574" strokeWidth="1.5" />
      <line x1="0" y1="140" x2="280" y2="140" strokeDasharray="2 6" />
      <line x1="0" y1="60" x2="280" y2="60" strokeDasharray="2 6" />
    </g>
  ),
  // ExpenseIQ — bars / ledger
  () => (
    <g>
      {[40, 80, 55, 95, 65, 110, 50].map((h, i) => (
        <rect
          key={i}
          x={20 + i * 34}
          y={160 - h}
          width="18"
          height={h}
          fill={i === 5 ? '#d4a574' : '#23262b'}
        />
      ))}
      <line x1="0" y1="160" x2="280" y2="160" stroke="#34383f" />
    </g>
  ),
  // rPPG — waveform pulse
  () => (
    <g fill="none" stroke="#d4a574" strokeWidth="1.5">
      <path d="M0 90 L60 90 L75 40 L95 140 L115 60 L130 90 L280 90" />
      <circle cx="95" cy="140" r="3" fill="#d4a574" stroke="none" />
    </g>
  ),
]

export function ProjectVisual({ index }: { index: number }) {
  const pattern = patterns[index % patterns.length]
  const id = `clip-${index}`
  return (
    <svg viewBox="0 0 280 180" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {pattern(id)}
    </svg>
  )
}
