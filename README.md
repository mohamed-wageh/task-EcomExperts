# Wyze Security Bundle Builder

This is a multi-step bundle builder prototype built with React and Vite. It serves as a fully functional frontend architecture demonstration, complete with state management, an Express backend API, custom design tokens, and a responsive layout.

## Features

- **Express.js API Backend**: The product data is served via a local Node.js/Express API (`GET /api/steps`).
- **Complex State Management**: A custom React Context + `useReducer` handles the multi-step configuration logic, variant selection, and synchronized quantity steppers.
- **Persistence**: Configuration state is saved to `localStorage` so users don't lose their progress.
- **Pixel-Perfect UI**: Built to match the provided Figma designs exactly, utilizing a custom CSS variables design system with the Gilroy font family.
- **Smooth Animations**: Uses native CSS grid transitions for buttery smooth accordion expand/collapse interactions, plus tactile hover states.
- **Responsive Layout**: Adopts a mobile-first CSS approach, adapting from a single-column stacked view on mobile to a sticky two-column layout on desktop.
- **Unit Testing**: Core state calculations and reducer logic are covered by Vitest.

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Express.js
- **Styling**: Vanilla CSS (Custom Properties / Design Tokens)
- **Testing**: Vitest, React Testing Library

## How to Run

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start both the Express API and Vite dev server simultaneously:
   ```bash
   npm run dev
   ```

4. The API will run on `http://localhost:3001` and the React app will run on `http://localhost:5173`.

## Architecture Decisions

### 1. State Management (`BundleContext`)
I chose a Context + `useReducer` approach instead of Redux or Zustand because the state here is highly cohesive to the bundle builder flow. The reducer handles all complex interactions (incrementing/decrementing variants, changing active steps) while keeping the UI components completely stateless and presentation-focused.

### 2. Styling Strategy
Instead of reaching for Tailwind or styled-components, I built a modular Vanilla CSS system. `index.css` acts as the single source of truth for design tokens (colors, spacing, typography), which allowed me to easily map the exact colors and values from the Figma spec into reusable CSS variables.

### 3. Backend Integration
To demonstrate full-stack capabilities, I moved the static product data out of the React app and into an Express API endpoint. The React app fetches this data on mount, parsing the initial structure into the flat maps required for fast state lookups.

### 4. Accessibility & Polish
I prioritized semantic HTML and keyboard accessibility throughout. The variant selector uses the `radiogroup` role, the accordion sections use `region`, and the components use standard `button` tags. The accordion utilizes CSS Grid (`grid-template-rows: 0fr -> 1fr`) to achieve a perfectly smooth height animation without relying on JavaScript height calculations.
