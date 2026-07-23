import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../components/LoginDropdown';
import {
  githubContractsRepoUrl,
  githubNftsRepoUrl,
  githubRepoUrl,
} from '../config/projectPublic';

const btnClass =
  'inline-flex items-center gap-2 text-sm px-4 py-2 border border-gray-700 bg-white text-blue-700 hover:text-blue-900 hover:bg-gray-100';
const btnStyle = { fontFamily: 'Arial, sans-serif' } as const;
const bodyStyle = { fontFamily: "'Times New Roman', Times, serif" } as const;

function BtnIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      width={22}
      height={22}
      className="h-5 w-5 shrink-0 object-contain"
      decoding="async"
    />
  );
}

function PixelTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`bop-pixel-title text-gray-900 mb-3 ${className}`}
      style={{ marginTop: 0, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', lineHeight: 1.25 }}
    >
      {children}
    </h2>
  );
}

function StepTitle({ children }: { children: ReactNode }) {
  return (
    <h3
      className="bop-pixel-title text-gray-900 m-0 mb-2"
      style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', lineHeight: 1.3 }}
    >
      {children}
    </h3>
  );
}

const ForDevelopersPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div
          className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/" className="text-blue-700 hover:text-blue-900 underline">
              ← Home
            </Link>
          </div>
          <LoginDropdown />
        </div>

        <section className="mb-8 border border-gray-400 bg-white p-5">
          <div className="flex justify-center mb-4">
            <img
              src="/images/fig047-01.gif"
              alt="For Developers banner"
              className="h-auto w-auto max-w-[75%] bg-white object-contain"
            />
          </div>
          <h1
            className="bop-pixel-title mb-4 flex flex-wrap items-center justify-center gap-2 text-center"
            style={{ marginTop: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            <img
              src="/icons/futurama-bender-48.png"
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
              decoding="async"
            />
            <span>For developers</span>
          </h1>
          <p
            className="text-[1.0625rem] text-gray-800 mb-4 text-center max-w-2xl mx-auto leading-relaxed"
            style={bodyStyle}
          >
            Want to run BOP yourself? The stack is open — React site, Express API, Supabase, and
            Robinhood Chain contracts. Clone it, wire env + SQL, and you&apos;ve got a local board
            with wallet login.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnClass}
              style={btnStyle}
            >
              <BtnIcon src="/icons/done-48.png" />
              App repo
            </a>
            {githubContractsRepoUrl ? (
              <a
                href={githubContractsRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnClass}
                style={btnStyle}
              >
                <BtnIcon src="/icons/check-mark-48.png" />
                Contracts repo
              </a>
            ) : null}
            {githubNftsRepoUrl ? (
              <a
                href={githubNftsRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnClass}
                style={btnStyle}
              >
                <BtnIcon src="/icons/image-file-48.png" />
                NFT art repo
              </a>
            ) : null}
            <Link to="/forums/archive" className={btnClass} style={btnStyle}>
              <BtnIcon src="/icons/evidence-48.png" />
              View archive & verify
            </Link>
            <Link to="/contracts" className={btnClass} style={btnStyle}>
              <BtnIcon src="/icons/treasure-chest-48.png" />
              NFT &amp; vault safety
            </Link>
          </div>
        </section>

        <section className="mb-10">
          <PixelTitle>Want to try it yourself?</PixelTitle>
          <p className="text-[1.0625rem] text-gray-800 mb-6 leading-relaxed" style={bodyStyle}>
            Five steps from zero to a running board. You need Node 20+, a free Supabase project, and
            MetaMask on Robinhood Chain (or whatever RPC you point at).
          </p>

          <div className="space-y-6">
            <div className="border border-gray-300 bg-white p-4">
              <StepTitle>1. Clone the app</StepTitle>
              <p className="text-sm text-gray-800 m-0 mb-3 leading-relaxed" style={bodyStyle}>
                This repo is the website + API. Contracts and NFT art are separate repos if you want
                to audit or fork those too.
              </p>
              <pre className="m-0 border border-gray-300 bg-gray-50 px-3 py-2 text-[0.8125rem] font-mono overflow-x-auto">
{`git clone https://github.com/BOPRobinhood/board-of-proof.git
cd board-of-proof
npm install`}
              </pre>
            </div>

            <div className="border border-gray-300 bg-white p-4">
              <StepTitle>2. Add secrets</StepTitle>
              <p className="text-sm text-gray-800 m-0 mb-3 leading-relaxed" style={bodyStyle}>
                Copy <code>.env.example</code> → <code>.env</code>. The service role key stays on the
                server only — never put it in the Vite client.
              </p>
              <pre className="m-0 border border-gray-300 bg-gray-50 px-3 py-2 text-[0.8125rem] font-mono whitespace-pre-wrap overflow-x-auto">
{`SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
OWNER_WALLET=0xYourMetaMaskAddress
ROBINHOOD_RPC_URL=https://...
# later: BOP_TOKEN_ADDRESS, BOP_FORUM_ATTESTATION_ADDRESS,
#        ATTESTATION_RELAYER_PRIVATE_KEY`}
              </pre>
            </div>

            <div className="border border-gray-300 bg-white p-4">
              <StepTitle>3. Database</StepTitle>
              <p className="text-sm text-gray-800 m-0 leading-relaxed" style={bodyStyle}>
                In the Supabase SQL editor, run the scripts under <code>for_developers/sql/</code> in
                numeric order (<code>001_</code>, <code>002_</code>, …). That creates profiles, forum
                boards/threads, votes, PMs, attestations, and the rest. The folder README is the map.
              </p>
            </div>

            <div className="border border-gray-300 bg-white p-4">
              <StepTitle>4. Start locally</StepTitle>
              <p className="text-sm text-gray-800 m-0 mb-3 leading-relaxed" style={bodyStyle}>
                One command serves the React app and the Express API together.
              </p>
              <pre className="m-0 mb-3 border border-gray-300 bg-gray-50 px-3 py-2 text-[0.8125rem] font-mono overflow-x-auto">
{`npm run dev`}
              </pre>
              <p className="text-sm text-gray-800 m-0 leading-relaxed" style={bodyStyle}>
                Open <code>http://127.0.0.1:2000</code> → connect MetaMask → Register. Your{' '}
                <code>OWNER_WALLET</code> becomes admin after that first registration.
              </p>
            </div>

            <div className="border border-gray-300 bg-white p-4">
              <StepTitle>5. Optional — ship it</StepTitle>
              <p className="text-sm text-gray-800 m-0 mb-2 leading-relaxed" style={bodyStyle}>
                Production is two pieces: a Node API (<code>npm start</code>) behind Caddy/nginx on a
                VPS, and a static Vite build on Netlify (or similar). Point{' '}
                <code>VITE_API_BASE</code> at your API HTTPS origin so the site can call{' '}
                <code>/api/…</code> and load NFT gallery images from the API host.
              </p>
              <p className="text-sm text-gray-800 m-0 leading-relaxed" style={bodyStyle}>
                Checklist and systemd notes: <code>for_developers/deploy/</code> in the app repo.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 border border-gray-300 bg-white p-5">
          <PixelTitle>What you get</PixelTitle>
          <ul className="list-disc pl-5 space-y-2 text-[1.0625rem] text-gray-800 m-0 leading-relaxed" style={bodyStyle}>
            <li>
              <strong>Forum</strong> — sections &amp; boards, markdown threads, votes, rank gates,
              encrypted PMs, admin tools.
            </li>
            <li>
              <strong>Wallet identity</strong> — MetaMask sign-in; $BOP balance can show under posts
              once the token address is set.
            </li>
            <li>
              <strong>On-chain receipts</strong> — compact attestations for threads / replies / votes /
              PM metadata, with an{' '}
              <Link to="/forums/archive" className="text-blue-700 underline">
                Archive &amp; verify
              </Link>{' '}
              flow.
            </li>
            <li>
              <strong>Membership NFTs</strong> — 400k $BOP ↔ 1 Proof NFT (max 500), plus a separate
              dividend vault design. Safety notes:{' '}
              <Link to="/contracts" className="text-blue-700 underline">
                Contracts
              </Link>
              .
            </li>
            <li>
              <strong>Liteboards</strong> — per-token mini-forums you can deploy from the app for other
              ERC-20 communities.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <PixelTitle>Where to dig deeper</PixelTitle>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-800 m-0" style={bodyStyle}>
            <li>
              <code>README.md</code> — quick start at the repo root
            </li>
            <li>
              <code>for_developers/README.md</code> — architecture, routes, env catalog
            </li>
            <li>
              <code>for_developers/sql/README.md</code> — migration order
            </li>
            <li>
              <code>for_developers/deploy/</code> — VPS / Caddy / systemd notes
            </li>
            <li>
              <a
                href={githubContractsRepoUrl || githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                bop-contracts
              </a>{' '}
              — Solidity sources &amp; Hardhat tests
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ForDevelopersPage;
