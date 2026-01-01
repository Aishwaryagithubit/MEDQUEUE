# MEDQUEUE

**MEDQUEUE** — A Vite + React + TypeScript frontend scaffold with shadcn-style UI components. This repository contains a complete frontend app (pages, UI components, translations) and is ready to integrate with an Azure-backed API (Azure Functions / FastAPI), Azure OpenAI, a database, and Blob Storage for a full-stack deployment.

---

## 🚀 Quick start

Prerequisites:

- Node.js (LTS recommended, e.g. 18+)
- npm
- (Optional) Azure CLI / Azure Functions Core Tools when you add backend

Commands (run from project root):

- Install dependencies

```powershell
npm install
```

- Start dev server

```powershell
npm run dev
# open the URL shown by Vite (e.g. http://localhost:8080/)
```

- Build production bundle

```powershell
npm run build
```

- Preview production build

```powershell
npm run preview
```

- Lint code

```powershell
npm run lint
```

---

## 📋 Project structure (important files)

- `index.html` — document head & meta (title set to **MEDQUEUE**)
- `src/main.tsx` — app entrypoint
- `src/App.tsx` — router, providers (i18n, react-query, toasts)
- `src/pages/` — pages (Index, AIConsult, FindDoctor, Appointments, Dashboard, Login, Signup, NotFound)
- `src/components/` — reusable UI & layout components (shadcn/Radix primitives)
- `src/hooks/` — custom hooks (e.g., `use-toast`, `use-mobile`)
- `src/contexts/` — app contexts (language translations)
- `public/` — static assets (favicon, placeholder) — can be removed or replaced with your assets
- `vite.config.ts` — Vite config and aliases

---

## ✅ Features (what's included)

- Landing page with Hero, Features, CTA, and Testimonials
- AI Consultation page (UI ready to call AI backend)
- Doctor search and booking UI
- Appointments and Dashboard pages with charts
- Login & Signup pages (UI only; backend required for auth)
- Internationalization (EN + NE) via `LanguageContext`
- Reusable UI system (Radix + Tailwind + class-variance-authority)
- Notifications via `sonner`
- React Query for data fetching

> Note: several features are UI-ready but require a backend to be fully functional (AI proxy, auth, appointment persistence, file uploads).

---

## 🧪 Tests & Linting

Project does not include unit tests by default. Recommended quick setup for tests:

- Add Vitest + Testing Library

```powershell
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
# Add script: "test": "vitest"
```

Lint:

```powershell
npm run lint
```

---

## 🔐 Environment & Secrets

- Keep secrets out of source control. Use `.env` / `.env.local` for local development and **Azure Key Vault** or GitHub secrets for production.
- Example environment variables for a backend that proxies AI:

```
AZURE_OPENAI_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_DEPLOYMENT=
DATABASE_URL=
AZURE_STORAGE_CONNECTION_STRING=
```

Local Functions (Azure): `api/local.settings.json` contains local-only secrets (do NOT commit).

---

## 🏗️ Adding an Azure backend (recommended pattern)

You have two good options to connect the frontend to Azure-hosted backend logic and AI:

1. **Azure Static Web Apps (SWA) + Azure Functions (Node/TS)**
   - Add an `api/` folder with Functions (TypeScript). This deploys together with SWA and is easy for small serverless proxies.
   - Good for small to medium workloads.

2. **Azure Static Web Apps + FastAPI (Python)** or **Azure App Service / Container Apps**
   - Run a containerized FastAPI service for Python-based AI logic and heavier workloads.
   - The frontend calls FastAPI endpoints (CORS enabled). Store secrets in Key Vault and assign Managed Identity to the backend.

### Minimal Function example (proxy to Azure OpenAI)

```ts
// openaiProxy/index.ts (Azure Function)
import fetch from 'node-fetch';
export default async function (context, req) {
  const resp = await fetch(`${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-06-01`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': process.env.AZURE_OPENAI_KEY' },
    body: JSON.stringify(req.body)
  });
  const json = await resp.json();
  context.res = { status: resp.status, body: json };
}
```

---

## 📦 Database & Storage

- **Database options:**
  - Azure SQL (relational) — recommended with Prisma for schema/migrations
  - Cosmos DB (NoSQL) — if you need flexible schema and global distribution
- **File uploads:** Use **Azure Blob Storage** and issue short-lived SAS tokens from the backend for direct client uploads.

---

## ♻️ CI/CD & Deployment

- Recommended: **Azure Static Web Apps** for the frontend + GitHub Actions (auto-generated SWA workflow). It can deploy your static `dist` and connect to `api` Functions (if used).
- For a standalone FastAPI / container backend, use **Azure Container Registry** + **Azure Container Apps** or **App Service**, deploying via GitHub Actions.
- Store production secrets in GitHub Secrets or use GitHub OIDC to access Azure resources without long-lived secrets.

---

## 🧰 Useful maintenance tips

- Remove unused packages carefully (use `depcheck` to find candidates). Example found: `zod`, `@hookform/resolvers` (depending on usage).
- Keep `node_modules/` in `.gitignore` and use `npm ci` for CI reproducible installs.
- Use `npm audit` and `npm audit fix` periodically; major upgrades (e.g., Vite 7) may require code changes.

---

## 🗂️ Contributing

- Create a branch: `git checkout -b feat/your-feature`
- Run the dev server, add tests if you change logic, lint and format
- Open a PR and link work items for review

---

## 📜 License & Contacts

- Add your license file (e.g., `LICENSE`) and keep author/contact info in `package.json` or `README`.

---

If you'd like, I can also:

- Scaffold a working **Azure Function** `openaiProxy` in `api/` and add a local test, or
- Add a **Prisma** database schema for appointments and users, or
- Add a `.github/workflows` CI template to build and deploy to Azure Static Web Apps.

Tell me which next step you'd like and I'll implement it. 🙌
