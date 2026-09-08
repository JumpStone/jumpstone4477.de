# gaming-site

The gaming documentation site for [henrymeyer.de](https://henrymeyer.de), built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).
The site documents HenryMM gaming projects, including Minecraft modpacks and resource packs. It is available at [gaming.henrymeyer.de](https://gaming.henrymeyer.de).

## Tech stack

- [Astro](https://astro.build) with static output
- [Starlight](https://starlight.astro.build) for documentation navigation and search
- Markdown and [MDX](https://mdxjs.com) content

## Getting started

From the repository root:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev:gaming-site
```

Or from within this directory:

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start the development server         |
| `pnpm build`   | Create a production build in `dist/` |
| `pnpm preview` | Serve the production build locally   |
| `pnpm start`   | Start the development server         |
| `pnpm astro`   | Run the Astro CLI                    |

From the repository root, use `pnpm build:gaming-site` to build this workspace.

## Content

Documentation pages live in `src/content/docs/` as `.md` or `.mdx` files. Site metadata, custom components, and the Starlight sidebar are configured in `astro.config.mjs`.
See [contributing.md](./contributing.md) for content guidelines, navigation instructions, validation steps, and pull request expectations.

## Environment variables

This application currently does not require environment variables. Do not commit secrets or local environment files.

## Deployment

Astro generates a static site in `dist/` with `pnpm build`. The production site is configured with the canonical URL [https://gaming.henrymeyer.de](https://gaming.henrymeyer.de). Deployment provider configuration is managed outside this application directory.

## License

Refer to the repository and package licensing information before reusing code or content. This application does not currently include a local `LICENSE` file.

## Learn more

- [Astro documentation](https://docs.astro.build)
- [Starlight documentation](https://starlight.astro.build/)
- [Astro Discord](https://astro.build/chat)
