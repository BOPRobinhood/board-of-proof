import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../components/LoginDropdown';

function SpecCard({
  label,
  title,
  kicker,
  children,
  tone = 'white',
}: {
  label: string;
  title: string;
  kicker?: string;
  children: ReactNode;
  tone?: 'white' | 'muted';
}) {
  return (
    <article
      className={`border border-gray-400 ${tone === 'muted' ? 'bg-gray-50' : 'bg-white'} p-5 sm:p-6`}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {label}
      </p>
      <h3
        className="bop-pixel-title text-gray-900 mb-2"
        style={{ marginTop: 0, fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', lineHeight: 1.25 }}
      >
        {title}
      </h3>
      {kicker ? (
        <p
          className="text-sm text-gray-600 mb-4 leading-relaxed"
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          {kicker}
        </p>
      ) : null}
      <div
        className="text-sm text-gray-800 space-y-3 leading-relaxed"
        style={{ fontFamily: 'Times New Roman, serif' }}
      >
        {children}
      </div>
    </article>
  );
}

function SpecNumbered({ items }: { items: { body: ReactNode }[] }) {
  return (
    <ol className="list-decimal list-inside space-y-3 m-0">
      {items.map((item, i) => (
        <li key={i} className="pl-1">
          {item.body}
        </li>
      ))}
    </ol>
  );
}

function SpecBullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 m-0">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function DividendFlowDiagram() {
  const box =
    'min-w-[7.5rem] max-w-[9rem] flex-1 border-2 border-gray-800 bg-white px-2 py-3 text-center';
  const label = 'text-[11px] font-bold text-gray-900 leading-tight';
  const sub = 'text-[10px] text-gray-600 mt-1 leading-snug';

  return (
    <div className="border border-gray-400 bg-gray-50 p-4 sm:p-6 overflow-x-auto">
      <p
        className="bop-pixel-title text-gray-900 mb-4 text-center"
        style={{ marginTop: 0, fontSize: 'clamp(1.05rem, 2.2vw, 1.2rem)', lineHeight: 1.25 }}
      >
        Flow
      </p>
      <div
        className="flex flex-col lg:flex-row lg:items-stretch lg:justify-center gap-3 lg:gap-2"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <div className={box}>
          <div className={label}>Buy $BOP</div>
          <div className={sub}>Launchpad / market</div>
        </div>
        <div className="flex items-center justify-center text-gray-500 text-lg lg:px-1" aria-hidden>
          <span className="lg:hidden">↓</span>
          <span className="hidden lg:inline">→</span>
        </div>
        <div className={box}>
          <div className={label}>Swap → NFT</div>
          <div className={sub}>400,000 $BOP each</div>
        </div>
        <div className="flex items-center justify-center text-gray-500 text-lg lg:px-1" aria-hidden>
          <span className="lg:hidden">↓</span>
          <span className="hidden lg:inline">→</span>
        </div>
        <div className={box}>
          <div className={label}>Hold NFT</div>
          <div className={sub}>Eligibility card</div>
        </div>
        <div className="flex items-center justify-center text-gray-500 text-lg lg:px-1" aria-hidden>
          <span className="lg:hidden">↓</span>
          <span className="hidden lg:inline">→</span>
        </div>
        <div className={`${box} bg-gray-900 border-gray-900`}>
          <div className="text-[11px] font-bold text-white leading-tight">Claim</div>
          <div className="text-[10px] text-gray-300 mt-1 leading-snug">Every 3h · 1% drip</div>
        </div>
        <div className="flex items-center justify-center text-gray-500 text-lg lg:px-1" aria-hidden>
          <span className="lg:hidden">↓</span>
          <span className="hidden lg:inline">→</span>
        </div>
        <div className={box}>
          <div className={label}>Locked vault</div>
          <div className={sub}>Pays $BOP out</div>
        </div>
      </div>
      <p
        className="text-xs text-gray-600 text-center mt-5 mb-0 leading-relaxed"
        style={{ fontFamily: 'Times New Roman, serif' }}
      >
        Swap NFT → $BOP anytime at the same rate (clears pending claims). Vault has no owner
        withdraw — only claims move tokens out.
      </p>
    </div>
  );
}

const HowDividendsWorkPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div
          className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/dividends" className="text-blue-700 hover:text-blue-900 underline">
              ← Back to Dividend claims
            </Link>
          </div>
          <LoginDropdown />
        </div>

        <section className="mb-8">
          <h1
            className="bop-pixel-title mb-6 text-center"
            style={{ marginTop: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            How dividends work
          </h1>
          <DividendFlowDiagram />
        </section>

        <div className="space-y-5 sm:space-y-6 mb-10">
          <SpecCard
            label="Loop"
            title="Token → NFT → claim → repeat"
            kicker="Eligibility comes from holding the NFT, not from raw $BOP balance alone."
          >
            <SpecNumbered
              items={[
                {
                  body: (
                    <>
                      Buy <strong>$BOP</strong> on the launchpad / market.
                    </>
                  ),
                },
                {
                  body: (
                    <>
                      Swap into an NFT at <strong>400,000 $BOP per NFT</strong>. You can always swap
                      back the other way at the same rate.
                    </>
                  ),
                },
                {
                  body: (
                    <>
                      While you hold the NFT, press <strong>Claim</strong> once every{' '}
                      <strong>3 hours</strong> (per wallet).
                    </>
                  ),
                },
                {
                  body: (
                    <>
                      Rewards come from the <strong>locked 20% vault</strong>. Swap the NFT back to
                      tokens and any pending / awaiting claim for that position is cleared.
                    </>
                  ),
                },
              ]}
            />
          </SpecCard>

          <SpecCard
            label="Vault"
            title="Fully locked dividend pool"
            kicker="200M $BOP (20% of 1B supply) lands in a contract nobody can drain."
          >
            <SpecBullets
              items={[
                <>No owner withdraw, no “emergency empty,” no discretionary pull.</>,
                <>Tokens leave only through the claim math below.</>,
                <>
                  Because payouts are a percent of remaining, the vault asymptotically drains — it
                  never hard-zeros from a fixed schedule.
                </>,
              ]}
            />
          </SpecCard>

          <SpecCard
            label="Math"
            title="1% of what’s left, by NFT weight"
            tone="muted"
            kicker="Same formula for every claim. More NFTs = larger slice. Emptier vault = smaller absolute payouts over time."
          >
            <div className="rounded-md bg-white border border-gray-200 p-4 shadow-inner">
              <p
                className="bop-pixel-title text-gray-900 mb-2"
                style={{ marginTop: 0, fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.25 }}
              >
                Claim formula
              </p>
              <pre className="text-xs font-mono text-gray-900 overflow-x-auto whitespace-pre-wrap leading-relaxed m-0">
                {`payout = (your_NFTs / 500) × 1% × vault_remaining

Example at launch (vault ≈ 200M), 1 NFT, one claim:
  (1 / 500) × 0.01 × 200,000,000 ≈ 4,000 $BOP

≈ 8 claims/day → ~32,000 $BOP/day early on for 1 NFT
(falls as the vault shrinks / others claim)`}
              </pre>
            </div>
          </SpecCard>

          <SpecCard
            label="Timing"
            title="One claim per wallet every 3 hours"
            kicker="Cooldown is per wallet — not a single global epoch everyone shares."
          >
            <SpecBullets
              items={[
                <>After a successful claim, that wallet waits 3 hours before the next.</>,
                <>Multiple NFTs in one wallet stack in the formula (linear in NFT count).</>,
                <>
                  If you swap NFT → $BOP, pending or awaiting claims for that position are removed.
                </>,
              ]}
            />
          </SpecCard>

          <SpecCard
            label="Example"
            title="Day-one feel (illustrative)"
            kicker="Assuming vault still near 200M. Real amounts fall as the pool is claimed down."
          >
            <div
              className="overflow-x-auto border border-gray-200 bg-white"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="p-2 border-b border-gray-200">Your NFTs</th>
                    <th className="p-2 border-b border-gray-200">≈ / claim</th>
                    <th className="p-2 border-b border-gray-200">≈ / day (8×)</th>
                  </tr>
                </thead>
                    <tbody className="font-mono text-gray-900">
                  <tr>
                    <td className="p-2 border-b border-gray-100">1</td>
                    <td className="p-2 border-b border-gray-100">~4,000</td>
                    <td className="p-2 border-b border-gray-100">~32,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-100">10</td>
                    <td className="p-2 border-b border-gray-100">~40,000</td>
                    <td className="p-2 border-b border-gray-100">~320,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-100">50</td>
                    <td className="p-2 border-b border-gray-100">~200,000</td>
                    <td className="p-2 border-b border-gray-100">~1,600,000</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-100">500</td>
                    <td className="p-2 border-b border-gray-100">~2,000,000</td>
                    <td className="p-2 border-b border-gray-100">~16,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3 mb-0">
              At R = 1%, if all 500 NFTs stay active the vault drains faster than at 0.5% — still a
              percent-of-remaining drip, so absolute daily rewards fall as the pool shrinks.
            </p>
          </SpecCard>

          <SpecCard label="For you" title="What you’ll do once contracts are live">
            <SpecNumbered
              items={[
                {
                  body: (
                    <>
                      Connect <strong>MetaMask</strong> and register on BOP if you haven&apos;t.
                    </>
                  ),
                },
                {
                  body: <>Swap $BOP → NFT (or buy an NFT already minted via the swap contract).</>,
                },
                {
                  body: (
                    <>
                      Hit <strong>Claim</strong> on Dividend claims when your 3-hour cooldown is clear.
                    </>
                  ),
                },
                {
                  body: (
                    <>
                      Optionally swap NFT → $BOP anytime at the same 400,000 rate (claims reset).
                    </>
                  ),
                },
              ]}
            />
          </SpecCard>
        </div>
      </div>
    </div>
  );
};

export default HowDividendsWorkPage;
