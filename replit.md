# Replit.md

## Overview

This is a full-stack web application built with a React frontend and Node.js/Express backend. The application appears to be a timestamp service that displays the current UTC time to users. It features a modern UI built with shadcn/ui components, uses Drizzle ORM for database operations with PostgreSQL, and includes both Python Flask and Node.js Express server implementations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Dual Server Setup**: 
  - Primary: Node.js with Express TypeScript server
  - Secondary: Python Flask server (appears to be legacy/alternative implementation)
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with `/api` prefix
- **Session Management**: PostgreSQL-based session store

### Build and Development
- **Development**: Vite dev server with HMR for frontend, tsx for backend TypeScript execution
- **Production**: Vite build + esbuild for backend bundling
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Frontend Components
- **App.tsx**: Main application component with routing setup
- **Home Page**: Displays current timestamp with refresh functionality
- **UI Components**: Comprehensive shadcn/ui component library including buttons, cards, dialogs, forms, etc.
- **Query Client**: Configured TanStack Query with custom fetch functions and error handling

### Backend Components
- **Express Server** (`server/index.ts`): Main server with middleware setup, logging, and Vite integration
- **Routes** (`server/routes.ts`): API route definitions (currently minimal)
- **Storage Layer** (`server/storage.ts`): Database abstraction with in-memory implementation for users
- **Flask Server** (`server/app.py`): Alternative Python implementation with timestamp endpoint

### Database Schema
- **Users Table**: Basic user management with username/password fields
- **Drizzle Configuration**: PostgreSQL dialect with migrations support

## Data Flow

1. **Frontend Request**: React components use TanStack Query to fetch data
2. **API Layer**: Express server handles requests at `/api/*` endpoints
3. **Storage Layer**: Storage interface abstracts database operations
4. **Database**: PostgreSQL with Drizzle ORM for type-safe queries
5. **Response**: JSON responses with proper error handling

### Timestamp Feature Flow
- User loads home page → automatic timestamp fetch → display current UTC time
- User clicks refresh → new API request → updated timestamp display
- Error handling for network failures with user-friendly messages

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI & Styling**: Radix UI primitives, Tailwind CSS, Lucide React icons
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Utilities**: Class Variance Authority, clsx, date-fns

### Backend Dependencies
- **Node.js**: Express, TypeScript support with tsx
- **Database**: Drizzle ORM, Neon Database client, PostgreSQL session store
- **Python**: Flask, Flask-CORS, pytz (for alternative server)
- **Development**: Vite, esbuild for building

### Development Tools
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Database Tools**: Drizzle Kit for migrations
- **Replit Integration**: Cartographer plugin, runtime error overlay

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with auto-reload
- **Database**: Neon Database connection via environment variables

### Production Build
- **Frontend**: Vite build outputs to `dist/public`
- **Backend**: esbuild bundles server to `dist/index.js`
- **Database**: Drizzle migrations run via `db:push` command

### Environment Configuration
- **Database**: `DATABASE_URL` environment variable required
- **CORS**: Configured for localhost development
- **Session**: PostgreSQL-based session storage

### Key Build Commands
- `npm run dev`: Development mode with both frontend and backend
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema updates

The application follows a modern full-stack pattern with strong TypeScript support, comprehensive UI components, and flexible database abstraction. The dual server setup suggests experimentation with different backend technologies while maintaining the same frontend interface.