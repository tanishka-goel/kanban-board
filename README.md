# Kanban Board Project

A full-stack Kanban workspace application with:
- Role-based dashboards (admin and user)
- Workspace and task management
- Activity and notification tracking
- Real-time one-to-one chat with read receipts

The project is split into:
- `frontend/`: React + Vite app for UI, state, and Supabase REST integration
- `backend/`: Express + Socket.IO server for real-time messaging and chat history API

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [API and Realtime Contract](#api-and-realtime-contract)
- [Supabase Data Model Expectations](#supabase-data-model-expectations)
- [Known Notes](#known-notes)
- [Troubleshooting](#troubleshooting)

## Architecture

The app uses a hybrid backend model:

- Frontend talks directly to Supabase REST endpoints for CRUD (users, workspaces, tasks, activity, notifications).
- Backend handles realtime chat using Socket.IO and persists chat messages to Supabase.

High-level flow:

1. User logs in from frontend.
2. Frontend fetches and updates Kanban/business data via Supabase REST.
3. Chat UI connects to Socket.IO backend.
4. Backend writes chat messages to `messages` table and emits events to connected users.

## Features

### Core

- Authentication flow with Redux state and protected routes
- Role-based route access:
  - Admin routes for managing users/workspaces
  - User routes for personal/workspace dashboards
- Workspace CRUD
- Task CRUD and task status updates (Kanban-style)
- Activity log creation on key actions
- Unread notification listing and mark-as-read

### Realtime Chat

- User socket registration (`registerUser`)
- Real-time send/receive messaging
- Persisted message history retrieval
- Read receipts (`seen`)

## Tech Stack

### Frontend

- React 19 + Vite
- React Router
- Redux Toolkit
- TanStack Query
- Axios
- Socket.IO client
- Zod validation
- Framer Motion
- Recharts
- Radix/shadcn-inspired UI primitives

### Backend

- Node.js
- Express
- Socket.IO
- Supabase JS client
- dotenv
- cors

### Data Layer

- Supabase (Postgres + REST)

## Project Structure

```text
kanban-board/
  backend/
    index.js                 # Express + Socket.IO server (chat)
    supabase.js              # Alternate Supabase client helper
    package.json
  frontend/
    src/
      api/                   # API modules for Supabase + chat fetches
      components/            # Shared and feature UI components
      features/auth/         # Redux auth slice
      hooks/                 # Reusable custom hooks
      layout/                # Main app layout
      pages/                 # Admin, user, chat, profile, activity pages
      queries/               # React Query hooks
      routes/                # App routes + route guards
      validation/schemas/    # Zod schemas
    package.json
    vite.config.js
  README.md
```

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm 9+
- A Supabase project with required tables

## Environment Variables

Create these files manually.

### 1) Backend environment

Create `backend/.env`:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 2) Frontend environment

Create `frontend/.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_CHAT_SERVER_URL=http://localhost:3000
```

## Installation

From project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the Project

Run backend and frontend in separate terminals.

### Terminal 1: backend

```bash
cd backend
npm start / node index.js
```

Server starts at:
- `http://localhost:3000`

### Terminal 2: frontend

```bash
cd frontend
npm run dev
```

Frontend starts at:
- `http://localhost:5173`

## Available Scripts

### Backend (`backend/package.json`)

- `npm start`: Start Express + Socket.IO server
- `npm test`: Placeholder script

### Frontend (`frontend/package.json`)

- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## API and Realtime Contract

### Backend HTTP

#### Get chat history

- Method: `GET`
- Path: `/api/messages`
- Query params:
  - `sender_id` (required)
  - `receiver_id` (required)
- Behavior:
  - Returns messages exchanged between the two users ordered by creation time.

Example:

```http
GET /api/messages?sender_id=user-a&receiver_id=user-b
```

### Socket.IO Events

#### Client -> Server

- `registerUser`: payload = `userId`
- `sendMessage`: payload = `{ sender_id, receiver_id, text }`
- `seen`: payload = `{ sender_id, receiver_id }`

#### Server -> Client

- `receiveMessage`: emitted after message is persisted
- `seen`: emitted to sender when receiver marks messages as seen

## Supabase Data Model Expectations

The frontend and backend currently expect these tables to exist:

- `profiles`
- `workspaces`
- `tasks`
- `activity`
- `notifications`
- `messages`

At minimum, fields used in code include:

- `profiles`: `id`, `username`, `password`, `role`, `first_name`, `last_name`, `email`
- `workspaces`: `id`, `workspace_name`, `creatorID`
- `tasks`: `id`, `workspace_id`, `creator_id`, `title`, `status`, plus task metadata
- `activity`: `user_id`, `workspace_id`, `action`, `entity_type`, `entity_id`, `details`
- `notifications`: `id`, `user_id`, `actor_id`, `is_read`, `created_at`
- `messages`: `id`, `sender_id`, `receiver_id`, `message`, `seen`, `created_at`

## Known Notes

- Login currently compares a SHA256 hash of entered password against stored `profiles.password`.
- Frontend CRUD calls are made directly to Supabase REST endpoints via `VITE_SUPABASE_URL`.
- Chat persistence uses the backend service role key. Keep this key only in backend `.env` and never expose it in frontend code.

## Troubleshooting

- If frontend cannot fetch data:
  - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  - Check Supabase table permissions and row-level security policies.

- If chat is not working:
  - Confirm backend server is running on `http://localhost:3000`.
  - Ensure `VITE_CHAT_SERVER_URL` matches backend URL.
  - Check browser console and backend logs for socket connection errors.

- If CORS errors appear:
  - Backend currently allows origin `http://localhost:5173`. Update CORS config in `backend/index.js` if using a different frontend host/port.

---

