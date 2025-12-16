# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StableVault is a crypto asset management dashboard built with Next.js 16. This is a design slicing project implementing a modern dark mode interface for portfolio tracking, asset swapping, staking management, and market monitoring.

## Development Commands

### Common Operations

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting without changes

### Git Hooks

- Pre-commit: Runs lint-staged (automatically lints and formats staged files)
- Commit-msg: Validates commit messages against Conventional Commits specification

## Commit Message Format

This project enforces Conventional Commits via commitlint. Format: `<type>(<scope>): <subject>`

**Valid types:**

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes that don't affect code meaning (formatting, etc)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Changes to build process or auxiliary tools
- `ci` - Changes to CI configuration files and scripts
- `revert` - Reverts a previous commit

**Rules:**

- Header max length: 100 characters
- Subject case: Never use upper-case, pascal-case, or start-case
- Body max line length: 100 characters

## Architecture

### Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Styling:** Tailwind CSS v4 with custom design system
- **UI Components:** Radix UI primitives with custom shadcn/ui components
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** @tabler/icons-react, lucide-react
- **State:** React hooks (no external state management)
- **Forms/Validation:** Zod
- **Type Safety:** TypeScript 5

### Project Structure

```
app/
├── layout.tsx          # Root layout with Inter font, SEO metadata
├── page.tsx            # Main dashboard page (sidebar + header + content)
├── data.json           # Mock data for tables/charts
├── error.tsx           # Error boundary
├── loading.tsx         # Loading states
└── not-found.tsx       # 404 page

components/
├── ui/                 # shadcn/ui base components (Radix UI wrappers)
├── atoms/              # Reusable atomic components
│   ├── grid-layout.tsx       # Grid system wrapper
│   ├── typography.tsx        # Text components with variants
│   └── animate-on-scroll.tsx # Scroll animation wrapper
├── app-sidebar.tsx     # Main navigation sidebar
├── site-header.tsx     # Top header with search/settings/profile
├── chart-area-interactive.tsx # Portfolio performance chart
├── data-table.tsx      # Asset/market data tables
├── section-cards.tsx   # Dashboard cards/widgets
└── nav-*.tsx           # Navigation components

lib/
├── utils.ts            # cn() utility, formatNumber()
└── animations.ts       # Framer Motion animation variants library

hooks/
└── use-mobile.ts       # Mobile detection hook
```

### Design Patterns

**Component Organization (Atomic Design System):**

This project follows Brad Frost's Atomic Design methodology for component organization:

- **Atoms** (`components/atoms/`) - Basic building blocks
  - Smallest reusable UI elements (Typography, ErrorState, GridLayout, etc.)
  - Cannot be broken down further while maintaining their purpose
  - Examples: `typography.tsx`, `grid-layout.tsx`, `animate-on-scroll.tsx`

- **Molecules** (`components/` root or future `components/molecules/`) - Simple component groups
  - Combinations of atoms working together (SearchInput, CardHeader, etc.)
  - Single-responsibility, reusable component groups

- **Organisms** (`components/` root) - Complex UI sections
  - Composed of atoms and molecules into distinct interface sections
  - Examples: `app-sidebar.tsx`, `site-header.tsx`, `data-table.tsx`, `section-cards.tsx`

- **Templates/Pages** (`app/`) - Page-level layouts
  - Combine organisms into full page layouts
  - Define structure and content placement
  - Example: `page.tsx` assembles sidebar + header + dashboard content

**shadcn/ui Components** (`components/ui/`):

- **IMPORTANT:** Keep shadcn/ui base components in `components/ui/` ONLY
- Do NOT mix shadcn/ui with atoms/molecules/organisms
- These are Radix UI primitive wrappers (Button, Input, Card, Dialog, etc.)
- Treat as foundational UI library - avoid heavy modifications

**General Rules:**

- All client components must be marked with `'use client'`
- Prefer composition over complex component hierarchies
- Keep components focused on a single responsibility

**Styling:**

- Uses `cn()` utility (clsx + tailwind-merge) for conditional classes
- Tailwind CSS v4 with PostCSS
- Dark mode is the primary design (next-themes integration)
- Custom CSS variables for theming in `globals.css`

**Animation System:**

- Centralized animation variants in `lib/animations.ts`
- Use `AnimateOnScroll` component for scroll-triggered animations
- All animations respect `prefers-reduced-motion`
- Available variants: fadeIn, fadeInUp, fadeInDown, scaleIn, slideInLeft, slideInRight, staggerContainer

**Type Safety:**

- Strict TypeScript enabled
- Zod for runtime validation
- Type imports use `type` keyword (`import type`)

### Key Features (from PRD)

The dashboard is being built in phases:

**Phase 1 - Setup & Layout:**

- ✅ Project initialization
- ✅ Top header (search, settings, profile)
- Pending: Sidebar navigation

**Phase 2 - Core Dashboard UI:**

- Security alert status
- Portfolio line chart/tracking
- Quick access widget (swap, deposit, withdraw, transfer)
- Assets table & donut chart breakdown
- Staking management with earnings estimates
- Market table with sorting/filtering
- Community feed (horizontal scroll cards)

**Phase 3 - Finishing:**

- Responsive design (tablet/mobile)
- Dark mode optimization

### Configuration Files

- `next.config.ts` - Next.js config with optimized image settings
- `eslint.config.mjs` - ESLint with Next.js + TypeScript + Prettier integration
- `postcss.config.mjs` - PostCSS with Tailwind CSS
- `commitlint.config.js` - Commit message linting rules
- `.husky/` - Git hooks (pre-commit, commit-msg)

## Code Style Guidelines

**Component Structure:**

```tsx
'use client'; // If needed

import { ExternalLib } from 'external';
import { InternalComponent } from '@/components/internal';
import type { TypeImport } from './types';

export function ComponentName({ prop }: Props) {
  return <div className={cn('base-classes', conditional)}>...</div>;
}
```

**Utilities:**

- Use `cn()` for className composition
- Use `formatNumber()` for number localization (Indonesian/Bahasa format)
- Import from `@/` alias for absolute imports

**Accessibility:**

- Skip-to-content link in root layout
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support

## Important Notes

- This is a design slicing project - focus is on pixel-perfect UI implementation
- Reference design uses dark mode as primary theme
- Inter font is used throughout with system fallbacks
- Number formatting uses Indonesian locale (`['ban', 'id']`)
- Image optimization configured for AVIF/WebP formats
- Main branch is `master`
