# Deployment

## Build

```bash
npm run build
```

Generates static site in `out/` directory.

## Vercel

```bash
npm i -g vercel
vercel login
vercel
```

Add domain: `vercel domains add yourdomain.com`

DNS:
- A Record: `76.76.21.21`
- CNAME (www): `cname.vercel-dns.com`

## Netlify

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

## Static Host

Upload `out/` folder contents via FTP/rsync:

```bash
rsync -avz out/ user@server.com:/var/www/html/
```

## Environment Variables

For admin panel in production:
- Set `JWT_SECRET` in hosting platform environment variables
- Never commit `.env.local`

## Testing

Local preview:
```bash
npm run build
npx serve out/
```
