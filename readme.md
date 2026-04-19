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

1. Build the app:

```bash
npm run build
```

2. Deploy the generated worker:

```bash
wrangler deploy --config dist/server/wrangler.json
```

### Notes

- If you change source code, you must rebuild and redeploy for the live site.
- The default workers.dev URL is based on the worker name from `wrangler.jsonc`.
- You do not need to change the worker name unless you want a different URL.

## Optional: update deploy script

If you want a single command for build and deploy, update `package.json`:

```json
"scripts": {
  "dev": "vite dev",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "deploy": "npm run build && wrangler deploy --config dist/server/wrangler.json"
}
```

## Troubleshooting

- If deployment fails because of `_redirects`, remove `public/_redirects` before building.
- If the worker URL is not immediately reachable, wait a few minutes for Cloudflare DNS propagation.
- If you want a custom domain later, use Cloudflare dashboard routing.
