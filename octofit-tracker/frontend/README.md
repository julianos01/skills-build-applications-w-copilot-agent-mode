# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs such as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`. If `VITE_CODESPACE_NAME` is not set, it safely falls back to `http://localhost:8000/api/...` for local development.

## Scripts

```bash
npm run dev
npm run build
```
