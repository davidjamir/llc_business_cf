# llc-business-cf

Edutz LLC landing page deployed as a **Cloudflare Worker** with static assets.

## Structure

```
src/index.ts          Worker (API + asset fallback)
public/index.html     Landing page
public/assets/css/    Styles
public/assets/js/     Client JS
public/assets/images/ Media
wrangler.jsonc        Wrangler config
```

## Commands

```bash
npm install
npm run dev      # http://localhost:8787
npm run deploy   # deploy to Cloudflare
npm run types    # generate Env types
```

## API

| Method | Path           | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/health`  | Health check              |
| POST   | `/api/contact` | Contact form submission  |
