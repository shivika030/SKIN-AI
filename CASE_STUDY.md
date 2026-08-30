# Case Study: SkinAI — From Local Prototype to Deployed Product

## The Problem

I had a working skin condition classifier — a trained ResNet18 model, a FastAPI backend, and a React frontend — but everything only ran on my own laptop. For a portfolio piece, "it works on my machine" isn't enough. I wanted a project I could point a recruiter or interviewer to with a working link, not just a GitHub repo they'd have to clone and configure themselves.

## Goal

Take the existing three pieces (model, backend, frontend) and turn them into a single, live, end-to-end web application — while also cleaning up the underlying engineering so the project reflects good practices, not just a working demo.

## Approach

### 1. Fixing a hidden dependency bug
Before anything could be deployed, I discovered that `backend/requirements.txt` was missing `torch` and `torchvision` entirely — even though the backend code imported both. It only worked locally because those packages happened to already be installed in my dev environment. This is a classic "works on my machine" trap: a fresh clone or a container build would have failed immediately. I added pinned versions of both packages, favoring CPU-only wheels to keep the deployed image lean.

### 2. Containerizing the backend
I wrote a Dockerfile for the FastAPI service, including the system libraries OpenCV needs (`libgl1`, `libglib2.0-0`) that aren't present in a minimal Python image by default — another issue that only surfaces once you actually try to containerize, not when running locally.

### 3. Cleaning up the repository
When I went to push the project, I discovered the Git history contained over 650MB of training images that had been committed by accident early in the project — the images themselves weren't gitignored, so they'd been silently tracked from the start. Rather than trying to purge specific large blobs from a tangled history, I migrated to a fresh repository with a clean, single commit — keeping the code and the trained model, but excluding the raw training dataset (which isn't needed to run or deploy the application anyway).

### 4. Deploying the backend
I deployed the Dockerized FastAPI service to Render's free tier. This surfaced the classic free-tier trade-off: the service spins down after 15 minutes of inactivity, meaning the first request after idling takes 30-60 seconds. Rather than treating this as a flaw to hide, I documented it clearly in the README so it reads as an informed trade-off rather than an unexplained slowdown.

### 5. Connecting frontend to backend
The frontend had the backend URL (`http://127.0.0.1:8000`) hardcoded directly in a fetch call. I replaced this with a Vite environment variable (`VITE_API_URL`), configured differently for local development versus production — a small change, but one that makes the difference between a demo that only works on one machine and one that can be redeployed anywhere.

### 6. Deploying the frontend
I deployed the React/Vite frontend to Vercel, connecting it to the live Render backend via the environment variable set in Vercel's dashboard.

## Challenges

- **Debugging a `.gitignore` that "worked" but didn't**: even after adding the right exclusion rules, files kept getting tracked. The root cause was that the files were already staged from a previous commit attempt — `.gitignore` only affects *untracked* files, so once something is already in the index, the ignore rule has no effect until you explicitly untrack it first (`git rm -r --cached`).
- **Multi-service auto-detection**: Vercel's importer initially tried to treat the monorepo as two separate services (frontend + backend), which would have conflicted with the backend already being deployed on Render. Explicitly scoping the Root Directory to `frontend` resolved this cleanly.

## What I'd Improve Next

- Add a formal evaluation pipeline (accuracy, confusion matrix, per-class precision/recall) rather than relying only on individual prediction confidence.
- Add Grad-CAM visualization so predictions come with a visual explanation of which image region influenced the result — important for building trust in any health-adjacent AI tool.
- Move off free-tier hosting to eliminate the cold-start delay, once the project is stable.
- Add basic CI (GitHub Actions) to auto-deploy on push, and add automated tests for the `/predict` endpoint.

## Outcome

The project moved from three disconnected local pieces to a single, live, deployable application in `skin-ai-beta-sooty.vercel.app`, backed by a properly containerized API on Render — with a clean Git history and honest documentation of its current limitations.
