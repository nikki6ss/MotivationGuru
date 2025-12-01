# MotiTask - Adaptive Task Manager

## Overview

MotiTask is an adaptive task management application that adjusts to users' emotional and energy states. The application allows users to set their current motivation level (1-10) and receive personalized task recommendations that match their capacity. It focuses on creating a calming, non-overwhelming experience with gentle animations and soothing aesthetics inspired by Linear, Calm/Headspace, and Notion.

The app tracks user progress, maintains streaks, and provides motivational messaging that adapts to both energy levels and completion rates. Users can create custom task categories, manage tasks with different difficulty levels, and view comprehensive progress analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with two main routes:
- `/` - Home page with task management and motivation slider
- `/progress` - Progress tracking and analytics page

**State Management**: 
- Local React state with hooks (`useState`, `useEffect`)
- localStorage for persistence of tasks, motivation level, streak data, and custom categories
- No global state management library - chosen for simplicity and reduced bundle size
- TanStack React Query for future API data fetching and caching needs

**UI Framework**: Shadcn/ui component library built on Radix UI primitives
- Provides accessible, customizable components
- Uses class-variance-authority for variant-based styling
- Components are co-located in `client/src/components/ui`

**Styling Approach**:
- Tailwind CSS for utility-first styling
- CSS custom properties for theming (light/dark mode)
- Design system defined in `design_guidelines.md` with specific spacing, typography, and color tokens
- Theme variables in `client/src/index.css` with separate light/dark mode definitions

**Key Design Patterns**:
- Component composition with clear separation of concerns
- Custom hooks for reusable logic (e.g., `useIsMobile`, `useTheme`, `useToast`)
- Props-based component communication
- Theme provider pattern for dark mode toggle

### Backend Architecture

**Server Framework**: Express.js with TypeScript
- HTTP server setup with `createServer` from Node's http module
- Currently implements in-memory storage via `MemStorage` class
- Structured for future database integration via storage interface pattern

**Storage Interface**: 
- Abstract `IStorage` interface defines CRUD operations
- `MemStorage` implements in-memory storage using Map data structures
- Designed for easy swap to database-backed storage (PostgreSQL via Drizzle ORM)
- Current schema in `shared/schema.ts` defines users table structure

**API Design**:
- Routes to be implemented in `server/routes.ts`
- RESTful API pattern with `/api` prefix
- Request/response logging middleware for debugging
- JSON body parsing with raw body preservation for webhook verification

**Session Management**:
- Configured for `connect-pg-simple` session store (currently unused)
- Express-session ready for authentication implementation

### Data Storage Solutions

**Current State**: 
- Client-side localStorage for all user data (tasks, motivation, streak, categories)
- In-memory storage on server side (data does not persist across restarts)

**Planned Database**: PostgreSQL with Drizzle ORM
- Configuration present in `drizzle.config.ts`
- Schema definitions in `shared/schema.ts` using Drizzle's type-safe schema builder
- Migrations directory configured (`./migrations`)
- Uses `@neondatabase/serverless` for serverless PostgreSQL connections

**Data Models**:
- Users: id, username, password (defined in schema)
- Tasks: id, title, difficulty, completed, category, duration, timer settings (client-side only)
- Custom Categories: id, name, icon, color, task templates (client-side only)
- Progress Data: daily stats, streaks, completion rates (computed client-side)

### Authentication and Authorization

**Current State**: No authentication implemented

**Prepared Infrastructure**:
- User schema with username/password fields ready
- Passport.js dependency installed for future auth strategy
- Session store configured for user sessions
- Storage interface includes user CRUD methods

**Design Decision**: Authentication deferred to focus on core task management features first. When implemented, will use local username/password strategy with sessions.

### External Dependencies

**UI Component Library**:
- Radix UI primitives (@radix-ui/*) - Accessible, unstyled component foundations
- Provides 25+ component primitives (dialog, dropdown, slider, tabs, etc.)

**Styling**:
- Tailwind CSS - Utility-first CSS framework
- PostCSS with Autoprefixer for CSS processing
- class-variance-authority (CVA) - Component variant management
- clsx & tailwind-merge - Conditional className utilities

**Data Visualization**:
- Recharts - React charting library used in Progress page for:
  - Line charts (motivation trends over time)
  - Bar charts (task completion by day)

**Form Handling**:
- React Hook Form (@hookform/resolvers) - Form state and validation
- Zod - Schema validation
- drizzle-zod - Converts Drizzle schemas to Zod validators

**Date Handling**:
- date-fns - Modern date utility library for formatting and manipulation

**Development Tools**:
- Vite - Fast build tool and dev server with HMR
- ESBuild - Server-side bundling for production
- TypeScript - Type safety across frontend and backend
- Replit-specific plugins for development experience

**Potential Future Integrations**:
- Email service (Nodemailer dependency present)
- Stripe for potential premium features
- AI services (OpenAI, Google Generative AI dependencies present)
- WebSocket (ws dependency) for real-time features

**Design Rationale**:
- Shadcn/ui chosen over Material-UI or Chakra for full style control and smaller bundle size
- Recharts chosen for simplicity over D3.js complexity
- localStorage for MVP, with clear migration path to PostgreSQL
- Minimal external services to reduce costs and complexity during initial development