# EcoBin - Smart Waste Management & Sustainability Portal

## Overview

EcoBin is a comprehensive full-stack web application designed to transform waste management through intelligent tools, community engagement, and sustainability education. The platform empowers users to schedule waste pickups, analyze waste through AI-powered scanning, participate in community reporting, earn eco-rewards, and access educational resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds
- **Component Architecture**: Modular component structure with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL store
- **File Upload**: Multer for handling image uploads

### AI Integration
- **AI Service**: Google Gemini AI for waste image analysis
- **Functionality**: Waste type detection, disposal advice, and eco-points calculation
- **Response Format**: Structured JSON responses with confidence scores

## Key Components

### Authentication System
- **Provider**: Replit Auth with OIDC
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple
- **User Management**: Comprehensive user profiles with eco-metrics tracking
- **Theme Support**: Light/dark mode with persistent user preferences

### Core Features
1. **Smart Waste Pickup Scheduling**
   - Interactive calendar-based scheduling
   - Multiple waste type support (organic, plastic, e-waste, hazardous, bulk)
   - Location-based pickup management
   - Real-time status tracking

2. **AI-Powered Waste Scanner**
   - Image upload and analysis using Google Gemini
   - Waste type identification with confidence scoring
   - Disposal guidance and bin recommendations
   - Eco-points reward system

3. **Community Reporting System**
   - Geo-tagged issue reporting
   - Community cleanup coordination
   - Status tracking for reported issues
   - Volunteer engagement features

4. **Rewards and Gamification**
   - Eco-points earning system
   - Achievement tracking
   - Reward redemption (tree planting, vouchers, carbon offsets)
   - Leaderboard functionality

5. **Educational Platform**
   - Interactive quizzes on waste management
   - Learning resources and guides
   - Certification programs
   - Progress tracking

### Database Schema
- **Users**: Profile management, eco-metrics, preferences
- **Waste Pickups**: Scheduling, location, status tracking
- **Waste Reports**: Community issue reporting
- **Waste Scans**: AI analysis results and history
- **Achievements**: User accomplishments and rewards
- **Quizzes**: Educational content and user attempts
- **Sessions**: Authentication session management

## Data Flow

### User Authentication Flow
1. User initiates login through Replit Auth
2. OIDC provider validates credentials
3. Session created and stored in PostgreSQL
4. User profile retrieved/created in database
5. Frontend receives user data and preferences

### Waste Scanning Flow
1. User uploads image through React component
2. Image processed by Multer middleware
3. Image sent to Google Gemini AI for analysis
4. AI returns structured waste analysis data
5. Results stored in database with user attribution
6. Eco-points awarded and user stats updated

### Community Reporting Flow
1. User submits report with location data
2. Report stored with geo-coordinates
3. Community members can view and respond
4. Admin users can update report status
5. Notifications sent for status changes

## External Dependencies

### AI Services
- **Google Gemini AI**: Waste image analysis and classification
- **API Key Management**: Environment variable-based configuration

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: WebSocket-based connection with connection pooling

### Authentication
- **Replit Auth**: OpenID Connect authentication provider
- **Session Storage**: PostgreSQL-backed session management

### Development Tools
- **Vite**: Frontend build tool and development server
- **Drizzle Kit**: Database schema management and migrations
- **TypeScript**: Type safety across the entire stack

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles server code for Node.js
- **Database**: Drizzle migrations handle schema updates
- **Environment**: Production environment variables for API keys and database URLs

### Development Environment
- **Hot Reload**: Vite HMR for frontend development
- **TypeScript**: Real-time type checking
- **Database**: Local development with environment-based database URL
- **Proxy**: Vite development server proxies API requests to Express

### Key Architectural Decisions

1. **Monorepo Structure**: Shared types and utilities between frontend and backend
2. **TypeScript First**: End-to-end type safety for better developer experience
3. **Serverless Database**: Neon Database for scalable, managed PostgreSQL
4. **Component-Driven UI**: shadcn/ui for consistent, accessible components
5. **Optimistic Updates**: React Query for responsive user experience
6. **Session-Based Auth**: Secure authentication with persistent sessions
7. **AI Integration**: Google Gemini for advanced waste analysis capabilities

The architecture prioritizes user experience, scalability, and maintainability while providing comprehensive waste management functionality through modern web technologies.