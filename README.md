# llc-business-cf

Exact visual clone of Edutz LLC on Cloudflare Workers, with **per-domain site data** injected at the edge.

## Structure

```
src/
  index.ts           Worker — host lookup + HTML inject + API
  sites.ts           Array of sites by domain (name, phone, email, address)
  render.ts          Replace __SITE_*__ placeholders
  static/
    index.html       Page template (placeholders)
    404.html
wrangler.jsonc
```

## Add a domain

Edit `src/sites.ts`:

```ts
{
  hosts: ["your-domain.com", "www.your-domain.com"],
  name: "Your LLC",
  phone: "1234567890",
  email: "info@your-domain.com",
  address: "Street, City, ST ZIP, United States",
}
```

Request hostname is matched (case-insensitive, port stripped). Local dev uses `localhost` / `127.0.0.1`.

## Commands

```bash
npm install
npm run dev      # http://localhost:8787
npm run deploy
npm run types
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health + resolved site name |
| POST | `/api/contact` | Contact form helper |
