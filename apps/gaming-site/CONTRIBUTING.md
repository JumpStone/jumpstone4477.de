# Contributing to HenryMM Gaming

Thank you for helping improve HenryMM Gaming. This application is the Astro and Starlight documentation site for HenryMM's gaming projects, including modpacks and resource packs.

Contributions are welcome in the form of documentation fixes, new project information, installation guidance, translations, accessibility improvements, and testing feedback.

## Before You Start

Please check the existing documentation and open issues or pull requests before starting substantial work. For a small typo or correction, you can usually make the change directly and explain it in the pull request.

When reporting a problem, include:

- The page or project affected
- What you expected to happen
- What actually happened
- Your browser, operating system, launcher, or Minecraft version when relevant
- Reproduction steps and screenshots when they clarify the problem

Do not include private information, access tokens, or personal data in issues, pull requests, or screenshots.

## Project Setup

The repository is a pnpm monorepo. The gaming site is the `gaming-site` workspace under `apps/gaming-site`.

### Requirements

- Node.js LTS
- pnpm 10.5.2, as specified by the repository's `packageManager` field

### Install dependencies

From the repository root:

```bash
pnpm install
```

You can also install from the application directory when working only on this app:

```bash
cd apps/gaming-site
pnpm install
```

### Start the development server

From the repository root:

```bash
pnpm dev:gaming-site
```

Or from `apps/gaming-site`:

```bash
pnpm dev
```

The site is normally available at <http://localhost:4321/>. Astro watches the project and refreshes the browser when files change.

## Project Structure

```text
apps/gaming-site/
├── public/                  # Files copied directly to the generated site
│   └── scripts/             # Browser scripts used by the site
├── src/
│   ├── assets/              # Images imported by Astro components or content
│   │   └── projects/        # Project artwork
│   ├── components/          # Custom Astro components
│   ├── content/
│   │   └── docs/            # Starlight Markdown and MDX pages
│   └── content.config.ts    # The Starlight docs collection schema
├── astro.config.mjs         # Site metadata, integrations, and sidebar
├── package.json             # App scripts and dependencies
└── tsconfig.json            # TypeScript configuration
```

Most content changes belong in `src/content/docs/`. Changes to the sidebar, site title, social links, favicon, or custom Starlight components belong in `astro.config.mjs`.

## Writing Documentation

### Create a page

Add a `.md` or `.mdx` file below `src/content/docs/`. Starlight turns the file path into the page URL. For example:

```text
src/content/docs/projects/modpacks/example-pack/index.mdx
```

is available at:

```text
/projects/modpacks/example-pack/
```

Every page should have frontmatter. At minimum, provide a title:

```md
---
title: Example Pack
---

Page content goes here.
```

Use `.md` for ordinary Markdown. Use `.mdx` when the page needs JSX-style component usage or other MDX features.

### Update the sidebar

Pages are not automatically added to the visible sidebar in this project. When adding a page that should be navigable, add a sidebar item in `astro.config.mjs`.

Use the page path without the leading slash and without the file extension:

```js
{
  label: "Installation",
  slug: "projects/modpacks/example-pack/installation",
}
```

Keep labels short and use the same hierarchy as the URL. If a section should start expanded, set `collapsed: false`; otherwise follow the surrounding project section's convention.

### Link to other pages

Use site-relative links for pages in this site:

```md
See the [installation guide](/projects/modpacks/hm-basic-play/installation/).
```

Use full HTTPS URLs for external sites such as CurseForge, Modrinth, GitHub, or launcher downloads. Check that external links point to the intended page before submitting.

### Add images and other assets

Use `src/assets/` for images that are imported and processed by Astro. Keep project artwork under `src/assets/projects/` when it belongs to a project page.

Use `public/` for files that must be served at a stable URL without importing them. Reference public files from the site root, for example `/scripts/tab-deep-links.js`.

Use descriptive alternative text for informative images. Mark decorative images with empty alternative text where the component supports it. Avoid adding large, duplicated, or unnecessarily compressed assets.

### Content quality

- Keep instructions specific to the relevant project, Minecraft version, loader, and launcher.
- Prefer short headings, lists, tables, and code blocks that are easy to scan.
- Use consistent project names and capitalization.
- Explain prerequisites before installation steps.
- Keep steps in the order a reader must perform them.
- Update links and version references when instructions change.
- Check spelling, grammar, and Markdown formatting.
- Do not copy content from another site without permission; link to the original source instead.

## Navigation and Configuration

The sidebar is defined in `astro.config.mjs`. A page can exist and build successfully without appearing in the sidebar, so navigation should be checked separately in the browser.

The docs collection is configured in `src/content.config.ts` with Starlight's `docsLoader` and `docsSchema`. Keep frontmatter compatible with that schema. If you need a new frontmatter field or content behavior, check the Starlight documentation and update the schema deliberately rather than bypassing validation.

## Validation

Run the production build before opening a pull request:

From the repository root:

```bash
pnpm build:gaming-site
```

Or from `apps/gaming-site`:

```bash
pnpm build
```

Then preview the generated site when the change affects layout, navigation, links, or images:

```bash
pnpm preview
```

During review, visit the changed pages at desktop and mobile widths and verify:

- The page loads without an error
- The page title and headings are correct
- Sidebar placement and links work
- Internal and external links resolve
- Images load with appropriate alternative text
- Code blocks and tables remain readable
- Installation instructions match the current project or modpack

There is currently no separate lint or test script in this workspace. The production build is the required automated check unless a future change adds more project scripts.

## Git and Pull Requests

Keep changes focused. A pull request should explain:

- What changed
- Why it changed
- Which pages or configuration files were affected
- How the change was tested
- Any follow-up work or known limitations

Use a clear, imperative commit subject when committing locally, such as:

```text
Document JS Combat Pro installation
```

Before submitting a pull request:

1. Review the diff for unrelated changes, broken links, and accidental formatting churn.
2. Run `pnpm build:gaming-site` from the repository root.
3. Check the rendered pages in the local development server or preview server.
4. Include screenshots for visual or layout changes.
5. Respond to review feedback with a new commit or an updated branch, as appropriate.

Do not commit generated output such as `dist/`, local environment files, dependency caches, or editor-specific files.

## Troubleshooting

### The page does not appear in the sidebar

Confirm that the page path is included in the appropriate `sidebar` section in `astro.config.mjs`. The `slug` must match the content path, excluding `src/content/docs/` and the file extension.

### The development server shows stale content

Stop and restart the server, then check that the file is inside `src/content/docs/` and has valid frontmatter. Content collection changes can also require a restart.

### The build reports a content error

Check the page frontmatter against Starlight's docs schema. Look for malformed YAML, unsupported fields, invalid links, and missing referenced files. Run the build from the directory or workspace you changed so the output identifies the relevant page.

### A favicon or asset returns 404

Confirm that the file exists in `public/` at the URL used by the site configuration. For example, a file at `public/favicon.ico` is referenced as `/favicon.ico`.

## Code of Conduct

Contributors are expected to communicate respectfully, assume good faith, and keep feedback focused on improving the project. Harassment, discrimination, and personal attacks are not acceptable.

See [henrymeyer.de/code-of-conduct](https://henrymeyer.de/code-of-conduct) for the full Code of Conduct.

Thank you for taking the time to make the gaming documentation more useful for players.
