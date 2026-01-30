# C4 App

A web interface for playing Connect 4 against the [goc4](https://github.com/eli-rich/goc4) engine. The engine uses bitboards and negamax search with alpha-beta pruning to play at a strong level.

The app runs a Go backend that serves a SolidJS frontend and handles game state. When you make a move, the server runs the engine's search algorithm to find the best response.

## How It Works

The heavy lifting happens in the [goc4 engine](https://github.com/eli-rich/goc4), which implements:
- Bitboard representation for efficient position encoding
- Negamax search with alpha-beta pruning
- Transposition table caching (416MB)
- Iterative deepening from depth 8 to 43

The web app wraps this in a playable interface. Frontend was rebuilt with Claude Code.

## Running Locally

**Prerequisites:**
- Go 1.25 or later
- Node.js or Bun (for building the frontend)

**Steps:**

1. Clone and build the frontend:
```bash
git clone <repo-url>
cd c4app/client
npm install && npm run build
# or: bun install && bun run build
```

2. Start the server:
```bash
cd ..
go run .
```

3. Open http://localhost:3000

The server starts on port 3000 by default.
