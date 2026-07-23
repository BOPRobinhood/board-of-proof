# Repository layout

This workspace is split into **three git repos**:

| Path | Repo role |
|------|-----------|
| `.` (project root) | BOP web app + API |
| `contracts/` | Solidity vault + NFT contracts |
| `public/images/nfts/` | NFT collection art (1–500) |

Each folder has its own `.git`. They are independent until you add GitHub remotes (and optionally submodules).

## Create remotes on GitHub

Create three empty repos (no README), then:

```bash
# App
cd /path/to/bop-main
git remote add origin https://github.com/<you>/<bop-app>.git
git push -u origin main

# Contracts
cd contracts
git remote add origin https://github.com/<you>/<bop-contracts>.git
git push -u origin main

# NFT collection
cd ../public/images/nfts
git remote add origin https://github.com/<you>/<bop-nfts>.git
git push -u origin main
```

## Optional: submodules (recommended later)

So a single `git clone --recurse-submodules` of the app also pulls contracts + art:

```bash
# from app root, after remotes exist and nested .git folders are removed/replaced:
git submodule add https://github.com/<you>/<bop-contracts>.git contracts
git submodule add https://github.com/<you>/<bop-nfts>.git public/images/nfts
```

Netlify/CI: enable submodule checkout so `/images/nfts/*.png` ship with the site.
