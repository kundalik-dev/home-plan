export type Zone = { id: string; name: string; x: number; z: number; w: number; d: number; type: 'home' | 'existing' | 'utility' | 'outdoor'; note: string; measured?: boolean }
export const zones: Zone[] = [
  { id: 'old-room', name: 'Old room', x: 6, z: 1, w: 10, d: 10, type: 'existing', measured:true, note: '10 × 10 ft, supplied by you.' },
  { id: 'old-house', name: 'Old house', x: 16, z: 1, w: 30, d: 15, type: 'existing', measured:true, note: '30 × 15 ft · 450 sq ft, confirmed by you for the middle old house (5 खण).' },
  { id: 'cow-house', name: 'Cow house', x: 4, z: 11, w: 12, d: 25, type: 'existing', measured:true, note: '12 × 25 ft · 300 sq ft, supplied by you.' },
  { id: 'kitchen', name: 'Kitchen', x: 56, z: 1, w: 10, d: 10, type: 'home', measured:true, note: '10 × 10 ft · 100 sq ft, supplied by you. North-facing kitchen beside Bedroom 01.' },
  { id: 'bed1', name: 'Bedroom 01', x: 68, z: 1, w: 10, d: 10, type: 'home', measured:true, note: '10 × 10 ft · 100 sq ft, supplied by you. North and east windows follow the sketch.' },
  { id: 'stairs', name: 'Stairs', x: 56, z: 11, w: 6, d: 5, type: 'utility', note: 'Provisional 6 × 5 ft stair zone. Flight, rise, and access need verification.' },
  { id: 'passage', name: 'Passage', x: 56, z: 16, w: 18, d: 3, type: 'utility', note: 'Provisional shared circulation through the main house.' },
  { id: 'bath', name: 'Bath', x: 72, z: 11, w: 6, d: 4, type: 'utility', note: 'Provisional 6 × 4 ft bathroom, positioned as in your sketch.' },
  { id: 'wc', name: 'WC', x: 74, z: 15, w: 4, d: 4, type: 'utility', note: 'Provisional 4 × 4 ft WC beside the bathroom.' },
  { id: 'bed2', name: 'Bedroom 02', x: 56, z: 19, w: 10, d: 10, type: 'home', measured:true, note: '10 × 10 ft · 100 sq ft, supplied by you. Located immediately above the porch.' },
  { id: 'hall', name: 'Hall', x: 66, z: 23, w: 12, d: 16, type: 'home', measured:true, note: '12 × 16 ft · 192 sq ft, supplied by you. Entered from the porch.' },
  { id: 'porch', name: 'Porch', x: 56, z: 29, w: 10, d: 10, type: 'outdoor', measured:true, note: '10 × 10 ft · 100 sq ft, supplied by you. Included in the 1,100 sq ft footprint for this draft.' },
  { id: 'reserve', name: 'Unassigned area', x: 56, z: 39, w: 22, d: 12, type: 'utility', note: '264 sq ft reserved within the assumed 22 × 50 ft bungalow footprint. No use assigned; this is extra space required by the 1,100 sq ft target and is not in the original sketch.' },
  { id: 'garden-east', name: 'East garden', x: 79, z: 2.5, w: 4.5, d: 56.5, type: 'outdoor', note: 'Garden placement follows the sketch; its dimensions and plot boundary are provisional.' },
  { id: 'garden-front', name: 'Front garden', x: 56, z: 53, w: 23, d: 6, type: 'outdoor', note: 'Southern garden connected to the eastern strip. Size is provisional.' },
]
export const colors = { home: '#e7dac1', existing: '#c9c3b6', utility: '#bfd4d2', outdoor: '#abc39a' }
// Units are feet. Specified rooms use supplied dimensions; all other geometry is provisional.
// Main bungalow envelope: x=56..78, z=1..51, or 22 × 50 = 1,100 sq ft including porch.
export const walls: number[][] = [
  [6,1,16,1],[6,1,6,11],[4,11,4,14],[4,32,4,36],[4,36,16,36],[16,11,16,36],[4,11,16,11],[16,1,16,8],[16,10,16,11],
  [16,1,46,1],[46,1,46,16],[16,16,41,16],[44,16,46,16],
  [56,1,70,1],[74,1,78,1],[56,1,56,5],[56,9,56,22],[56,25,56,29],[56,39,56,51],
  [78,1,78,4],[78,7,78,27],[78,34,78,51],[56,51,65,51],[69,51,78,51],
  [67,1,67,11],[56,11,63,11],[65.5,11,67,11],[69.5,11,78,11],
  [72,11,72,13],[72,15,78,15],[74,15,74,16],[74,18.5,74,19],
  [56,19,63,19],[65.5,19,66,19],[69,19,78,19],
  [66,19,66,31],[66,34,66,39],[56,29,59,29],[63,29,66,29],
]
export const windows = [[4,14,4,32],[70,1,74,1],[56,5,56,9],[78,4,78,7],[56,22,56,25],[78,27,78,34],[59,29,63,29]]
export const doors = [[16,8,16,10],[41,16,44,16],[63,11,65.5,11],[67,11,69.5,11],[72,13,72,15],[74,16,74,18.5],[63,19,65.5,19],[66,19,69,19],[66,31,66,34]]

