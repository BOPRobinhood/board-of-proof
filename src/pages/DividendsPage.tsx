import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../components/LoginDropdown';
import { useWallet } from '../contexts/WalletContext';
import { githubNftsRepoUrl } from '../config/projectPublic';
import { NFT_COLLECTION_SHOWCASE } from '../data/nftCollection';

const SWAP_AMOUNT = 400_000;
const MAX_NFTS = 500;
const CLAIM_RATE = 0.01; // 1%
const CLAIMS_PER_DAY = 8;
/** Placeholder until vault is wired on-chain */
const PLACEHOLDER_VAULT = 200_000_000;
const PLACEHOLDER_MINTED = 0;

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function formatBop(n: number): string {
  return Math.floor(n).toLocaleString('en-US');
}

function StatRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 py-2 last:border-0">
      <div>
        <div className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
          {label}
        </div>
        {hint ? (
          <div className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
            {hint}
          </div>
        ) : null}
      </div>
      <div className="font-mono text-sm text-gray-900 tabular-nums text-right">{value}</div>
    </div>
  );
}

const DividendsPage = () => {
  const { publicKey, connect, connecting } = useWallet();
  const [swapDir, setSwapDir] = useState<'in' | 'out'>('in');
  const [nftQty, setNftQty] = useState(1);

  const row1 = NFT_COLLECTION_SHOWCASE.slice(0, 5);
  const row2 = NFT_COLLECTION_SHOWCASE.slice(5, 10);

  // On-chain wiring later — UI uses placeholders so layout is ready.
  const vaultLeft = PLACEHOLDER_VAULT;
  const nftsMinted = PLACEHOLDER_MINTED;
  const yourNfts = 0;
  const contractsLive = false;

  const preview = useMemo(() => {
    const n = Math.max(0, yourNfts);
    const perClaim = n === 0 ? 0 : (n / MAX_NFTS) * CLAIM_RATE * vaultLeft;
    const perDay = perClaim * CLAIMS_PER_DAY;
    const costBasis = n * SWAP_AMOUNT;
    const dailyRoiPct = costBasis > 0 ? (perDay / costBasis) * 100 : 0;
    const daysToBreakeven = perDay > 0 ? costBasis / perDay : null;
    return { perClaim, perDay, dailyRoiPct, daysToBreakeven };
  }, [yourNfts, vaultLeft]);

  const swapCost = SWAP_AMOUNT * Math.max(1, Math.min(nftQty, 50));
  const panelBtn =
    'w-full text-sm px-3 py-2 border border-gray-800 bg-white text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white';

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div
          className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/" className="text-blue-700 hover:text-blue-900 underline">
              ← Back to BOP
            </Link>
          </div>
          <LoginDropdown />
        </div>

        <section className="mb-8 border border-gray-400 bg-white p-5">
          <div className="flex justify-center mb-4">
            <img
              src="/images/fig042-01.gif"
              alt=""
              className="h-auto w-auto max-w-[75%] bg-white object-contain"
            />
          </div>
          <h1
            className="bop-pixel-title mb-3 flex flex-wrap items-center justify-center gap-2 text-center"
            style={{ marginTop: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            <img
              src="/icons/stack-of-money-48.png"
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
              decoding="async"
            />
            <span>Dividend claims</span>
          </h1>

          <div
            className="text-sm text-gray-700 space-y-3 leading-relaxed"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            <p className="m-0">
              Think of dividends as a <strong>locked treasure chest</strong> plus a{' '}
              <strong>membership card</strong> (the NFT).
            </p>
            <p className="m-0">
              At launch we buy <strong>20% of all $BOP</strong> (200M of 1B) and send it into a vault
              contract on Robinhood Chain. That vault is <strong>fully locked</strong>: there is no
              owner withdraw button — tokens can only leave when someone with an NFT presses{' '}
              <strong>Claim</strong>.
            </p>
            <p className="m-0">
              Membership NFTs are a <strong>fixed swap</strong>, not a second locked treasury:{' '}
              <strong>400,000 $BOP ↔ 1 NFT</strong>, always reversible. With{' '}
              <strong>500 NFTs</strong> max, at most <strong>200M $BOP</strong> (20% of supply) can ever
              be exchanged into the collection. Holding the NFT is what makes you eligible for
              dividends — raw $BOP alone does not.
            </p>
            <p className="m-0">
              Every <strong>3 hours</strong> (per wallet), claim a slice of whatever is still in the
              vault. The slice is <strong>1% of the remaining vault</strong>, then scaled by how many
              NFTs you hold out of 500.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dividends/how-it-works"
              className="inline-block text-sm px-4 py-2 border border-gray-800 bg-white text-gray-900 hover:bg-gray-100 no-underline"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              How dividends work →
            </Link>
            <Link
              to="/dividends/my-nfts"
              className="inline-block text-sm px-4 py-2 border border-gray-800 bg-white text-gray-900 hover:bg-gray-100 no-underline"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Check your NFTs →
            </Link>
          </div>
        </section>

        {/* Live desk: swap (left) + claim (right) */}
        <section className="mb-8">
          <h2
            className="bop-pixel-title mb-3"
            style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)' }}
          >
            Swap &amp; claim
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT — Swap */}
            <div className="border border-gray-400 bg-white flex flex-col">
              <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
                <h3
                  className="bop-pixel-title m-0 text-gray-900"
                  style={{ fontSize: '1.125rem' }}
                >
                  $BOP ↔ NFT
                </h3>
                <p className="text-xs text-gray-600 mt-1 mb-0" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Fixed rate · always reversible
                </p>
              </div>

              <div className="p-4 flex flex-col gap-4 flex-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="flex border border-gray-400">
                  <button
                    type="button"
                    onClick={() => setSwapDir('in')}
                    className={`flex-1 text-sm py-2 ${
                      swapDir === 'in'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    $BOP → NFT
                  </button>
                  <button
                    type="button"
                    onClick={() => setSwapDir('out')}
                    className={`flex-1 text-sm py-2 border-l border-gray-400 ${
                      swapDir === 'out'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    NFT → $BOP
                  </button>
                </div>

                <div className="border border-gray-300 bg-gray-50 p-3 space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{swapDir === 'in' ? 'You pay' : 'You burn'}</span>
                    <span>{swapDir === 'in' ? 'You receive' : 'You receive'}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="font-mono text-sm text-gray-900">
                      {swapDir === 'in'
                        ? `${formatBop(swapCost)} $BOP`
                        : `${Math.max(1, nftQty)} NFT`}
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className="font-mono text-sm text-gray-900 text-right">
                      {swapDir === 'in'
                        ? `${Math.max(1, nftQty)} NFT`
                        : `${formatBop(swapCost)} $BOP`}
                    </div>
                  </div>
                  <label className="flex items-center justify-between gap-2 text-xs text-gray-700 pt-1">
                    <span>Quantity</span>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={nftQty}
                      onChange={(e) => setNftQty(Number(e.target.value) || 1)}
                      className="w-20 border border-gray-400 px-2 py-1 font-mono text-sm text-right"
                    />
                  </label>
                  <p className="text-[10px] text-gray-500 m-0">
                    {formatBop(SWAP_AMOUNT)} $BOP per NFT · max supply {MAX_NFTS}
                  </p>
                </div>

                {!publicKey ? (
                  <button
                    type="button"
                    className={panelBtn}
                    disabled={connecting}
                    onClick={() => void connect()}
                  >
                    {connecting ? 'Connecting…' : 'Connect MetaMask'}
                  </button>
                ) : (
                  <button type="button" className={panelBtn} disabled={!contractsLive}>
                    {contractsLive
                      ? swapDir === 'in'
                        ? 'Swap for NFT'
                        : 'Redeem NFT'
                      : 'Swap (contracts soon)'}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT — Claim + stats */}
            <div className="border border-gray-400 bg-white flex flex-col">
              <div className="border-b border-gray-300 bg-gray-50 px-4 py-3">
                <h3
                  className="bop-pixel-title m-0 text-gray-900"
                  style={{ fontSize: '1.125rem' }}
                >
                  Claim desk
                </h3>
                <p className="text-xs text-gray-600 mt-1 mb-0" style={{ fontFamily: 'Arial, sans-serif' }}>
                  1% of vault left · every 3 hours
                </p>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="border border-gray-300 bg-gray-50 px-3">
                  <StatRow
                    label="Tokens left in pool"
                    value={`${formatBop(vaultLeft)} $BOP`}
                    hint={contractsLive ? 'On-chain vault balance' : 'Launch target (live when vault is set)'}
                  />
                  <StatRow
                    label="NFTs minted / holders"
                    value={`${nftsMinted} / ${MAX_NFTS}`}
                    hint="Minted so far · max 500"
                  />
                  <StatRow label="Your NFTs" value={String(yourNfts)} />
                  <StatRow
                    label="Next claim"
                    value={yourNfts > 0 ? 'Ready' : '—'}
                    hint="Per-wallet 3h cooldown"
                  />
                </div>

                <div className="border border-gray-300 px-3 bg-white">
                  <StatRow
                    label="Expected this claim"
                    value={
                      yourNfts > 0 ? `${formatBop(preview.perClaim)} $BOP` : 'Hold an NFT to preview'
                    }
                    hint="(your NFTs / 500) × 1% × pool"
                  />
                  <StatRow
                    label="Est. per day (8×)"
                    value={yourNfts > 0 ? `${formatBop(preview.perDay)} $BOP` : '—'}
                  />
                  <StatRow
                    label="Est. daily ROI"
                    value={
                      yourNfts > 0 ? `${preview.dailyRoiPct.toFixed(2)}% of swap cost` : '—'
                    }
                    hint="vs 400k $BOP per NFT · falls as pool shrinks"
                  />
                  <StatRow
                    label="Est. days to reclaim cost"
                    value={
                      preview.daysToBreakeven != null
                        ? `~${Math.ceil(preview.daysToBreakeven)} days`
                        : '—'
                    }
                    hint="Illustrative at current pool size"
                  />
                </div>

                {!publicKey ? (
                  <button
                    type="button"
                    className={panelBtn}
                    disabled={connecting}
                    onClick={() => void connect()}
                  >
                    {connecting ? 'Connecting…' : 'Connect MetaMask'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={panelBtn}
                    disabled={!contractsLive || yourNfts < 1}
                  >
                    {contractsLive ? 'Claim dividends' : 'Claim (contracts soon)'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 border border-gray-400 bg-gray-50 p-5">
          <h2
            className="bop-pixel-title mb-3"
            style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)' }}
          >
            Numbers (1B total supply)
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <div className="border border-gray-300 bg-white p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Locked vault</p>
              <p className="font-mono text-gray-900 m-0">200,000,000 $BOP (20%)</p>
              <p className="text-xs text-gray-600 mt-1 mb-0">Dividend pool — no one can withdraw</p>
            </div>
            <div className="border border-gray-300 bg-white p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">NFT swap capacity</p>
              <p className="font-mono text-gray-900 m-0">200,000,000 $BOP (20%)</p>
              <p className="text-xs text-gray-600 mt-1 mb-0">
                Max exchangeable: 500 × 400,000 — not a locked pool
              </p>
            </div>
            <div className="border border-gray-300 bg-white p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Swap rate</p>
              <p className="font-mono text-gray-900 m-0">400,000 $BOP ↔ 1 NFT</p>
              <p className="text-xs text-gray-600 mt-1 mb-0">Always reversible 1:1 at that rate</p>
            </div>
            <div className="border border-gray-300 bg-white p-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Claim drip</p>
              <p className="font-mono text-gray-900 m-0">R = 1% · every 3 hours</p>
              <p className="text-xs text-gray-600 mt-1 mb-0">Per wallet cooldown, not global</p>
            </div>
          </div>
        </section>

        <section className="mb-10 border border-gray-400 bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2
              className="bop-pixel-title m-0"
              style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)' }}
            >
              The Collection
            </h2>
            {githubNftsRepoUrl ? (
              <a
                href={githubNftsRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 border border-gray-800 bg-white text-gray-900 hover:bg-gray-100 no-underline"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <IconGitHub className="w-4 h-4 shrink-0" />
                View on Git
              </a>
            ) : null}
          </div>

          <div className="space-y-4">
            {[row1, row2].map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
              >
                {row.map((nft) => (
                  <div
                    key={nft.id}
                    className="border border-gray-400 bg-gray-50 flex flex-col overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-200 flex items-center justify-center border-b border-gray-300">
                      {nft.image ? (
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className="text-[10px] uppercase tracking-wide text-gray-500 px-2 text-center"
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          Artwork TBA
                        </span>
                      )}
                    </div>
                    <div
                      className="px-2 py-2 text-center text-xs font-semibold text-gray-900"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {nft.name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DividendsPage;
