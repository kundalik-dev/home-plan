import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, OrbitControls, OrthographicCamera, Grid } from '@react-three/drei'
import './FloorPlan.css'

type Room = { id: string; name: string; size: string; x: number; z: number; w: number; d: number; color: string }
const rooms: Room[] = [
  { id: 'rear-wc', name: 'Rear toilet', size: "7′6″ × 4′7″", x: 0, z: 0, w: 8, d: 5.5, color: '#a7c4c0' },
  { id: 'open', name: 'Open terrace', size: "21′0″ × 4′7″", x: 8, z: 0, w: 22, d: 5.5, color: '#b4c7ad' },
  { id: 'bed1', name: 'Bedroom 01', size: "14′0″ × 12′0″", x: 0, z: 5.5, w: 15, d: 12.5, color: '#d6bd9e' },
  { id: 'bed2', name: 'Bedroom 02', size: "13′9″ × 12′0″", x: 15, z: 5.5, w: 15, d: 12.5, color: '#d6bd9e' },
  { id: 'toilet', name: 'Toilet', size: "5′10″ × 7′6″", x: 0, z: 18, w: 7, d: 8, color: '#a7c4c0' },
  { id: 'hall', name: 'Hall', size: "22′3″ × 12′0″", x: 7, z: 18, w: 23, d: 13, color: '#e4d6bc' },
  { id: 'wash', name: 'Wash', size: "6′3″ × 9′6″", x: 0, z: 26, w: 7, d: 10, color: '#a7c4c0' },
  { id: 'store', name: 'Store', size: "6′3″ × 5′3″", x: 0, z: 36, w: 7, d: 6, color: '#bfc7b5' },
  { id: 'kitchen', name: 'Kitchen', size: "10′6″ × 10′3″", x: 7, z: 31, w: 11, d: 11, color: '#c5c9ad' },
  { id: 'entry', name: 'Entry', size: 'Hall access', x: 18, z: 31, w: 6.5, d: 5, color: '#e4d6bc' },
  { id: 'puja', name: 'Puja', size: "4′6″ × 4′4″", x: 24.5, z: 31, w: 5.5, d: 5, color: '#d8bfa3' },
  { id: 'porch', name: 'Porch', size: "11′0″ wide", x: 18, z: 36, w: 12, d: 14, color: '#bcc9b3' },
]
// Coordinates in feet, traced from the drawing; gaps represent doorways.
const walls: [number, number, number, number][] = [
  [0,0,30,0], [0,0,0,42], [30,0,30,50], [0,42,18,42], [18,42,18,50],
  [8,0,8,3], [8,5,8,5.5], [0,5.5,15,5.5], [15,5.5,17.5,5.5], [21,5.5,30,5.5],
  [15,5.5,15,18], [0,18,11,18], [14.5,18,15,18], [18.5,18,30,18],
  [7,18,7,31], [0,26,3.5,26], [6.5,26,7,26], [0,36,7,36],
  [7,31,7,33], [7,39,7,42], [7,31,13.5,31], [17,31,18,31],
  [18,31,18,42], [21.5,31,30,31], [24.5,31,24.5,33], [24.5,35.5,24.5,36],
  [21.5,36,30,36],
]
function Block({ x, z, w, d, h, y = 0, color }: { x: number; z: number; w: number; d: number; h: number; y?: number; color: string }) {
  return <mesh castShadow receiveShadow position={[x - 15, y + h / 2, z - 25]}><boxGeometry args={[w, h, d]} /><meshStandardMaterial color={color} roughness={0.85} /></mesh>
}
function Furniture() {
  return <group>
    {[4.4, 23.8].map(x => <group key={x}>
      <Block x={x} z={10.5} w={5.5} d={7} h={0.8} color="#917259" />
      <Block x={x} z={10.5} w={5.3} d={6.8} h={0.55} y={0.8} color="#f5eee0" />
      <Block x={x} z={11.7} w={5.35} d={4.3} h={0.15} y={1.35} color="#829d90" />
      <Block x={x} z={7.5} w={5.5} d={0.3} h={2.4} color="#917259" />
      {[x-1.4,x+1.4].map(px => <Block key={px} x={px} z={8} w={2.2} d={1.3} h={0.22} y={1.35} color="#fffaf0" />)}
    </group>)}
    <Block x={27.8} z={24} w={3} d={8} h={1.2} color="#a7b299" />
    <Block x={29} z={24} w={0.6} d={8} h={2.4} color="#87977b" />
    <Block x={23.7} z={24} w={2.4} d={4.5} h={1.1} color="#a88864" />
    <Block x={8.5} z={24} w={1} d={6} h={1.5} color="#a88864" />
    <Block x={12} z={40.5} w={9.5} d={2} h={2.5} color="#8b9b82" />
    <Block x={8.5} z={37.5} w={2} d={5} h={2.5} color="#8b9b82" />
    <Block x={12} z={40.5} w={9.6} d={2.1} h={0.15} y={2.5} color="#f5eee0" />
    <Block x={15} z={40.5} w={2.3} d={1.5} h={0.1} y={2.65} color="#393f3b" />
    {[2.5,4.8].map(x => <Block key={x} x={x} z={40.7} w={1.8} d={1.4} h={3} color="#b69b78" />)}
    {[2.5, 3].map((x,i) => <group key={i}><Block x={x} z={i ? 20 : 2} w={1.7} d={2.3} h={1.4} color="#f8f6ec" /><Block x={x} z={i ? 19 : 1} w={1.8} d={0.6} h={2} color="#f8f6ec" /></group>)}
    <Block x={27.5} z={33.2} w={3} d={2} h={1.6} color="#b59261" />
    <Block x={3.5} z={28} w={3} d={2} h={2} color="#ecefe9" />
  </group>
}
function Model({ selected, onSelect, labels, furniture, wallHeight }: { selected: string | null; onSelect: (id: string) => void; labels: boolean; furniture: boolean; wallHeight: number }) {
  const [overlaysReady, setOverlaysReady] = useState(false)
  useEffect(() => {
    // Mount DOM overlays after Canvas has committed its host container.
    const frame = requestAnimationFrame(() => setOverlaysReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])
  return <group>
    <Block x={15} z={25} w={30.8} d={50.8} h={0.7} y={-0.8} color="#a9ac9e" />
    {rooms.map(room => <group key={room.id}>
      <mesh receiveShadow position={[room.x + room.w/2-15, 0, room.z+room.d/2-25]} onClick={event => { event.stopPropagation(); onSelect(room.id) }}>
        <boxGeometry args={[room.w-0.08, 0.16, room.d-0.08]} />
        <meshStandardMaterial color={selected === room.id ? '#d9ad61' : room.color} />
      </mesh>
      {labels && overlaysReady && <Html center position={[room.x+room.w/2-15, 0.3, room.z+room.d/2-25]} zIndexRange={[20,0]}><button className={'room-tag ' + (selected === room.id ? 'active' : '')} onClick={() => onSelect(room.id)}>{room.name}</button></Html>}
    </group>)}
    {walls.map(([x1,z1,x2,z2], i) => <Block key={i} x={(x1+x2)/2} z={(z1+z2)/2} w={Math.abs(x2-x1) || 0.4} d={Math.abs(z2-z1) || 0.4} h={wallHeight} color="#f5f0e4" />)}
    <Block x={15} z={0} w={30} d={0.43} h={0.12} y={wallHeight} color="#c9c1ad" />
    {[0,1,2,3].map(i => <Block key={i} x={10} z={43+i*1.65} w={14} d={1.65} h={0.8-i*0.17} y={-0.1} color="#d4d0c3" />)}
    {furniture && <Furniture />}
    <Html center position={[0, 0, -28]}><span className="dimension">30′ · REAR</span></Html>
    <Html center position={[19, 0, 0]}><span className="dimension">50′</span></Html>
    <Html center position={[0, 0, 29]}><span className="dimension">FRONT / ENTRANCE</span></Html>
  </group>
}

function PlanCamera({ view }: { view: '3d' | 'top' }) {
  const { width, height } = useThree(state => state.size)
  const zoom = view === 'top' ? Math.min(width / 40, height / 65) : Math.min(width / 57, height / 60)
  return <OrthographicCamera makeDefault position={view === 'top' ? [0, 85, 0.01] : [48, 62, 68]} zoom={zoom} near={0.1} far={300} />
}
export default function FloorPlan() {
  const [view, setView] = useState<'3d' | 'top'>('3d')
  const [labels, setLabels] = useState(true)
  const [furniture, setFurniture] = useState(true)
  const [wallHeight, setWallHeight] = useState(3)
  const [selected, setSelected] = useState<string | null>(null)
  const [reset, setReset] = useState(0)
  const [reference, setReference] = useState(false)
  const room = rooms.find(item => item.id === selected)
  return <div className="plan-page">
    <header className="plan-header"><a href="/" className="plan-brand">THREE / LAB <span>/ SPACES</span></a><span className="plan-project">RESIDENCE 001 <i /> FLOOR PLAN STUDY</span><a href="/house-plan">Your house sketch →</a></header>
    <div className="plan-layout">
      <aside className="plan-sidebar">
        <p className="plan-kicker">FROM DRAWING TO DIMENSION</p><h1>A home,<br />in perspective.</h1><p className="plan-description">Explore your floor plan as an interactive architectural model.</p>
        <div className="plan-stats"><div><strong>30 × 50</strong><span>FOOTPRINT · FT</span></div><div><strong>02</strong><span>BEDROOMS</span></div></div>
        <div className="plan-section"><h2>Explore the space</h2><div className="view-switch"><button aria-pressed={view === '3d'} onClick={() => setView('3d')}>3D perspective</button><button aria-pressed={view === 'top'} onClick={() => setView('top')}>Top view</button></div>
          <label className="plan-toggle">Room labels<input type="checkbox" checked={labels} onChange={e => setLabels(e.target.checked)} /></label>
          <label className="plan-toggle">Furniture<input type="checkbox" checked={furniture} onChange={e => setFurniture(e.target.checked)} /></label>
          <label className="height-label" htmlFor="wall-height">Wall height <span>{wallHeight} ft</span></label><input id="wall-height" type="range" min="0.5" max="9" step="0.5" value={wallHeight} onChange={e => setWallHeight(Number(e.target.value))} />
        </div>
        <div className="plan-section"><h2>Room directory <span>{rooms.length}</span></h2><div className="room-directory">{rooms.map(item => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><i style={{ background: item.color }} />{item.name}<span>↗</span></button>)}</div></div>
        <button className="reference-button" onClick={() => setReference(true)}>View original drawing ↗</button>
        <p className="plan-note">Concept model traced from your image. Dimensions and openings are approximate; furniture is illustrative.</p>
      </aside>
      <section className="plan-viewport" aria-label="Interactive 3D floor plan">
        <div className="viewport-heading"><span><i /> {view === '3d' ? 'PERSPECTIVE' : 'PLAN VIEW'}</span><button onClick={() => { setView('3d'); setReset(value => value+1) }}>↻ Reset view</button></div>
        <Canvas shadows dpr={[1, 2]} fallback={<p className="webgl-fallback">WebGL is required to display the model. You can still explore the room directory and original drawing.</p>}>
          <color attach="background" args={['#e9ebe4']} />
          <PlanCamera key={view+reset} view={view} />
          <ambientLight intensity={1.4} />
          <directionalLight castShadow position={[15, 45, 20]} intensity={2.4} shadow-mapSize={[2048,2048]} shadow-camera-left={-45} shadow-camera-right={45} shadow-camera-top={45} shadow-camera-bottom={-45} shadow-normalBias={0.04} />
          <Model selected={selected} onSelect={setSelected} labels={labels} furniture={furniture} wallHeight={wallHeight} />
          <Grid position={[0,-0.85,0]} args={[180,180]} cellSize={5} sectionSize={25} cellColor="#ccd0c4" sectionColor="#bec4b7" fadeDistance={140} cellThickness={0.5} sectionThickness={0.7} />
          <OrbitControls key={view+reset} makeDefault target={[0,0,0]} enableRotate={view === '3d'} minZoom={2} maxZoom={28} maxPolarAngle={Math.PI/2.1} />
        </Canvas>
        {room && <div className="room-detail"><div><span>SELECTED SPACE</span><strong>{room.name}</strong><p>{room.size}</p></div><button aria-label="Clear room selection" onClick={() => setSelected(null)}>×</button></div>}
        <div className="viewport-footer"><span>↔ Drag to {view === '3d' ? 'orbit' : 'pan'} <b>·</b> Scroll to zoom <b>·</b> Click a room to explore</span><span>1,500 SQ FT · SINGLE LEVEL</span></div>
      </section>
    </div>
    {reference && <ReferenceDialog onClose={() => setReference(false)} />}
  </div>
}


function ReferenceDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { const element = dialog.current; element?.showModal(); return () => element?.close() }, [])
  return <dialog ref={dialog} className="reference-dialog" aria-label="Original floor plan" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div><h2>Original floor plan</h2><button autoFocus aria-label="Close original drawing" onClick={onClose}>×</button></div>
    <img src="/floor-plan-reference.png" alt="Original 30 by 50 foot floor plan with two bedrooms, hall, kitchen, utility rooms, and porch" />
    <p>Reference drawing supplied by you</p>
  </dialog>
}



