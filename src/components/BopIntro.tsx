import { Link } from 'react-router-dom';

const inlineLink =
  'font-semibold text-blue-700 hover:text-blue-900 underline decoration-blue-700/80';

const BopIntro = () => {
  return (
    <section className="prose-academic">
      <h2 className="section-header">BOP: Board of Proof on Robinhood Chain</h2>

      <p className="academic-text">
        Back in 2013, we had one thing: a forum and an idea. No roadmap, no promises—just people
        talking, disagreeing, building together. The best projects weren&apos;t the ones with the
        most polish; they were the ones where the community actually mattered. Today BOP is that
        spirit on Robinhood Chain: a token paired with an oldschool forum—think bitcointalk meets
        on-chain receipts. Your wallet is your identity, and your stake is how much weight you
        carry in the room.
      </p>

      <p className="academic-text">
        You register with a single <strong>sign message</strong>—no custody, no broad permissions.
        From that, the app only reads your <strong>token balance</strong> on-chain. We don&apos;t
        request anything else: not your other tokens, not your history, not your keys. That
        balance is <strong>on your profile</strong> and <strong>under every post</strong>, so
        everyone sees how aligned someone is in the only metric that matters here—skin in the game.
        The more you hold, the more <em>representable</em> you are: your voice scales with your
        stake, and the largest supporters carry the most influence in how the project&apos;s path
        gets made—not in a backroom, but in threads and votes that match what the chain already
        knows about commitment. The forum isn&apos;t flat: casual discussion stays open, while
        governance votes, treasury moves, and protocol changes sit behind thresholds. The more you
        hold, the more rooms you can access—transparent and on-chain.
      </p>

      <p className="academic-text">
        Nothing here is meant to be opaque: <strong>usernames map to wallets</strong> in an open
        profile store. The forum is organized into{' '}
        <Link to="/forums" className={inlineLink}>
          sections and boards
        </Link>
        —each with its own thread list, markdown posts, and per-board rules for who may start
        threads or reply. <strong>Post voting</strong> (up and down) is stored with the forum; where
        we relay them, <strong>new threads and replies are attested on-chain</strong> so hashes
        line up with what you read in the UI, while{' '}
        <strong>full post bodies stay in the database</strong> for speed and search. The{' '}
        <Link to="/forums/archive" className={inlineLink}>
          Archive &amp; Verify
        </Link>{' '}
        flow is there so anyone can check what was committed. The whole stack—backend,
        frontend—is <strong>open source</strong>.
      </p>

      <p className="academic-text">
        Dividends are simple: we lock <strong>20% of supply</strong> in a vault (no one can pull it
        out). Membership is a separate swap: <strong>400,000 $BOP ↔ 1 NFT</strong>,{' '}
        <strong>500 max</strong> — so up to another <strong>200M $BOP</strong> can be exchanged into
        NFTs over time (not a second locked pool). Hold the NFT → claim every{' '}
        <strong>3 hours</strong> → get{' '}
        <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">
          (your NFTs / 500) × 1% × vault left
        </code>
        . More NFTs, bigger slice; emptier vault, smaller payouts — the chest drips, it doesn&apos;t
        dump. Full walkthrough:{' '}
        <Link to="/dividends" className={inlineLink}>
          Dividend claims
        </Link>
        .
      </p>

      <p className="academic-text">
        The code is open source—forum backend and frontend—built to be forked. Clone the repo,
        tune the config, and run your own board with the same structure. Just a board of proof:
        holders, threads, and receipts on Robinhood Chain.
      </p>

      <p className="academic-text !mb-0 flex flex-wrap items-start gap-2 pb-12 md:pb-16">
        <img
          src="/icons/snowball-48.png"
          alt=""
          width={28}
          height={28}
          className="mt-0.5 h-7 w-7 shrink-0 object-contain"
          decoding="async"
        />
        <span>
          Want to read more?{' '}
          <a
            href="/Papers/boardpaper.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 underline"
          >
            Read our Boardpaper
          </a>
        </span>
      </p>

      <h2 className="section-header mt-0">Create your project&apos;s Liteboard</h2>

      <p className="academic-text">
        A <strong>Liteboard</strong> is a small, separate forum tied to{' '}
        <strong>one Robinhood Chain ERC-20 token</strong>, outside the main BOP section boards. Connect
        a wallet, paste the token contract (<code className="text-sm">0x…</code>), and sign so we know
        which wallet will <strong>own</strong> the board. The server issues a{' '}
        <strong>one-time code</strong> (stored only as a hash; it expires and works once). Register a
        BOP username if needed, then sign again with that code to <strong>create</strong> the board.
      </p>

      <p className="academic-text">
        Each Liteboard gets two channels: <strong>Announcement</strong>, where only the registered owner
        wallet may post (so token stewards can publish updates), and <strong>General</strong>, where any{' '}
        <strong>registered BOP user</strong> can start threads and reply—so holders and community
        members can talk without each project running its own forum stack. Boards are reachable at{' '}
        <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">/liteboard/&lt;token&gt;</code> and
        discoverable from the <strong>Liteboard Explorer</strong> by searching a contract address.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 not-prose">
        <Link
          to="/liteboard/deploy"
          className="text-sm px-4 py-2 border border-gray-800 bg-white text-gray-900 hover:bg-gray-100 text-center no-underline inline-block"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Deploy a Liteboard
        </Link>
        <Link
          to="/liteboard/explorer"
          className="text-sm px-4 py-2 border border-gray-400 bg-white text-blue-800 hover:bg-gray-50 text-center no-underline inline-block"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Liteboard Explorer
        </Link>
      </div>
    </section>
  );
};

export default BopIntro;
