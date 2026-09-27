import { Line } from '@react-three/drei'

const CREAM = '#d8d0bc'
const RED = '#a74e42'
const STONE = '#857964'
function Block({x,z,w,d,h,y=0,color=CREAM}:{x:number;z:number;w:number;d:number;h:number;y?:number;color?:string}) {
  return <mesh position={[x-41,y+h/2,z-28]} castShadow receiveShadow><boxGeometry args={[w,h,d]}/><meshStandardMaterial color={color} roughness={0.92}/></mesh>
}
function Rail({x,z,length,along='x',y=11.8}:{x:number;z:number;length:number;along?:'x'|'z';y?:number}) {
  const n=Math.ceil(length/1.1)
  return <group>
    {[0,1.15].map(dy=><Block key={dy} x={x} z={z} w={along==='x'?length:0.09} d={along==='z'?length:0.09} h={0.08} y={y+dy} color="#434a45"/>)}
    {Array.from({length:n+1},(_,i)=>{const offset=-length/2+i*length/n;return <Block key={i} x={x+(along==='x'?offset:0)} z={z+(along==='z'?offset:0)} w={0.07} d={0.07} h={1.2} y={y} color="#434a45"/>})}
  </group>
}
function EastWindow({z,length,vent=false}:{z:number;length:number;vent?:boolean}) {
  const sill=vent?6.7:4
  const height=vent?1.3:3.3
  return <group>
    <Block x={78.34} z={z} w={0.16} d={length} h={height} y={sill} color="#344c48"/>
    <Block x={78.43} z={z} w={0.18} d={length+0.22} h={0.14} y={sill} color={RED}/>
    <Block x={78.43} z={z} w={0.18} d={length+0.22} h={0.14} y={sill+height} color={RED}/>
    {[-length/2,length/2].map(offset=><Block key={offset} x={78.43} z={z+offset} w={0.18} d={0.14} h={height} y={sill} color={RED}/>)}
    {Array.from({length:Math.ceil(length/0.45)},(_,i)=><Block key={i} x={78.5} z={z-length/2+0.2+i*0.45} w={0.06} d={0.05} h={height} y={sill} color="#222d2a"/>)}
    {[0.7,1.5,2.3].filter(v=>v<height).map(dy=><Block key={dy} x={78.52} z={z} w={0.05} d={length} h={0.05} y={sill+dy} color="#222d2a"/>)}
    {!vent&&<Block x={78.5} z={z} w={1.2} d={length+0.6} h={0.22} y={sill+height+0.3} color={RED}/>}
  </group>
}
function Tree({x,z,scale=1,flowers=false}:{x:number;z:number;scale?:number;flowers?:boolean}) {
  return <group position={[x-41,0,z-28]} scale={scale}>
    <mesh position={[0,2.6,0]} castShadow><cylinderGeometry args={[0.17,0.32,5.2,7]}/><meshStandardMaterial color="#78664d"/></mesh>
    {[[0,5.5,0],[1.2,4.6,0.5],[-1.1,4.8,0.4],[0,4.9,-1.2]].map(([a,b,c],i)=><mesh key={i} position={[a,b,c]} castShadow><icosahedronGeometry args={[i?1.8:2.1,1]}/><meshStandardMaterial color={i%2?'#6f824c':'#80905b'} roughness={1}/></mesh>)}
    {flowers&&[[1.3,5.4,1],[-1,5.7,0.7],[0.3,6.8,0.2],[-1.6,4.8,-0.3]].map(([a,b,c],i)=><mesh key={i} position={[a,b,c]}><sphereGeometry args={[0.12,6,5]}/><meshStandardMaterial color="#a74045"/></mesh>)}
  </group>
}
function PitchedRoof({x,z,w,d}:{x:number;z:number;w:number;d:number}) {
  return <group>
    {[-1,1].map(side=><mesh key={side} position={[x-41+side*w/4,8.1,z-28]} rotation={[0,0,side*-0.22]} castShadow><boxGeometry args={[w/2+0.6,0.25,d+1]}/><meshStandardMaterial color="#84624d" roughness={1}/></mesh>)}
  </group>
}

// Exterior heights and facade details are photo-inspired estimates, not surveyed measurements.
export default function HouseExterior() {
  return <group>
    <Block x={44} z={30} w={80} d={60} h={0.35} y={-0.4} color="#b8a78a"/>
    <Block x={2} z={53.5} w={4} d={13} h={0.35} y={-0.4} color="#b8a78a"/>
    <Block x={67} z={26} w={23} d={51} h={0.6} color="#9b9588"/>
    <Block x={67} z={26} w={22} d={50} h={0.15} y={0.6} color="#cfc7b5"/>
    {/* East wall: continuous render, with dark inset windows and photo-inspired red bands. */}
    <Block x={78} z={26} w={0.45} d={50} h={10}/>
    <Block x={67} z={1} w={22} d={0.45} h={10}/>
    <Block x={67} z={51} w={22} d={0.45} h={10}/>
    <Block x={56} z={15} w={0.45} d={28} h={10}/>
    <Block x={56} z={45} w={0.45} d={12} h={10}/>
    {/* Open porch faces the courtyard; its inner wall includes a dark entry door. */}
    <Block x={66} z={34} w={0.4} d={10} h={10}/>
    <Block x={65.76} z={32.5} w={0.1} d={3} h={7} y={0.7} color="#574c3e"/>
    {[29.3,38.7].map(z=><group key={z}><Block x={56.1} z={z} w={0.55} d={0.55} h={10}/><Block x={56.1} z={z} w={0.6} d={0.6} h={0.45} y={0.8} color={RED}/></group>)}
    {[1,51].map(z=><group key={z}><Block x={67} z={z} w={22.5} d={0.5} h={1.7} color="#999788"/><Block x={67} z={z} w={22.6} d={0.54} h={0.17} y={1.7} color={RED}/></group>)}
    <Block x={78.25} z={26} w={0.08} d={50} h={1.7} color="#999788"/>
    <Block x={78.28} z={26} w={0.08} d={50} h={0.17} y={1.7} color={RED}/>
    {[4,7.4].map(y=><Block key={y} x={78.25} z={26} w={0.08} d={50} h={0.055} y={y} color={RED}/>)}
    <EastWindow z={5.5} length={3}/><EastWindow z={30.5} length={6}/>
    <EastWindow z={13} length={1.2} vent/><EastWindow z={17} length={1.2} vent/>
    <Block x={72} z={0.74} w={4} d={0.09} h={3.3} y={4} color="#344c48"/>
    <Block x={72} z={0.5} w={4.5} d={0.8} h={0.2} y={7.5} color={RED}/>
    <Block x={55.75} z={7} w={0.1} d={4} h={3.3} y={4} color="#344c48"/>
    <Block x={55.75} z={23.5} w={0.1} d={3} h={3.3} y={4} color="#344c48"/>
    {/* Flat concrete terrace, red end parapets, metal railing. */}
    <Block x={67} z={26} w={23} d={51} h={0.4} y={10} color="#d4cbbb"/>
    {[1,51].map(z=><group key={z}><Block x={67} z={z} w={23} d={0.5} h={1.4} y={10.4} color={RED}/><Rail x={67} z={z} length={23}/></group>)}
    {[56,78].map(x=><Block key={x} x={x} z={26} w={0.4} d={50} h={1} y={10.4}/>)}
    {[20,22].map(z=><Block key={z} x={78.45} z={z} w={0.15} d={0.15} h={11.8} color="#bcb7a3"/>)}
    <Line points={[[78.32-41,7.6,30.5-28],[78.32-41,5.6,34.8-28],[78.32-41,3.3,30.5-28],[78.32-41,5.6,26.2-28],[78.32-41,7.6,30.5-28]]} color={RED} lineWidth={0.8}/>
    {[0,1,2].map(i=><Block key={i} x={54.6-i*0.6} z={34} w={0.7} d={8} h={0.6-i*0.18} color="#a29c8e"/>)}
    {/* Older structures retain the confirmed footprints. Roof form is illustrative. */}
    <Block x={11} z={6} w={10} d={10} h={7} color="#b9aa90"/>
    <Block x={31} z={8.5} w={30} d={15} h={7} color="#ad9b80"/>
    <Block x={42.5} z={16.06} w={3} d={0.1} h={5.6} color="#605342"/>
    <Block x={10} z={23.5} w={12} d={25} h={1.3} color="#9b8a6e"/>
    {[12,20,28,35].map(z=><group key={z}><Block x={4.3} z={z} w={0.4} d={0.4} h={7} color="#887459"/><Block x={15.7} z={z} w={0.4} d={0.4} h={7} color="#887459"/></group>)}
    <PitchedRoof x={11} z={6} w={10} d={10}/><PitchedRoof x={31} z={8.5} w={30} d={15}/><PitchedRoof x={10} z={23.5} w={12} d={25}/>
    {/* Raised L-shaped planting beds based on the street photos. */}
    <Block x={81.25} z={30.75} w={4.5} d={56.5} h={0.8} color="#8b795a"/>
    <Block x={67.5} z={56} w={23} d={6} h={0.8} color="#8b795a"/>
    {[79,83.5].map(x=><Block key={x} x={x} z={30.75} w={0.32} d={56.5} h={1.1} color={STONE}/>)}
    {[53,59].map(z=><Block key={z} x={67.5} z={z} w={23} d={0.32} h={1.1} color={STONE}/>)}
    <Block x={56} z={56} w={0.32} d={6} h={1.1} color={STONE}/>
    {[7,17,29,42,54].map((z,i)=><Tree key={z} x={81.3} z={z} scale={i%2?0.8:1.05} flowers={i%2===0}/>)}
    {[60,67,74].map((x,i)=><Tree key={x} x={x} z={56} scale={i===1?1.25:0.75} flowers/>)}
    <Tree x={10} z={44} scale={1.4}/><Tree x={37} z={4} scale={0.7}/>
    {Array.from({length:18},(_,i)=><mesh key={i} position={[57+i*1.15-41,1.1,54.2+(i%3)*0.6-28]} castShadow><sphereGeometry args={[0.35,7,5]}/><meshStandardMaterial color={i%3===0?'#a87391':'#859356'}/></mesh>)}
  </group>
}

