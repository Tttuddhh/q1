# PinMe Deploy Skill

## Description

One-click deployment of static websites to PinMe — a zero-config deployment platform powered by IPFS. Supports CLI deployment, automatic build output detection, and instant URL generation.

## Overview

PinMe is a zero-config deployment CLI focused on one-command creation and deployment for static and full-stack projects. It publishes sites to IPFS (InterPlanetary File System), providing decentralized, tamper-resistant hosting with automatic HTTPS URLs.

- **Website**: https://pinme.eth.limo/
- **GitHub**: https://github.com/glitternetwork/pinme
- **No server required** — deploys to IPFS global nodes
- **No domain needed** — automatic `*.pinit.eth.limo` URLs
- **Free tier** — 200MB per file, 1GB per directory

## Quick Start

### Prerequisites

- Node.js >= 16.13.0
- A static site with `index.html` (or a build command that produces one)

### One-Command Deploy

```bash
# Install the skill
npx skills add glitternetwork/pinme

# Deploy current project
bash scripts/deploy.sh

# Or specify directory
bash scripts/deploy.sh --dir ./dist

# Or specify name
bash scripts/deploy.sh --name my-app --dir ./dist
```

### Manual Deploy

```bash
# Install PinMe CLI
npm install -g pinme

# Login (one-time)
pinme login

# Upload static files
pinme upload ./dist

# Or upload current directory
pinme upload
```

## Scenarios

### Scene A: Existing Build Directory

You already have a `dist/` or `build/` folder with static files.

```bash
bash scripts/deploy.sh --dir ./dist
```

### Scene B: Build + Deploy

You need to build first, then deploy.

```bash
bash scripts/deploy.sh --build-cmd "npm run build"
```

### Scene C: Browser Drag & Drop

No CLI needed — open https://pinme.eth.limo/ and drag your folder.

## Command Reference

### deploy.sh Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `--dir` | No | Static site directory (auto-detects dist/build/out/public) |
| `--name` | No | Project name for display |
| `--build-cmd` | No | Build command to run before deploy (e.g. "npm run build") |
| `--help` | No | Show help |

### PinMe CLI Commands

```bash
# Login
pinme login

# Upload static site
pinme upload ./dist

# Create new Worker project
pinme create my-app

# Update deployed Worker
pinme update-worker

# Update database schema
pinme update-db

# Update web frontend
pinme update-web

# Save current project config
pinme save

# Remove deployed content
pinme rm <cid>

# List uploads
pinme list
```

## How It Works

1. **Build Detection**: The script checks for common build output directories (`dist/`, `build/`, `out/`, `public/`) in priority order.
2. **Auto-Install**: If `pinme` CLI is not installed, it runs `npm install -g pinme`.
3. **Upload**: Calls `pinme upload <directory>` to push files to IPFS.
4. **URL Generation**: PinMe returns a permanent URL like `https://xxxx.pinit.eth.limo`.

## File Structure

```
skill-pinme-deploy/
├── skill.md              # This file
├── scripts/
│   ├── deploy.sh         # One-click deploy script
│   └── pinme.toml        # Project config template
```

## Notes

- **Free tier limits**: 200MB per file, 1GB total per directory
- **Fixed domains** (`*.pinit.eth.limo`) require Plus membership and AppKey
- **IPFS persistence**: `pinme rm` removes from PinMe's node but does not guarantee removal from the entire IPFS network
- **CDN**: Content is distributed across IPFS nodes globally
- **HTTPS**: All URLs are HTTPS-enabled automatically
- **CI/CD**: Can integrate with GitHub Actions for automatic deploy on push

## Examples

### Deploy a Vite project

```bash
bash scripts/deploy.sh --build-cmd "npm run build" --dir ./dist
```

### Deploy a React project

```bash
bash scripts/deploy.sh --build-cmd "npm run build" --dir ./build
```

### Deploy without build step

```bash
bash scripts/deploy.sh --dir ./public
```

## Support

- GitHub Issues: https://github.com/glitternetwork/pinme/issues
- Email: pinme@glitterprotocol.io
