This is a [Next.js](https://nextjs.org) project for **agentskillsforall.com** — the Agent Skills For All webpage and API.

## API (agent-skills CLI)

When deployed (e.g. to agentskillsforall.com), the following endpoints are used by the `agent-skills` CLI. Set `AGENT_SKILLS_API_URL` to your deployment URL (e.g. `https://agentskillsforall.com`).

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search` | GET | Search skills. Query: `q`, `limit` (default 10, max 50). |
| `/api/t` | GET | Telemetry ingestion (anonymous install/usage events). |
| `/api/audit` | GET | Security audit (stub; returns `{}`). |

Data is kept in memory per instance. For production at scale, replace `src/lib/store.ts` with Vercel Postgres or another store.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
