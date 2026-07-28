# DETTROIN Internship — School Website Project

## Intern Details

| Field | Info |
|-------|------|
| **Full Name** | Dinesh D |
| **Intern ID** | N/A |
| **Email Address** | d2024dinesh@gmail.com |
| **GitHub Username** | [dinesh0v0](https://github.com/dinesh0v0) |
| **Selected Website** | [https://kisaligarh.com/](https://kisaligarh.com/) |
| **Live Demo Link** | [https://dettroin-int-dinesh-school-website.vercel.app/](https://dettroin-int-dinesh-school-website.vercel.app/) |

---

## Technologies Used

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite |
| Styling | TailwindCSS v4 |
| Animations | Framer Motion (Motion library) |
| Backend | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB Atlas |
| File Storage | MongoDB GridFS (`multer-gridfs-storage`) |
| PDF Generation | Puppeteer |
| Icons | Lucide React |
| Security | Helmet, CORS, express-validator |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render.com |

---

## Key Improvements Made

1. **Modern UI/UX Redesign** — Rebuilt the entire site with a premium dark-glass aesthetic using TailwindCSS v4, replacing the original plain layout with glassmorphism cards, smooth gradients, and a cohesive colour system.
2. **Smooth Animations** — Integrated Framer Motion for scroll-reveal transitions, staggered list animations, and micro-interaction hover effects throughout all pages.
3. **Responsive Navigation** — Rebuilt the header with a sticky transparent-to-solid scroll effect, mobile hamburger menu, and multi-level dropdown navigation.
4. **Interactive 3D Dome Gallery** — Added a custom WebGL-powered interactive 360° photo gallery component.
5. **Full MERN Backend** — Implemented a production-ready Express API with MongoDB Atlas for Admission forms, Job Applications (with PDF resume upload via GridFS), and Fee Payment recording.
6. **Automated Email Notifications** — Integrated Nodemailer to send confirmation emails on admission and job application submissions.
7. **Downloadable Resources** — Added a Puppeteer script to auto-generate 4 themed school PDF resources, served from the `/public/resources/` directory.
8. **SEO & Accessibility** — Added semantic HTML5 structure, proper heading hierarchy, descriptive meta tags, and ARIA labels across all pages.
9. **Production Deployment** — Configured Vercel (frontend) and Render.com (backend) with environment-variable-based secrets and proper CORS setup.
10. **Developer Experience** — Added `.env.example` files, a clean `.gitignore` (excludes `node_modules`, secrets), and full documentation.

---

## Project Overview

A production-grade full-stack website for **Krishna International School (KIS)**, inspired by [kisaligarh.com](https://kisaligarh.com/), built with the MERN stack.

## Project Structure

```
School-Website/
├── src/                        # React (Vite + TypeScript) frontend
│   ├── components/             # Shared UI components
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Card.tsx            # Card surface component
│   │   ├── DomeGallery.jsx     # Interactive 3D dome gallery
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Header.tsx          # Navigation header with dropdowns
│   │   ├── Layout.tsx          # Page layout wrapper
│   │   ├── ScrollToTop.tsx     # Scroll-to-top utility
│   │   └── SectionNav.tsx      # In-page sticky section nav
│   ├── pages/                  # Route-level page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Academics.tsx
│   │   ├── Admission.tsx
│   │   ├── CoCurricular.tsx
│   │   ├── Events.tsx
│   │   ├── Gallery.tsx
│   │   ├── JoinUs.tsx
│   │   └── Portal.tsx
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn, slugify)
│   ├── App.tsx                 # Root router
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles & design tokens
├── backend/                    # Express.js API server
│   ├── config/
│   │   └── db.js               # MongoDB connection & GridFS setup
│   ├── controllers/            # Route handler logic
│   │   ├── admissionController.js
│   │   ├── jobController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── errorHandler.js     # Global error handler
│   │   └── upload.js           # Multer + GridFS file upload
│   ├── models/                 # Mongoose schemas
│   │   ├── Admission.js
│   │   ├── JobApplication.js
│   │   └── Payment.js
│   ├── routes/
│   │   └── api.js              # All API routes
│   ├── services/
│   │   └── mailer.js           # Nodemailer email service
│   ├── .env.example            # Environment variable template
│   ├── package.json
│   └── server.js               # Express entry point
├── public/
│   └── resources/              # Downloadable PDFs
├── scripts/
│   └── generate-pdfs.js        # Puppeteer script to generate themed PDF resources
├── .env.example                # Frontend environment variable template
├── .gitignore
├── index.html                  # HTML entry point
├── package.json
├── render.yaml                 # Render.com deployment config (backend)
├── tsconfig.json
├── vercel.json                 # Vercel deployment config (frontend)
└── vite.config.ts
```

## Prerequisites

- **Node.js** >= 18
- A **MongoDB Atlas** cluster (connection string in `backend/.env`)

## Getting Started

### 1. Configure the Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set MONGO_URI to your Atlas connection string
```

### 2. Install Dependencies

```bash
# Frontend (from root)
npm install

# Backend
cd backend && npm install --legacy-peer-deps
```

### 3. Run in Development

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 — Frontend:**
```bash
# From root
npm run dev    # Vite dev server → http://localhost:3000
```

> The Vite proxy forwards all `/api` requests to Express on `http://localhost:5000`.

### 4. Generate Downloadable PDFs

```bash
node scripts/generate-pdfs.js
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/admissions` | Submit admission application |
| `POST` | `/api/jobs` | Submit job application (with resume upload) |
| `GET` | `/api/jobs/resume/:id` | Stream a resume from MongoDB GridFS |
| `POST` | `/api/payments` | Record a fee payment |

## Deployment

| Service | Platform | Config File |
|---------|----------|-------------|
| Frontend | Vercel | `vercel.json` |
| Backend | Render.com | `render.yaml` |
