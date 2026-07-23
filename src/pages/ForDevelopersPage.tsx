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
            className="text-sm text-gray-700 mb-4 text-center max-w-2xl mx-auto"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Want to run BOP yourself? Everything is open source — app, contracts, and NFT art.
            Clone it, fill a few env vars, and you&apos;re on a local board.
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

        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
            Want to try it yourself?
          </h2>
          <ol
            className="list-decimal pl-5 space-y-4 text-sm text-gray-800"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            <li>
              <strong>Clone the app</strong>
              <pre className="mt-2 mb-0 border border-gray-300 bg-gray-50 px-3 py-2 text-[0.8125rem] font-mono overflow-x-auto">
{`git clone https://github.com/BOPRobinhood/board-of-proof.git
cd board-of-proof
npm install`}
              </pre>
            </li>
            <li>
              <strong>Add secrets</strong> — copy <code>.env.example</code> → <code>.env</code>, then set at
              least Supabase URL + service role key and your <code>OWNER_WALLET</code> (0x…).
            </li>
            <li>
              <strong>Database</strong> — run the SQL scripts under <code>for_developers/sql/</code> in numeric
              order against your Supabase project (see that folder&apos;s README).
            </li>
            <li>
              <strong>Start locally</strong>
              <pre className="mt-2 mb-0 border border-gray-300 bg-gray-50 px-3 py-2 text-[0.8125rem] font-mono overflow-x-auto">
{`npm run dev`}
              </pre>
              Open <code>http://127.0.0.1:2000</code>, connect MetaMask, register a username.
            </li>
            <li>
              <strong>Optional — ship it</strong> — run the API on a VPS (<code>npm start</code> + reverse
              proxy), put the Vite build on Netlify, set <code>VITE_API_BASE</code> to your API HTTPS origin.
              Notes live in <code>for_developers/deploy/</code>.
            </li>
          </ol>
        </section>

        <section className="mb-8 border border-gray-300 bg-white p-4">
          <h2 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
            What you get
          </h2>
          <p className="text-sm text-gray-800 m-0 mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>
            Wallet-native forum (boards, threads, votes, PMs), Robinhood Chain attestations for key
            actions, NFT membership swap + dividend vault contracts, and an archive you can verify
            against the chain.
          </p>
          <p className="text-sm text-gray-800 m-0" style={{ fontFamily: 'Times New Roman, serif' }}>
            Deeper docs stay in the repos — start with the app README, then{' '}
            <code>for_developers/README.md</code> if you need routes and env details.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
            Minimum <code>.env</code>
          </h2>
          <pre className="border border-gray-300 bg-gray-50 px-3 py-2.5 text-[0.8125rem] font-mono whitespace-pre-wrap m-0 overflow-x-auto">
{`SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OWNER_WALLET=0x...
ROBINHOOD_RPC_URL=https://...
# optional later: BOP_TOKEN_ADDRESS, attestation contract + relayer key`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default ForDevelopersPage;
