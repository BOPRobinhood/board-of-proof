import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../components/LoginDropdown';
import { useWallet } from '../contexts/WalletContext';
import { apiUrl } from '../lib/apiBase';
import { parseApiJson } from '../lib/parseApiJson';
import { explorerTxUrl } from '../lib/explorer';

type OwnedNft = {
  token_id: number;
  name: string;
  image: string;
  minted_at_unix: number | null;
  mint_tx: string | null;
};

type RewardNftsResponse = {
  ok?: boolean;
  error?: string;
  balance?: number;
  nfts?: OwnedNft[];
};

function formatMintedWhen(unix: number | null): string {
  if (unix == null || !Number.isFinite(unix)) return 'Unknown';
  try {
    return new Date(unix * 1000).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return 'Unknown';
  }
}

const MyNftsPage = () => {
  const { publicKey, connect, connecting } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<OwnedNft[]>([]);

  const load = useCallback(async (wallet: string) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(apiUrl(`/api/reward-nfts?wallet=${encodeURIComponent(wallet)}`));
      const j = await parseApiJson<RewardNftsResponse>(r);
      if (!r.ok) throw new Error(j.error || `Request failed (${r.status})`);
      setNfts(Array.isArray(j.nfts) ? j.nfts : []);
    } catch (e) {
      setNfts([]);
      setError(e instanceof Error ? e.message : 'Failed to load NFTs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!publicKey) {
      setNfts([]);
      setError(null);
      return;
    }
    void load(publicKey);
  }, [publicKey, load]);

  const panelBtn =
    'inline-block text-sm px-4 py-2 border border-gray-800 bg-white text-gray-900 hover:bg-gray-100 no-underline disabled:opacity-50';

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

        <section className="mb-8 border border-gray-400 bg-white p-5">
          <h1
            className="bop-pixel-title mb-3 text-center"
            style={{ marginTop: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            Your NFTs
          </h1>
          <p
            className="text-[1.0625rem] text-gray-700 text-center m-0 leading-relaxed"
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
          >
            Membership cards currently held by your connected wallet, with the time each was minted
            on Robinhood Chain.
          </p>
        </section>

        {!publicKey ? (
          <section className="border border-gray-400 bg-white p-6 text-center space-y-4">
            <p
              className="text-[1.0625rem] text-gray-800 m-0"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Connect MetaMask to see NFTs you hold.
            </p>
            <button
              type="button"
              className={panelBtn}
              style={{ fontFamily: 'Arial, sans-serif' }}
              disabled={connecting}
              onClick={() => void connect()}
            >
              {connecting ? 'Connecting…' : 'Connect MetaMask'}
            </button>
          </section>
        ) : loading ? (
          <section className="border border-gray-400 bg-white p-6 text-center">
            <p
              className="text-[1.0625rem] text-gray-700 m-0"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              Loading your NFTs…
            </p>
          </section>
        ) : error ? (
          <section className="border border-gray-400 bg-white p-6 text-center space-y-4">
            <p
              className="text-[1.0625rem] text-red-800 m-0"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {error}
            </p>
            <button
              type="button"
              className={panelBtn}
              style={{ fontFamily: 'Arial, sans-serif' }}
              onClick={() => void load(publicKey)}
            >
              Try again
            </button>
          </section>
        ) : nfts.length === 0 ? (
          <section className="border border-gray-400 bg-white p-6 text-center space-y-4">
            <p
              className="text-[1.0625rem] text-gray-800 m-0"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              You don&apos;t hold any BOP membership NFTs yet.
            </p>
            <Link
              to="/dividends"
              className={panelBtn}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Go mint on Dividend claims →
            </Link>
          </section>
        ) : (
          <section>
            <p
              className="text-sm text-gray-600 mb-4"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Holding <strong>{nfts.length}</strong> NFT{nfts.length === 1 ? '' : 's'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {nfts.map((nft) => {
                const txUrl = nft.mint_tx ? explorerTxUrl(nft.mint_tx) : '';
                return (
                  <article
                    key={nft.token_id}
                    className="border border-gray-400 bg-white flex flex-col"
                  >
                    <div className="aspect-square bg-gray-50 border-b border-gray-300 overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-3 flex flex-col gap-1 flex-1">
                      <h2
                        className="bop-pixel-title m-0 text-gray-900"
                        style={{ fontSize: '1rem' }}
                      >
                        {nft.name}
                      </h2>
                      <p
                        className="text-xs text-gray-600 m-0"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        Minted {formatMintedWhen(nft.minted_at_unix)}
                      </p>
                      {txUrl ? (
                        <a
                          href={txUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-700 underline mt-auto pt-1"
                          style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          Mint tx
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MyNftsPage;
