# THE CENTER INFRASTRUCTURES

React and Vite version of the site. The original static website remains in `urbanarchitects.co.in/` as a preserved source copy.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run test:smoke` runs the Playwright route, interaction, and responsive checks. It uses Microsoft Edge at its standard Windows install path; set `PLAYWRIGHT_EXECUTABLE_PATH` to use another Chromium browser.

The main routes are `/`, `/about`, `/services`, `/portfolio`, `/clients`, `/contact`, and `/projects?project=<project-id>`.
