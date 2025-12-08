# SVG Converter Project Context

## Project Overview
`svg-convert` is a Next.js application designed to provide client-side SVG image conversion capabilities. It allows users to upload SVG files and convert them into various raster formats (PNG, JPEG, TIFF) with customizable DPI settings and background transparency options.

## Technology Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (primary), JavaScript (utilities)
- **Styling:** CSS Modules / Tailwind CSS v4
- **Image Processing:**
  - `html2canvas`: Canvas generation from DOM/SVG.
  - `pngjs`: PNG encoding.
  - `utif`: TIFF handling.
  - `exif-js` / `piexifjs`: Metadata management.

## Project Structure
The core functionality is contained within the `app/svg` directory:

- **`app/svg/page.tsx`**: The main route for the converter tool.
- **`app/svg/_components/`**: UI components specific to the converter.
  - `SvgConverter.tsx`: Main state manager and UI orchestrator.
  - `FileUpload.tsx`: Handles file selection and drag-and-drop.
  - `DpiSelector.tsx`: Component for selecting output resolution.
  - `ProgressBar.tsx`: Visual feedback for conversion status.
- **`app/svg/_utils/`**:
  - `ImageConverter.js`: Contains the core logic for parsing SVGs and generating raster images using the underlying libraries.

## Key Features
1.  **Format Support:** Convert SVG to PNG, JPEG, or TIFF.
2.  **DPI Control:** Selectable output resolution (72, 150, 300, 600 DPI).
3.  **Transparency:** Option to preserve transparency (PNG/TIFF) or force a white background (JPEG).
4.  **Client-Side Processing:** All conversions happen in the browser; no files are uploaded to a server.

## Development Commands

### Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### Run Development Server
```bash
npm run dev
# or
pnpm dev
```
Starts the app at `http://localhost:3000`.

### Build for Production
```bash
npm run build
# or
pnpm build
```

### Linting
```bash
npm run lint
```

## Conventions
- **Components:** Functional components with React Hooks.
- **Styling:** CSS files are co-located with components (e.g., `SvgConverter.css` next to `SvgConverter.tsx`).
- **State Management:** Local component state (useState) handles UI interactions and conversion progress.
