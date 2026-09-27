# Three / Lab

A Three.js playground built with Vite, React, TypeScript, React Three Fiber, and Drei.

## Development

Use Node.js 22.12+ (Node.js 24 recommended).

~~~sh
npm install
npm run dev
~~~

Open the local URL printed by Vite. Drag to orbit, scroll to zoom, and use the scene controls to change the material, toggle wireframe, or pause rotation.

## Commands

- npm run dev: starts the development server.
- npm run build: checks TypeScript and builds to dist/.
- npm run lint: runs Oxlint.
- npm run preview: serves the production build locally.

## Where to start

- src/App.tsx: 3D geometry, lights, camera, and controls.
- src/index.css: page layout and styling.
- public/: place local models and textures here.

No backend, external assets, or environment variables are required.

## Floor-plan page

Visit /floor-plan for the interactive reconstruction of the supplied 30 by 50 foot drawing. Switch between perspective and top views, select rooms, toggle labels and illustrative furniture, or adjust wall height. The original image is available in the reference dialog.

Edit src/FloorPlan.tsx to change room bounds, wall segments, or furniture. Coordinates use feet, with the rear at z=0 and entrance at z=50. This is an approximate concept model, not a construction drawing.

## Your measured house study

Visit /house-plan for the new sketch-based 2D and 3D Three.js views. Both modes share geometry in src/housePlanData.ts (units: feet).

Confirmed room sizes: bedrooms 10 x 10 each; kitchen 10 x 10; porch 10 x 10; hall 12 x 16; cow house 12 x 25; old room 10 x 10; middle old house 30 x 15.

The bungalow target is 1,100 sq ft including the porch. Its 22 x 50 footprint is an assumption, not a supplied outside measurement. A 264 sq ft unassigned area and provisional circulation reconcile the requested total with the specified rooms. Wall thickness, structural details, garden sizes, plot boundary, and exact openings still need measurements. Furniture is illustrative.

### Photo references and exterior

The Exterior mode uses the supplied street-level images for cream render, red bands and terrace parapets, metal rails, window grilles, sunshades, pipes, and raised garden beds. The reference gallery keeps the sketch and four original screenshots, including attribution. Heights, facade placements, roof forms on older structures, and vegetation remain illustrative; the aerial screenshot has not been georeferenced. Supplied floor dimensions and the provisional 1,100 sq ft envelope are unchanged.
