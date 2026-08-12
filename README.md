# Riri Kitchen

Vite + React version prepared for Vercel deployment.

## Deploy
1. Upload this folder/ZIP to Vercel or import the project into GitHub.
2. Vercel should detect Vite automatically.
3. Build command: `npm run build`
4. Output directory: `dist`

The original `window.storage` calls were replaced with browser `localStorage` so the app can run on a normal Vercel-hosted site.
