# Repository Guidelines

## Project Structure & Module Organization
`app/` hosts the Next.js Page Router tree. Shared layout and global styling live in `app/layout.tsx` and `app/globals.css`, while the primary converter UI resides under `app/svg/` (React components in `components/` and helpers in `utils/`). Static assets such as SVG references and favicons belong in `public/`; reference them with `next/image` to benefit from the pipeline. Configuration files (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`) sit at the root and should remain declarative—avoid embedding runtime logic there.

## Build, Test, and Development Commands
- `pnpm install` — installs dependencies (pnpm is implied by `pnpm-lock.yaml`; keep `node_modules/` out of commits).
- `pnpm dev` — runs the Next.js dev server at `http://localhost:3000` with live reload.
- `pnpm build` — compiles production assets; run this before shipping major UI changes to catch type or route issues.
- `pnpm start` — serves the production build locally for smoke testing.
- `pnpm lint` — executes ESLint with `eslint-config-next`; treat warnings as blockers.

## Coding Style & Naming Conventions
TypeScript is mandatory for components and utilities; use ES modules and 2-space indentation, matching existing files. Components exporting JSX should be PascalCase (e.g., `SvgPreview.tsx`), hooks camelCase, and utility modules named after their intent (`encodeTiff.ts`). Prefer functional components with explicit prop types. Styling relies on Tailwind classes in JSX plus minimal globals—introduce new tokens in `app/globals.css` instead of ad-hoc inline styles. Do not disable ESLint rules unless a comment explains the exception.

## Testing Guidelines
No automated test harness exists yet; when adding one, place component tests beside their sources (e.g., `app/svg/components/__tests__/Uploader.test.tsx`) and favor `@testing-library/react`. Until then, validate new work with `pnpm build && pnpm start`, exercising the upload → conversion → download flow and checking console output for decoding errors. Document manual test cases in the pull request so reviewers can reproduce.

## Commit & Pull Request Guidelines
Recent history uses short imperative subjects (`fix`, `stash`). Continue that style but add context (`fix: clamp png compression`). Reference issue IDs when possible. Each pull request should include: summary of the change, any configuration updates, screenshots or GIFs for UI shifts (one light, one dark mode), manual test notes, and clear rollback instructions. Keep branches rebased on `main` before requesting review, and ensure CI (lint/build) passes locally.
