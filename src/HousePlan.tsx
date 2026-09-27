import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html, Line, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { zones, walls, windows, doors, colors } from './housePlanData'
import './HousePlan.css'
import HouseExterior from './HouseExterior'

function Box({ x, z, w, d, h, y=0, color, transparent=false }: { x:number; z:number; w:number; d:number; h:number; y?:number; color:string; transparent?:boolean }) {
  return <mesh position={[x-41,y+h/2,z-28]} castShadow receiveShadow><boxGeometry args={[w,h,d]} /><meshStandardMaterial color={color} roughness={0.8} transparent={transparent} opacity={transparent ? 0.5 : 1} /></mesh>
}
function Segment({ points, h, y=0, color, thickness=0.32, transparent=false }: { points:number[]; h:number; y?:number; color:string; thickness?:number; transparent?:boolean }) {
  const [a,b,c,d]=points
  return <Box x={(a+c)/2} z={(b+d)/2} w={Math.abs(c-a)||thickness} d={Math.abs(d-b)||thickness} h={h} y={y} color={color} transparent={transparent} />
}
function Furniture() {
  return <group>
    {[[73,6],[61,24]].map(([x,z]) => <group key={z}><Box x={x} z={z} w={5.4} d={6.8} h={0.75} color="#967b60" /><Box x={x} z={z} w={5.2} d={6.6} h={0.5} y={0.75} color="#fcf6e8" /><Box x={x} z={z+1} w={5.25} d={4.3} h={0.12} y={1.25} color="#9ea992" /><Box x={x} z={z-3.2} w={5.4} d={0.3} h={2.1} color="#967b60" /></group>)}
    <Box x={57.4} z={5.5} w={2} d={8} h={2.3} color="#899781" /><Box x={61} z={2.3} w={7.2} d={2} h={2.3} color="#899781" />
    <Box x={61} z={2.3} w={7.3} d={2.1} h={0.15} y={2.3} color="#ece8dc" />
    <Box x={74.3} z={32} w={2.4} d={8} h={1.1} color="#b19c7e" /><Box x={75.4} z={32} w={0.4} d={8} h={2.1} color="#b19c7e" />
    <Box x={71.3} z={32} w={2} d={4} h={0.9} color="#886e50" />
    <Box x={76} z={17} w={1.2} d={1.6} h={1.1} color="#f9f9ed" />
    <Box x={75} z={13} w={2.6} d={1.8} h={0.45} color="#f2f7f1" />
    <Box x={6} z={24} w={2.5} d={20} h={1} color="#b0a28b" />
  </group>
}
function Camera({ flat, exterior=false }: { flat:boolean; exterior?:boolean }) {
  const { width,height }=useThree(s=>s.size)
  return <OrthographicCamera makeDefault position={flat ? [0,110,4.001] : exterior ? [85,65,85] : [62,90,95]} zoom={Math.min(width/(flat?94:110),height/(flat?84:93))} near={0.1} far={400} />
}
function Scene({ flat, labels, furniture, roof, height, selected, select }: { flat:boolean; labels:boolean; furniture:boolean; roof:boolean; height:number; selected:string|null; select:(id:string)=>void }) {
  const [ready,setReady]=useState(false)
  useEffect(()=>{const frame=requestAnimationFrame(()=>setReady(true));return()=>cancelAnimationFrame(frame)},[])
  const h=flat?0.14:height
  return <group>
    <Box x={44} z={30} w={80} d={60} h={0.35} y={-0.4} color="#dedbcf" />
    <Box x={2} z={53.5} w={4} d={13} h={0.35} y={-0.4} color="#dedbcf" />
    <Box x={67} z={26} w={22} d={50} h={0.08} color="#f3efe3" />
    {zones.map(zone=><group key={zone.id}>
      <mesh position={[zone.x+zone.w/2-41,0.1,zone.z+zone.d/2-28]} receiveShadow onClick={e=>{e.stopPropagation();select(zone.id)}}><boxGeometry args={[zone.w-0.05,0.12,zone.d-0.05]} /><meshStandardMaterial color={selected===zone.id?'#e3b76a':zone.id==='porch'?'#d5ccba':colors[zone.type]} /></mesh>
      {labels&&ready&&<Html center position={[zone.x+zone.w/2-41,flat?0.5:0.3,zone.z+zone.d/2-28]} zIndexRange={[20,0]}><button className={'hp-label '+(selected===zone.id?'selected':'')} onClick={()=>select(zone.id)}>{zone.name}{zone.measured&&<small>{zone.w} × {zone.d} ft</small>}</button></Html>}
    </group>)}
    <Box x={67} z={13.5} w={10} d={5} h={0.12} color={colors.utility} /><Box x={72} z={21} w={12} d={4} h={0.12} color={colors.utility} />
    {walls.map((wall,i)=><Segment key={i} points={wall} h={h} color={flat?'#49564a':'#f5f0e3'} />)}
    {windows.map((win,i)=><group key={i}>
      {!flat&&<><Segment points={win} h={Math.min(0.9,h)} color="#f5f0e3" /><Segment points={win} h={0.12} y={h} color="#728e90" thickness={0.4} /></>}
      <Segment points={win} h={flat?0.16:Math.max(0.1,h-0.9)} y={flat?0.02:0.9} color="#729b9f" thickness={0.17} transparent={!flat} />
    </group>)}
    {doors.map(([x,z,x2,z2],i)=>{
      const length=Math.hypot(x2-x,z2-z)
      const vertical=x===x2
      const arc=Array.from({length:17},(_,j)=>{const a=j/16*Math.PI/2;return [x-41+Math.cos(a)*length,0.27,z-28+Math.sin(a)*length] as [number,number,number]})
      return <group key={i}><Line points={[[x-41,0.27,z-28],[x-41+(vertical?length:0),0.27,z-28+(vertical?0:length)]]} color="#a9814d" lineWidth={1.5} /><Line points={arc} color="#b49b75" lineWidth={0.7} /></group>
    })}
    {Array.from({length:8},(_,i)=><Box key={i} x={56.5+i*0.65} z={13.5} w={0.6} d={2.6} h={flat?0.1:0.18+i*0.22} y={0.18} color={i%2?'#b9b6aa':'#d2d0c5'} />)}
    {!flat&&furniture&&<Furniture />}
    {!flat&&Array.from({length:9},(_,i)=><group key={i} position={[81.2-41,0,6+i*5.3-28]}><mesh position={[0,0.7,0]}><cylinderGeometry args={[0.13,0.18,1.4,8]} /><meshStandardMaterial color="#8e7955" /></mesh><mesh position={[0,2.1,0]} castShadow><sphereGeometry args={[1.25,12,10]} /><meshStandardMaterial color={i%2?'#819666':'#8ca470'} /></mesh></group>)}
    {!flat&&roof&&<><Box x={67} z={26} w={22.8} d={50.8} h={0.35} y={height+0.2} color="#b6a082" /><Box x={10} z={23.5} w={12.7} d={25.7} h={0.25} y={height+0.2} color="#a99d87" /><Box x={11} z={6} w={10.7} d={10.7} h={0.25} y={height+0.2} color="#a99d87" /><Box x={31} z={8.5} w={30.7} d={15.7} h={0.25} y={height+0.2} color="#a99d87" /></>}
    <Line points={[[4-41,0,1-28],[4-41,0,47-28],[-41,0,47-28],[-41,0,60-28],[43-41,0,60-28]]} color="#979e8d" lineWidth={2} />
    <Line points={[[49-41,0,60-28],[84-41,0,60-28],[84-41,0,-28],[46-41,0,-28]]} color="#979e8d" lineWidth={2} />
    {ready&&<><Html center position={[-1,0.3,2]} zIndexRange={[20,0]}><span className="hp-courtyard">OPEN COURTYARD</span></Html><Html center position={[5,0.3,34]} zIndexRange={[20,0]}><span className="hp-entry">↑ MAIN ENTRY</span></Html></>}
  </group>
}
const references = [
  { title: 'Layout sketch', src: '/house-sketch.png', caption: 'Your original layout drawing. Room dimensions were supplied separately.' },
  { title: 'Garden corner', src: '/house-reference-1.png', caption: 'Raised garden beds, flowering plants, and mature trees. User-supplied Street View screenshot; original attribution retained.' },
  { title: 'House exterior', src: '/house-reference-2.png', caption: 'Cream walls, red terrace parapets, railings, and courtyard context. User-supplied Street View screenshot.' },
  { title: 'Side elevation', src: '/house-reference-3.png', caption: 'Red facade bands, grilled windows, sunshade, and downpipes. Exterior heights and placements in the model are approximate.' },
  { title: 'Aerial context', src: '/house-reference-4.png', caption: 'General relationship of roofs and open courtyard. Image orientation and precise plot boundary have not been established.' },
]
function Sketch({close}:{close:()=>void}) {
  const ref=useRef<HTMLDialogElement>(null)
  const [active,setActive]=useState(0)
  useEffect(()=>{const d=ref.current;d?.showModal();return()=>d?.close()},[])
  const reference=references[active]
  return <dialog ref={ref} className="hp-dialog" onCancel={close} aria-label="House reference gallery">
    <div><h2>Your house references</h2><button autoFocus onClick={close} aria-label="Close references">×</button></div>
    <nav className="hp-reference-tabs" aria-label="Choose reference">{references.map((item,i)=><button key={item.src} aria-pressed={active===i} onClick={()=>setActive(i)}>{item.title}</button>)}</nav>
    <img src={reference.src} alt={reference.title + ': ' + reference.caption} />
    <p>{reference.caption}</p>
  </dialog>
}
export default function HousePlan() {
  const [mode,setMode]=useState<'2d'|'3d'|'exterior'>('exterior')
  const [labels,setLabels]=useState(true)
  const [furniture,setFurniture]=useState(true)
  const [roof,setRoof]=useState(false)
  const [height,setHeight]=useState(3)
  const [selected,setSelected]=useState<string|null>(null)
  const [reset,setReset]=useState(0)
  const [sketch,setSketch]=useState(false)
  const zone=zones.find(z=>z.id===selected)
  return <div className="hp-page">
    <header className="hp-header"><a href="/" className="hp-brand">THREE / LAB <span>RESIDENTIAL STUDIO</span></a><nav><a href="/floor-plan">Previous plan</a><button onClick={()=>setSketch(true)}>References · 5 ↗</button></nav></header>
    <div className="hp-layout">
      <aside className="hp-sidebar"><p className="hp-kicker">YOUR HOME, REIMAGINED</p><h1>One place.<br />Every perspective.</h1><p className="hp-intro">Your measured layout, now with a photo-inspired exterior and garden.</p>
        <div className="hp-status"><i /> CONCEPT 02 <span>SKETCH + PHOTOGRAPHS</span></div>
        <section><h2>Explore your plan</h2><div className="hp-modes"><button aria-pressed={mode==='2d'} onClick={()=>setMode('2d')}>▤ 2D plan</button><button aria-pressed={mode==='3d'} onClick={()=>setMode('3d')}>◇ Cutaway</button><button aria-pressed={mode === 'exterior'} onClick={()=>setMode('exterior')}>▧ Exterior</button></div>
          <label className={mode === 'exterior' ? 'muted' : ''}>Space labels<input disabled={mode === 'exterior'} type="checkbox" checked={labels} onChange={e=>setLabels(e.target.checked)} /></label>
          <label className={mode!=='3d'?'muted':''}>Furniture <input type="checkbox" disabled={mode!=='3d'} checked={furniture} onChange={e=>setFurniture(e.target.checked)} /></label>
          <label className={mode!=='3d'?'muted':''}>Show roofs<input type="checkbox" disabled={mode!=='3d'} checked={roof} onChange={e=>setRoof(e.target.checked)} /></label>
          <label htmlFor="hp-height" className={mode!=='3d'?'muted':''}>Wall display height<span>{height===3?'Cutaway':height>3?'Tall':'Low'}</span></label><input id="hp-height" aria-label="Wall display height" type="range" min="1" max="7" step="0.5" disabled={mode!=='3d'} value={height} onChange={e=>setHeight(Number(e.target.value))} />
        </section>
        <section><h2>Spaces <span>{zones.length}</span></h2><div className="hp-directory">{zones.map(z=><button key={z.id} aria-pressed={selected===z.id} onClick={()=>setSelected(z.id)}><i style={{background:colors[z.type]}} />{z.name}<span>↗</span></button>)}</div></section>
        <div className="hp-assumption"><strong>1,100 sq ft · assumed 22 × 50 ft</strong><p>Bedrooms, kitchen, porch, hall, cow house, and small old room use your dimensions. The bungalow includes the porch. The remaining area is provisional circulation and unassigned space. Middle old house: 30 × 15 ft (450 sq ft), confirmed.</p><p>Exterior colors, terrace edges, grilles, and raised beds follow your photos. Heights, older roof forms, planting, and exact facade positions are illustrative. The aerial photo is not a measured site survey.</p></div>
      </aside>
      <div className="hp-stage">
        <div className="hp-toolbar"><div><span className="hp-live" /> {mode==='2d'?'GROUND FLOOR / SITE PLAN':mode==='exterior'?'PHOTO STUDY / EXTERIOR':'SITE / CUTAWAY'}</div><button onClick={()=>setReset(v=>v+1)}>↻ Reset view</button></div>
        {mode === '2d' && <div className="hp-compass"><span>N</span><strong>↑</strong></div>}
        <Canvas shadows dpr={[1,2]} fallback={<p>WebGL is required to view the plan. The original sketch and room directory remain available.</p>}>
          <color attach="background" args={['#edece5']} /><ambientLight intensity={1.6} /><directionalLight position={[-25,65,35]} intensity={2.2} castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-65} shadow-camera-right={65} shadow-camera-top={65} shadow-camera-bottom={-65} shadow-normalBias={0.06} />
          <Camera exterior={mode === 'exterior'} key={mode+reset} flat={mode==='2d'} />
          {mode === 'exterior' ? <HouseExterior /> : <Scene flat={mode==='2d'} labels={labels && !(mode==='3d'&&roof)} furniture={furniture} roof={roof} height={height} selected={selected} select={setSelected} />}
          <OrbitControls key={mode+reset} makeDefault target={[0,0,4]} enableRotate={mode!=='2d'} minZoom={2} maxZoom={30} maxPolarAngle={Math.PI/2.1} />
        </Canvas>
        {zone&&<div className="hp-selection"><div><span>SELECTED SPACE</span><button onClick={()=>setSelected(null)} aria-label="Clear selection">×</button></div><h2>{zone.name}</h2><p>{zone.note}</p><small>{zone.measured ? zone.w + " × " + zone.d + " ft · " + (zone.w*zone.d) + " sq ft · supplied dimensions" : "Provisional geometry · confirm measurements"}</small></div>}
        {mode === 'exterior' ? <div className="hp-legend"><span><i style={{background:'#d8d0bc'}} />Cream render</span><span><i style={{background:'#a74e42'}} />Red trim</span><span><i style={{background:'#857964'}} />Raised stone beds</span><span>PHOTO-INSPIRED · HEIGHTS APPROXIMATE</span></div> : (<div className="hp-legend"><span><i style={{background:colors.home}} />Main house</span><span><i style={{background:colors.existing}} />Existing</span><span><i style={{background:colors.utility}} />Utility</span><span><i style={{background:colors.outdoor}} />Garden / outdoor</span><span><i style={{background:'#729b9f'}} />Window</span></div>)}
        <div className="hp-stage-footer"><span>{mode==='2d'?'Right-drag to pan':'Drag to orbit'} · Scroll to zoom {mode !== 'exterior' && '· Select a space'}</span><span>ROOMS IN FEET · SITE BOUNDARY ASSUMED</span></div>
      </div>
    </div>
    {sketch&&<Sketch close={()=>setSketch(false)} />}
  </div>
}





