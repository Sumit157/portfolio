import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const nodes = [
  { x: 620, y: 90, r: 3.5 },
  { x: 760, y: 210, r: 2.5 },
  { x: 540, y: 260, r: 5 },
  { x: 860, y: 130, r: 3 },
  { x: 700, y: 360, r: 3.5 },
  { x: 900, y: 320, r: 2.5 },
  { x: 480, y: 420, r: 3 },
  { x: 820, y: 440, r: 4 },
]

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 7],
  [4, 7],
]

export function HeroVisual() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const svg = svgRef.current
      if (!svg) return

      const paths = svg.querySelectorAll<SVGLineElement>('[data-edge]')
      const dots = svg.querySelectorAll<SVGCircleElement>('[data-node]')

      paths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      })

      const tl = gsap.timeline({ delay: 0.5 })
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        stagger: 0.06,
        ease: 'power2.inOut',
      }).fromTo(
        dots,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(2)' },
        '-=1.2'
      )

      if (!reducedMotion) {
        dots.forEach((dot, i) => {
          gsap.to(dot, {
            opacity: 0.35,
            duration: 1.8 + (i % 3) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.25,
          })
        })
      }
    },
    { scope: svgRef, dependencies: [reducedMotion] }
  )

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 960 520"
      className="absolute inset-0 h-full w-full opacity-70"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          data-edge
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#34383f"
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} data-node cx={n.x} cy={n.y} r={n.r} fill="#d4a574" />
      ))}
    </svg>
  )
}
