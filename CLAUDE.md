# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Riri Kitchen is a Vite + React single-page app that simulates a family food-ordering app inside a phone-shaped UI shell. It has two roles — "cook" (kitchen/admin) and "family" (customer) — sharing one codebase and one component tree. There is no backend: all state persists to the browser's `localStorage`.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no lint script, no test runner, and no test files in this repo.

## Architecture

**Almost the entire app lives in `src/App.jsx`** (~1800 lines, single default-exported component `RiriKitchen`). `src/main.jsx` just mounts it; `src/supabase.js` initializes a Supabase client but **it is not imported or used anywhere** — treat it as unwired scaffolding, not an active data layer.

### UI shell and flow

The app renders inside a fixed-size `.rk-phone` mockup. `stage` state drives a linear flow: `splash` → `intro` → `login` → `app`. Once in `app`, a bottom nav switches between `tab`s: `home`, `menu`, `order`, `profile`. The `profile` tab has its own sub-router via `profileSection` (`favorites`, `notifications`, `preferences`, `hearts`). A separate `adminOpen` boolean (not part of `tab`) swaps the whole screen to the "Manage Menu" admin view, reachable only from Profile.

All CSS is a single template-literal string (`STYLE`) injected via a `<style>` tag at render time — there are no separate CSS files or CSS-in-JS libraries. Class names follow an `rk-` prefix convention.

### Auth

Login is hardcoded credential matching against `CREDENTIALS = { cook, family }` (see top of `App.jsx`) — there is no real auth backend. `role` (`"cook"` or `"family"`) gates admin-only UI (menu management, order-queue view, banner editing, publishing notifications) throughout the component via simple conditionals like `role === "cook"`.

### Data model & persistence

Everything is kept in React state and mirrored to `localStorage` through the `storage` helper (`get`/`set` wrapping `localStorage` with try/catch). Keys in use: `rk-products`, `rk-orders`, `rk-avatar`, `rk-favorites`, `rk-notifications`, `rk-mealprefs`, `rk-banner`, `rk-cookhearts`. On mount, one `useEffect` batch-loads all of these in parallel and only shows real data once `dataLoaded` is true.

- **Products** (`products` state, seeded from `SEED_PRODUCTS`): dishes with `category`, `rating`, `heartPrice`, optional uploaded `image` (data URL) or fallback `emoji`. Managed via the admin panel (`draft` state + `rk-form-sheet` overlay for add/edit).
- **Cart** (`cart` state): `{ [productId]: { qty, prefs: { [prefName]: bool } } }`, built up on the Menu tab and checked out via the Payment overlay (`paymentOpen`).
- **Orders** (`orders` state): created in `confirmPayment`, each with a `status` that advances through `STATUS_STEPS = [Submitted, Preparing, Ready, Completed]` (or `Cancelled`). Cooks advance status from the Kitchen Orders view; family members see a stepper + history grid.
- **Hearts** (`cookHearts`): the in-app "currency" paid for orders (no real payment integration — the Payment overlay is explicitly a demo). Paid on checkout, refunded on cancellation.
- Images (avatar, banner, dish photos) are downscaled/compressed client-side via `compressImage()` (canvas-based JPEG re-encode) before being stored as base64 data URLs — this exists to keep `localStorage` under its quota; `persistProducts` also rejects saves whose serialized size exceeds 4MB.

### Known gotcha

`persistOrders()` (~App.jsx:726) writes serialized order data to the `rk-favorites` key instead of `rk-orders`, so orders do not actually survive a reload even though they're read from `rk-orders` on startup. Be aware of this mismatch if working on order persistence — don't assume the read and write paths agree just because both exist.

## Deployment

Deployed on Vercel; `vercel.json` rewrites all paths to `/` for client-side routing/SPA support (there's no router library — this is just for handling refreshes, since routing itself is all in-memory `tab`/`stage` state).
