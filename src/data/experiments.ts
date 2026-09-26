export interface Experiment {
  id: string;
  title: string;
  description: string;
  category: 'experiment' | 'prototype' | 'research' | 'tool';
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
  status: 'active' | 'completed' | 'archived';
  date: string;
}

export const experiments: Experiment[] = [
  {
    id: 'webgpu-particle-system',
    title: 'WebGPU Particle System',
    description: '1M+ particle simulation running entirely on GPU with compute shaders. Explores spatial hashing for neighbor queries.',
    category: 'experiment',
    technologies: ['WebGPU', 'WGSL', 'TypeScript'],
    link: '/lab/webgpu-particles',
    github: 'https://github.com/sumitbabar/webgpu-particles',
    status: 'active',
    date: '2025-01',
  },
  {
    id: 'wasm-physics-engine',
    title: 'WASM Physics Engine',
    description: 'Rigid body physics compiled to WebAssembly. 10k bodies at 60fps. Integrates with Three.js for rendering.',
    category: 'prototype',
    technologies: ['Rust', 'WebAssembly', 'Three.js'],
    link: '/lab/wasm-physics',
    github: 'https://github.com/sumitbabar/wasm-physics',
    status: 'completed',
    date: '2024-11',
  },
  {
    id: 'code-visualization-research',
    title: 'Code Structure Visualization',
    description: 'Research on representing codebases as navigable 3D structures. AST parsing, force-directed layouts, semantic clustering.',
    category: 'research',
    technologies: ['TypeScript', 'WebGL', 'Tree-sitter'],
    github: 'https://github.com/sumitbabar/code-viz-research',
    status: 'active',
    date: '2024-09',
  },
  {
    id: 'cli-dashboard-generator',
    title: 'CLI Dashboard Generator',
    description: 'Tool that generates terminal-based dashboards from JSON config. Live data via WebSocket, vim-style keybindings.',
    category: 'tool',
    technologies: ['Go', 'Bubble Tea', 'WebSocket'],
    link: '/lab/cli-dashboard',
    github: 'https://github.com/sumitbabar/cli-dashboard',
    status: 'completed',
    date: '2024-07',
  },
  {
    id: 'distributed-tracing-viz',
    title: 'Distributed Tracing Visualizer',
    description: 'Flame graph + service map hybrid for OpenTelemetry traces. Time-travel debugging, critical path highlighting.',
    category: 'prototype',
    technologies: ['React', 'D3.js', 'OpenTelemetry'],
    link: '/lab/trace-viz',
    github: 'https://github.com/sumitbabar/trace-viz',
    status: 'archived',
    date: '2024-05',
  },
  {
    id: 'shader-live-editor',
    title: 'Shader Live Editor',
    description: 'Browser-based GLSL/WGSL editor with hot reload, error overlay, and uniform controls. Exports to Three.js/Raw WebGL.',
    category: 'tool',
    technologies: ['TypeScript', 'CodeMirror', 'WebGL'],
    link: '/lab/shader-editor',
    github: 'https://github.com/sumitbabar/shader-editor',
    status: 'active',
    date: '2024-03',
  },
];