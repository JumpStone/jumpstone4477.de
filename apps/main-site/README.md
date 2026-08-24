# main-site

The main website for [henrymeyer.de](https://henrymeyer.de), built with [Next.js](https://nextjs.org).

## Tech stack

- [Next.js](https://nextjs.org) / React
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)
- [Radix UI](https://www.radix-ui.com) primitives via [`@repo/ui`](../../packages/ui)
- [Three.js](https://threejs.org)

## Getting started

From the repository root:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev:main
```

Or from within this directory:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start the development server             |
| `pnpm build`   | Create a production build                |
| `pnpm start`   | Serve the production build               |
| `pnpm lint`    | Run ESLint                               |

## Environment variables

Copy `.env.example` to `.env.local` and fill in the required values.

## Deployment

The site is deployed on [Vercel](https://vercel.com); see `vercel.json` for configuration.

## License

Refer to the [LICENSE](./LICENSE) file in this directory.
