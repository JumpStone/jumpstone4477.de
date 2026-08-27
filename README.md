# henrymeyer.de

Monorepo for [henrymeyer.de](https://henrymeyer.de), managed with [pnpm](https://pnpm.io) workspaces.

## Structure

```
.
├── apps/
│   ├── main-site/   # Next.js web application
│   └── hmt-clan/    # Next.js web application (uses @repo/ui)
└── packages/
    └── ui/          # Shared UI components (@repo/ui)
```

## Requirements

- Node.js (LTS)
- pnpm 10.5.2

## Getting started

```bash
# Install dependencies
pnpm install

# Start the main site in development mode
pnpm dev:main

# Build the main site
pnpm build:main

# Start the hmt-clan site in development mode
pnpm dev:hmt-clan

# Build the hmt-clan site
pnpm build:hmt-clan
```

You can also run commands scoped to a specific workspace package:

```bash
pnpm --filter main-site dev
pnpm --filter @repo/ui ...
```

## License

All packages in this repository are licensed under their respective licenses. Refer to the LICENSE file in each package for more information.
