import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Mesh } from 'three'

function Sculpture({ color, spinning, wireframe }: { color: string; spinning: boolean; wireframe: boolean }) {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (mesh.current && spinning) {
      mesh.current.rotation.y += delta * 0.3
      mesh.current.rotation.x += delta * 0.12
    }
  })
  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.3, 160, 24]} />
      <meshStandardMaterial color={color} roughness={0.28} metalness={0.35} wireframe={wireframe} />
    </mesh>
  )
}

export default function App() {
  const [spinning, setSpinning] = useState(true)
  const [wireframe, setWireframe] = useState(false)
  const [color, setColor] = useState('#b6f36a')
  return (
    <main>
      <header><span className="brand">THREE / LAB</span><a className="badge" href="/floor-plan">Explore the 3D floor plan ↗</a></header>
      <section className="workspace">
        <div className="intro"><p className="eyebrow">PLAYGROUND 001</p><h1>A little space<br />to create.</h1><p>Your Three.js starter is ready.<br />Grab the scene. Make it yours.</p></div>
        <div className="scene" aria-label="Interactive 3D torus knot. Drag to rotate and scroll to zoom.">
          <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]} fallback={<p>Your browser needs WebGL to display this scene.</p>}>
            <ambientLight intensity={0.65} />
            <directionalLight position={[4, 5, 5]} intensity={3} />
            <directionalLight position={[-4, -2, 2]} intensity={1.5} color="#8caeff" />
            <Sculpture color={color} spinning={spinning} wireframe={wireframe} />
            <OrbitControls makeDefault enablePan={false} minDistance={3} maxDistance={10} />
          </Canvas>
        </div>
        <aside className="controls">
          <p className="eyebrow">SCENE CONTROLS</p>
          <label className="row">Material color<input aria-label="Material color" type="color" value={color} onChange={event => setColor(event.target.value)} /></label>
          <label className="row">Wireframe<input type="checkbox" checked={wireframe} onChange={event => setWireframe(event.target.checked)} /></label>
          <button onClick={() => setSpinning(value => !value)}>{spinning ? 'Pause rotation' : 'Resume rotation'}</button>
        </aside>
      </section>
      <footer><span>Drag to orbit · Scroll to zoom</span><span>React + TypeScript + Three.js</span></footer>
    </main>
  )
}

