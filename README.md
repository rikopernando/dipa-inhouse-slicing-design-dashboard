# StableVault Dashboard

<div align="center">
  <img src="public/images/logo.svg" alt="StableVault Logo" width="80" height="80" />

  <h3>Modern Crypto Asset Management Dashboard</h3>

  <p>
    A comprehensive crypto portfolio management platform built with Next.js 16 and React 19
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.0.10-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2.1-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
  </p>
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Commit Convention](#commit-convention)
- [Code Style](#code-style)
- [Project Status](#project-status)
- [Contributing](#contributing)

---

## 🎯 About

StableVault is a modern, dark-themed crypto asset management dashboard designed for retail crypto investors and traders. This project is a design slicing implementation focused on creating a pixel-perfect, production-ready UI for managing crypto portfolios, executing swaps, monitoring markets, and tracking staking rewards.

**Target Users:**

- Retail crypto investors managing assets across multiple chains
- Traders requiring quick access to asset swaps
- Users seeking passive income through staking

---

## ✨ Features

### Phase 1: Layout & Navigation ✅

- [x] **Modern Sidebar Navigation** - Collapsible sidebar with crypto-focused menu items
- [x] **User Profile Section** - Avatar, name, email with dropdown menu
- [x] **Crypto Watchlist** - Real-time price tracking for BTC, ETH, SOL
- [x] **Promotional Cards** - Staking promotions and yield opportunities
- [x] **Top Header** - Search bar, settings, notifications, and profile

### Phase 2: Core Dashboard (In Progress)

- [x] **Security Alert Banner** - 2FA status and security warnings
- [x] **Portfolio Tracking** - Interactive line chart with time range filters
- [x] **Quick Access Widget** - Swap, Deposit, Withdraw, Transfer tabs
- [x] **Asset Management** - Table view of owned assets with valuations
- [x] **Portfolio Breakdown** - Donut chart visualization of asset composition
- [x] **Staking Management** - Monthly earnings estimates and staked assets
- [x] **Market Overview** - Real-time coin prices with sorting/filtering
- [x] **Community Feed** - Social integration for market sentiment

### Phase 3: Finishing (Planned)

- [ ] **Responsive Design** - Tablet and mobile optimizations
- [ ] **Dark Mode Optimization** - Enhanced contrast and color adjustments

---

## 🛠 Tech Stack

### Core

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **React:** 19.2.1 with React Compiler
- **TypeScript:** 5 (Strict mode enabled)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

### UI Components

- **Component Library:** [Radix UI](https://www.radix-ui.com/) primitives
- **Custom Components:** shadcn/ui style architecture
- **Icons:** [@tabler/icons-react](https://tabler.io/icons), [lucide-react](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)

### Data & State

- **Tables:** [TanStack Table v8](https://tanstack.com/table)
- **Forms:** [Zod](https://zod.dev/) validation
- **State Management:** React hooks (no external state management)

### Developer Tools

- **Linting:** ESLint 9 + eslint-config-next
- **Formatting:** Prettier with Tailwind plugin
- **Git Hooks:** Husky + lint-staged
- **Commit Linting:** commitlint with Conventional Commits

---

## 📁 Project Structure

```
dipa-inhouse-slicing-design-dashboard/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts, metadata
│   ├── page.tsx             # Main dashboard page
│   ├── globals.css          # Global styles & CSS variables
│   └── error.tsx            # Error boundary
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui base components (Radix wrappers)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   │
│   ├── atoms/               # Atomic design - smallest reusable units
│   │   ├── typography.tsx
│   │   ├── grid-layout.tsx
│   │   └── animate-on-scroll.tsx
│   │
│   ├── app-sidebar.tsx      # Main sidebar (organism)
│   ├── site-header.tsx      # Top header (organism)
│   ├── nav-*.tsx            # Navigation components
│   ├── data-table.tsx       # Reusable data table
│   └── section-cards.tsx    # Dashboard widgets
│
├── lib/                     # Utilities and helpers
│   ├── utils.ts            # cn() utility, formatNumber()
│   ├── animations.ts       # Framer Motion variants library
│   └── mock-data/          # Mock data for development
│       ├── assets.ts
│       ├── portfolio.ts
│       ├── market.ts
│       └── ...
│
├── hooks/                   # Custom React hooks
│   └── use-mobile.ts
│
├── public/                  # Static assets
│   ├── images/             # Images and illustrations
│   ├── crypto-icons/       # Cryptocurrency icons (BTC, ETH, SOL)
│   └── avatars/            # User avatars
│
├── documents/              # Project documentation
│   ├── project-definition-document.md
│   ├── Dashboard.png       # Design reference
│   └── Sidebar.png         # Sidebar design reference
│
└── ...config files         # ESLint, Prettier, TypeScript, etc.
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** 20.x or higher
- **Package Manager:** npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dipa-inhouse-slicing-design-dashboard
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💻 Development

### Available Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `yarn dev`          | Start development server (with Turbopack) |
| `yarn build`        | Build for production                      |
| `yarn start`        | Start production server                   |
| `yarn lint`         | Run ESLint                                |
| `yarn lint:fix`     | Run ESLint with auto-fix                  |
| `yarn format`       | Format code with Prettier                 |
| `yarn format:check` | Check code formatting                     |

### Development Workflow

1. **Start development server**

   ```bash
   yarn dev
   ```

2. **Make your changes**
   - Edit files in `app/`, `components/`, or `lib/`
   - Hot Module Replacement (HMR) updates automatically

3. **Lint and format**

   ```bash
   yarn lint:fix
   yarn format
   ```

4. **Commit your changes**
   - Pre-commit hooks will automatically lint and format staged files
   - Commit messages must follow Conventional Commits specification

---

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint.

### Format

```
<type>(<scope>): <subject>
```

### Valid Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process or tooling changes
- `ci` - CI/CD configuration changes
- `revert` - Revert a previous commit

### Examples

```bash
feat(dashboard): add portfolio breakdown chart
fix(sidebar): resolve navigation active state issue
docs(readme): update installation instructions
refactor(components): extract reusable card component
```

### Rules

- Header max length: **100 characters**
- Subject case: **lowercase** (never use upper-case, pascal-case, or start-case)
- Body max line length: **100 characters**

---

## 🎨 Code Style

### Component Structure

```tsx
'use client'; // If needed

import { ExternalLib } from 'external';
import { InternalComponent } from '@/components/internal';
import type { TypeImport } from './types';

export function ComponentName({ prop }: Props) {
  return <div className={cn('base-classes', conditional)}>...</div>;
}
```

### Design System

This project follows **Atomic Design** methodology:

- **Atoms** (`components/atoms/`) - Basic building blocks
- **Molecules** (root or future `components/molecules/`) - Simple component groups
- **Organisms** (root) - Complex UI sections (sidebar, header, tables)
- **Templates/Pages** (`app/`) - Full page layouts

### Styling Guidelines

- Use `cn()` utility for className composition
- Use `formatNumber()` for number localization (Indonesian format)
- Import from `@/` alias for absolute imports
- All client components must be marked with `'use client'`

### Animation System

Centralized animations in `lib/animations.ts`:

- Use `AnimateOnScroll` component for scroll-triggered animations
- All animations respect `prefers-reduced-motion`
- Available variants: fadeIn, fadeInUp, scaleIn, slideInLeft, staggerContainer

---

## 📊 Project Status

### Completed ✅

- [x] Project initialization with Next.js 16
- [x] Sidebar navigation with crypto watchlist
- [x] Top header with search and user profile
- [x] Security alert banner
- [x] Portfolio tracking chart
- [x] Quick access widget (swap/deposit/withdraw/transfer)
- [x] Asset management table
- [x] Portfolio breakdown (donut chart)
- [x] Staking management section
- [x] Market overview table
- [x] Community feed

### In Progress 🚧

- [ ] Responsive design optimizations
- [ ] Dark mode color refinements

### Planned 📋

- [ ] Mobile layout adaptations
- [ ] Tablet-specific breakpoints
- [ ] Enhanced animations
- [ ] Performance optimizations

---

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes following the code style guidelines
4. Commit using conventional commits (`git commit -m 'feat(scope): add amazing feature'`)
5. Push to your branch (`git push origin feat/amazing-feature`)
6. Open a Pull Request

### Guidelines

- Follow the existing code style and architecture
- Write clean, self-documenting code
- Add comments only where logic isn't self-evident
- Test your changes thoroughly
- Update documentation if needed
- Ensure all tests and linters pass

---

## 📄 License

This project is part of an internal design slicing exercise.

---

## 🙏 Acknowledgments

- Design inspiration from modern crypto platforms
- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Tabler Icons](https://tabler.io/icons)

---

<div align="center">
  <p>Built with ❤️ using Next.js 16 and React 19</p>
  <p>
    <a href="#stablevault-dashboard">Back to top ↑</a>
  </p>
</div>
