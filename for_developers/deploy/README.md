# Deploy BOP API on an existing VPS (Hetzner)

Runs **only the API** (`npm start` → `server/index.mjs`) in its own directory so it does not mix with other sites on the box.

Typical layout:

```text
/opt/bop/                 # app checkout (isolated)
  .env                    # secrets — never commit
  server/
  …
/etc/systemd/system/bop-api.service
/etc/nginx/sites-available/bop-api.conf   # optional reverse proxy + TLS
```

Frontend can stay on Netlify; set `VITE_API_BASE` to `https://api.yourdomain.com` (or your IP + path).

## 1) Server prep (once)

SSH in, then:

```bash
sudo mkdir -p /opt/bop
sudo chown "$USER":"$USER" /opt/bop

# Node 20+ (example: NodeSource or nvm). Check:
node -v
npm -v
```

## 2) Clone + install

```bash
cd /opt/bop
git clone https://github.com/BOPRobinhood/board-of-proof.git .
npm ci --omit=dev
```

Copy env from your local machine (do **not** paste secrets into chat):

```bash
# on your PC (PowerShell), from the project folder:
scp .env USER@SERVER_IP:/opt/bop/.env
```

On the server, confirm `/opt/bop/.env` has at least:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OWNER_WALLET`
- `ROBINHOOD_RPC_URL`
- `BOP_FORUM_ATTESTATION_ADDRESS` / `ATTESTATION_RELAYER_PRIVATE_KEY` (if attestations)
- `SERVER_PORT=8787`
- `LISTEN_HOST=127.0.0.1`  ← nginx proxies; keep API off the public interface

Smoke test:

```bash
cd /opt/bop
npm start
# other terminal:
curl -sS http://127.0.0.1:8787/api/health
```

Stop with Ctrl+C when OK.

## 3) systemd (keeps it running)

```bash
sudo cp /opt/bop/for_developers/deploy/bop-api.service /etc/systemd/system/bop-api.service
# edit User= if your login is not the deploy user
sudo systemctl daemon-reload
sudo systemctl enable --now bop-api
sudo systemctl status bop-api
journalctl -u bop-api -f
```

## 4) nginx reverse proxy (recommended)

Use a **new** server block / subdomain so existing sites stay untouched, e.g. `api.boardofproof.com` → `127.0.0.1:8787`.

```bash
sudo cp /opt/bop/for_developers/deploy/nginx-bop-api.conf /etc/nginx/sites-available/bop-api.conf
# edit server_name
sudo ln -sf /etc/nginx/sites-available/bop-api.conf /etc/nginx/sites-enabled/bop-api.conf
sudo nginx -t && sudo systemctl reload nginx
```

TLS (if certbot already used on this box):

```bash
sudo certbot --nginx -d api.yourdomain.com
```

## 5) Point the website at the API

Netlify env (build scope) or `netlify.toml`:

```toml
VITE_API_BASE = "https://api.yourdomain.com"
```

Redeploy the frontend after changing it.

## NFT images (served by the API)

The Netlify site loads art from `https://api…/images/nfts/{id}.png`. On the API host:

```bash
sudo mkdir -p /opt/bop/public/images
sudo rm -rf /opt/bop/public/images/nfts
git clone https://github.com/BOPRobinhood/bop-nfts.git /opt/bop/public/images/nfts
# optional in .env:
# PUBLIC_API_ORIGIN=https://api.bop-rh.xyz
sudo systemctl restart bop-api
curl -sI https://api.bop-rh.xyz/images/nfts/1.png | head -n 5
```

## Updates

```bash
cd /opt/bop
git pull
npm ci --omit=dev
sudo systemctl restart bop-api
```

## Ports

| What | Bind | Notes |
|------|------|--------|
| BOP API | `127.0.0.1:8787` | Only nginx talks to it |
| Existing sites | whatever they use now | Unchanged |

Do **not** put the API on port 80/443 directly if nginx already owns those.
