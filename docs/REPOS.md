# Repository layout

This workspace is split into **three git repos**:

| Path | GitHub |
|------|--------|
| `.` (project root) — web app + API | https://github.com/BOPRobinhood/board-of-proof |
| `contracts/` — Solidity | https://github.com/BOPRobinhood/bop-contracts |
| `public/images/nfts/` — NFT art + metadata | https://github.com/BOPRobinhood/bop-nfts |

Public URLs for the site are also in `project.public.json` (`githubRepoUrl`, `githubContractsRepoUrl`, `githubNftsRepoUrl`).

## Optional: submodules (later)

So a single `git clone --recurse-submodules` of the app also pulls contracts + art:

```bash
# from app root, after nested .git folders are removed/replaced:
git submodule add https://github.com/BOPRobinhood/bop-contracts.git contracts
git submodule add https://github.com/BOPRobinhood/bop-nfts.git public/images/nfts
```

Netlify/CI: enable submodule checkout so `/images/nfts/*.png` ship with the site.
