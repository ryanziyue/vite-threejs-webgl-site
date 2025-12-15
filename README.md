# Ryan Cheng — 3D Portfolio Website (Open Source)

I built this WebGL site in high school as my capstone. It looks great, but the heavy 3D render isn’t ideal for quick recruiter drive‑bys. So it’s no longer my active portfolio — I’ve open‑sourced it as a creative/technical showcase others can learn from and remix.

## Tech Stack

- **Build:** Vite + TypeScript
- **3D:** Three.js (custom `Experience`/`Renderer`, DRACO assets)
- **Animation:** GSAP, Lenis
- **Modeling:** Blender
- **Hosting:** Vercel (Node.js ≥ 18)

## Run Locally

Prereqs: Node 18+. Assets live in `public/` (including `draco/` and `models/`).

```bash
npm install
npm run dev      # start Vite dev server
npm run build    # production build to dist/
npm run preview  # local preview of dist/
```