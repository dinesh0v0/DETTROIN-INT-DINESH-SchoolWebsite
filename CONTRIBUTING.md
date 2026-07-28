# Contributing Guide

Thank you for your interest in contributing to the Krishna International School website!

## Development Workflow

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (for backend)

### Setup

```bash
# Clone the repository
git clone https://github.com/dinesh0v0/DETTROIN-INT-DINESH-SchoolWebsite.git
cd DETTROIN-INT-DINESH-SchoolWebsite

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install --legacy-peer-deps && cd ..

# Configure environment
cp .env.example .env
cp backend/.env.example backend/.env
# Fill in your MongoDB URI and other secrets
```

### Running Locally

```bash
# Terminal 1 – Backend (port 5000)
cd backend && node server.js

# Terminal 2 – Frontend (port 3000)
npm run dev
```

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use For |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting / CSS |
| `refactor:` | Code restructure, no logic change |
| `perf:` | Performance improvement |
| `chore:` | Build process / tooling |
| `seo:` | SEO / metadata |

## Pull Request Guidelines

1. Branch from `main`
2. Keep PRs focused — one feature or fix per PR
3. Ensure the app builds without errors (`npm run build`)
4. Update `README.md` if your change affects setup or usage
