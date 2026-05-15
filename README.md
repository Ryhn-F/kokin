# Kokin Coffee Digital Interface

Welcome to the Kokin Coffee frontend repository. This project is built using [Next.js](https://nextjs.org) (App Router), Tailwind CSS v4, and Shadcn UI to deliver a modern, premium web experience for Kokin Coffee's customers and administrators.

## Clean Architecture in Kokin

This project adheres to Clean Architecture principles to ensure scalability, maintainability, and clear separation of concerns. The architecture is adapted for modern Next.js applications:

### 1. Domain-Driven Routing (Presentation Layer)
We utilize Next.js Route Groups (`(public)`, `(admin)`, `(auth)`) to logically separate the application into distinct domains.
- **`(public)`**: Contains all customer-facing routes (like the Homepage and Menu). It has its own layout and styling rules without affecting the URL structure.
- **`(admin)` / `dashboard`**: Isolates the admin interface, ensuring that admin layouts and logic don't leak into public pages.
- **`(auth)`**: Manages authentication flows (login, register) independently.

### 2. Component Modularity (UI Layer)
Complex pages are strictly decoupled into smaller, reusable components, rather than having monolithic page files.
- **Feature-Specific Components**: Sections of a page (e.g., `HeroSection`, `MenuSection`, `BookTableSection`) are modularized into dedicated directories like `src/components/homepage/`. This makes `page.js` files act solely as orchestrators/assemblers.
- **Primitive UI Components**: We use [Shadcn UI](https://ui.shadcn.com/) for building blocks (Buttons, Inputs, Selects). These are housed in `src/components/ui/` and remain strictly stateless and reusable across any domain.

### 3. Centralized Theming & Design Tokens
Styling and brand identity are decoupled from individual component code.
- **Design System**: All design tokens from the Stitch design (such as `surface`, `primary-container`, `on-surface` colors, and typography like SF Pro) are defined centrally in `src/app/globals.css` using Tailwind CSS `@theme` variables.
- **Utility Classes**: Custom utility shapes and borders (like `custom-shape-hero` and `bento-card`) are defined globally, avoiding messy inline styling and ensuring consistency across the app.

### 4. Separation of Concerns
- **Icons & Assets**: Icons are standardized using `lucide-react`, providing a consistent vector graphic system.
- By keeping components small and focused, future integrations of data-fetching or state management (Business Logic Layer) can be easily injected into page orchestrators or container components, keeping the presentational components pure.

---

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
