# Arkenly

## Get started

1. Install dependencies

```bash
npm install
```

2. Run the app locally

```bash
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

This creates the production output in `dist/`, including:

- `dist/client` for client assets
- `dist/server` for the Cloudflare worker bundle

## Environment variables

This project uses Supabase, so you must provide these variables before building and deploying:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

You can store them in a `.env` file locally for development.

## Deploy to Cloudflare Workers

This repo is configured for Cloudflare worker deployment, not a plain static site.

- Deploy the app:

```bash
npm run deploy
```

