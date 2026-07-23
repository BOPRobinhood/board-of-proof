import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LoginDropdown } from '../components/LoginDropdown';
import { bopRewardNftAddress, githubRepoUrl } from '../config/projectPublic';
import { explorerAddressUrl, truncateWalletDisplay } from '../lib/explorer';

const NFT_EXPLORER =
  bopRewardNftAddress && explorerAddressUrl(bopRewardNftAddress)
    ? explorerAddressUrl(bopRewardNftAddress)
    : '';

const bodyStyle = { fontFamily: "'Times New Roman', Times, serif" } as const;

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="bop-pixel-title text-gray-900 mb-3"
      style={{ marginTop: 0, fontSize: 'clamp(1.2rem, 2.8vw, 1.45rem)', lineHeight: 1.25 }}
    >
      {children}
    </h2>
  );
}

function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-[1.0625rem] text-gray-800 leading-relaxed ${className}`} style={bodyStyle}>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="border border-gray-300 bg-gray-50 px-3 py-2.5 text-[0.8125rem] leading-snug whitespace-pre-wrap overflow-x-auto m-0 text-gray-800"
      style={{ fontFamily: 'Consolas, Monaco, ui-monospace, monospace' }}
    >
      {children}
    </pre>
  );
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code
      className="text-[0.8125rem] px-1 py-0.5 bg-gray-100 border border-gray-200 text-gray-800"
      style={{ fontFamily: 'Consolas, Monaco, ui-monospace, monospace' }}
    >
      {children}
    </code>
  );
}

const ContractsPage = () => {
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
            <span className="text-gray-400">|</span>
            <Link to="/dividends" className="text-blue-700 hover:text-blue-900 underline">
              Dividend Claims
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/dividends/how-it-works" className="text-blue-700 hover:text-blue-900 underline">
              How dividends work
            </Link>
          </div>
          <LoginDropdown />
        </div>

        <section className="mb-8 border border-gray-400 bg-white p-5">
          <h1
            className="bop-pixel-title mb-4 text-center"
            style={{ marginTop: 0, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
          >
            On-chain contracts
          </h1>
          <Body className="space-y-3">
            <p className="m-0">
              Two separate contracts on Robinhood Chain — not merged into one. The{' '}
              <strong>NFT swap</strong> holds escrowed $BOP for membership cards. The{' '}
              <strong>dividend vault</strong> (deployed later) holds the claim pool. Neither has an
              owner “withdraw” button: tokens only leave through the intended user actions.
            </p>
            <p className="m-0">
              Product walkthrough (rates, drip, UX):{' '}
              <Link to="/dividends/how-it-works" className="text-blue-700 underline">
                How dividends work
              </Link>
              . This page is the technical / safety desk.
            </p>
          </Body>
        </section>

        <section className="mb-8">
          <SectionTitle>1. Reward NFT (BopRewardNft)</SectionTitle>
          <div className="border border-gray-300 bg-white p-4 space-y-3">
            <Body className="space-y-3">
              <p className="m-0">
                Fixed price: <strong>400,000 $BOP ↔ 1 NFT</strong>. Max <strong>500</strong> ever
                minted. Mint locks that amount in the contract; redeem burns the NFT and returns the
                same amount.
              </p>
              {bopRewardNftAddress ? (
                <p className="m-0">
                  Address:{' '}
                  {NFT_EXPLORER ? (
                    <a
                      href={NFT_EXPLORER}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline break-all"
                    >
                      {bopRewardNftAddress}
                    </a>
                  ) : (
                    <span className="break-all">{bopRewardNftAddress}</span>
                  )}{' '}
                  <span className="text-gray-500">
                    ({truncateWalletDisplay(bopRewardNftAddress, 6, 4)})
                  </span>
                </p>
              ) : (
                <p className="m-0 text-gray-600">Address: TBA</p>
              )}
              <ul className="list-disc pl-5 space-y-1.5 m-0">
                <li>
                  <strong>No owner drain.</strong> There is no <InlineCode>withdraw</InlineCode>,
                  rescue, or skim. Escrowed $BOP can leave only via{' '}
                  <InlineCode>redeemNFT</InlineCode> / <InlineCode>swapOut</InlineCode>.
                </li>
                <li>
                  <strong>One-time token bind.</strong> <InlineCode>setBopToken</InlineCode> runs
                  once; the 400k price locks from the token’s decimals and cannot be changed later.
                </li>
                <li>
                  <strong>1:1 reserve check.</strong> Redeem refuses if the contract would not still
                  cover every remaining NFT at the fixed price.
                </li>
                <li>
                  <strong>Hard cap.</strong> After 500 lifetime mints, further mints revert (
                  <InlineCode>SoldOut</InlineCode>).
                </li>
                <li>
                  <strong>Metadata.</strong> <InlineCode>tokenURI(id)</InlineCode> = IPFS base folder
                  + id + <InlineCode>.json</InlineCode> (images live in the JSON, not on the
                  contract).
                </li>
              </ul>
            </Body>
          </div>
        </section>

        <section className="mb-8 space-y-3">
          <SectionTitle>Why the NFT escrow is safe (snippets)</SectionTitle>
          <Body>
            <p className="m-0">
              Plain English: your swap is reversible at a fixed rate, and the contract cannot be
              emptied by an admin shortcut.
            </p>
          </Body>
          <CodeBlock>
{`// Intentionally NO withdraw / rescue / skim / emergency drain.
// $BOP can only leave via redeemNFT / swapOut.`}
          </CodeBlock>
          <CodeBlock>
{`function setBopToken(address token) external onlyOwner {
    if (address(bopToken) != address(0)) revert TokenAlreadySet();
    // … locks swapAmount = 400_000 * 10**decimals forever
}`}
          </CodeBlock>
          <CodeBlock>
{`function mintNFT() public nonReentrant returns (uint256 tokenId) {
    if (totalMinted >= MAX_SUPPLY) revert SoldOut();
    bopToken.safeTransferFrom(msg.sender, address(this), swapAmount);
    // mint NFT to msg.sender
}`}
          </CodeBlock>
          <CodeBlock>
{`function redeemNFT(uint256 tokenId) public nonReentrant {
    // burn NFT, then:
    // remaining escrow must still cover activeSupply * swapAmount
    bopToken.safeTransfer(msg.sender, swapAmount);
}`}
          </CodeBlock>
        </section>

        <section className="mb-8">
          <SectionTitle>2. Dividend vault (BopDividendVault) — separate</SectionTitle>
          <div className="border border-gray-300 bg-white p-4 space-y-3">
            <Body className="space-y-3">
              <p className="m-0">
                <strong>Not merged into the NFT.</strong> Rewards sit in their own vault. After $BOP
                and the NFT are live, we deploy the vault, wire <InlineCode>setNft</InlineCode> /{' '}
                <InlineCode>setVault</InlineCode> once, then fund the claim pool. Until that address
                is published here, treat this section as the locked design you can already read in
                source.
              </p>
              <p className="m-0 text-gray-600">Address: TBA (not deployed yet)</p>
              <ul className="list-disc pl-5 space-y-1.5 m-0">
                <li>
                  <strong>No owner withdraw.</strong> Same idea as the NFT: tokens leave only via{' '}
                  <InlineCode>claim()</InlineCode>.
                </li>
                <li>
                  <strong>NFT-gated drip.</strong> payout = (nftBalance / 500) × 1% × vaultBalance,
                  cooldown <strong>3 hours</strong> per wallet.
                </li>
                <li>
                  <strong>One-time wiring.</strong> <InlineCode>setNft</InlineCode> once (deployer);
                  NFT <InlineCode>setVault</InlineCode> once (owner). Redeem on the NFT can clear
                  claim cooldown state for that wallet.
                </li>
              </ul>
            </Body>
            <CodeBlock>
{`// Intentionally NO withdraw / recover / owner drain.
// $BOP can only leave via claim().

payout = vaultBalance * nftBalance * 100
       / (MAX_SUPPLY * 10_000);  // 1% × share of 500`}
            </CodeBlock>
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle>What the owner can still do</SectionTitle>
          <Body>
            <ul className="list-disc pl-5 space-y-1.5 m-0">
              <li>
                NFT: one-time <InlineCode>setBopToken</InlineCode>, one-time{' '}
                <InlineCode>setVault</InlineCode>, and update metadata{' '}
                <InlineCode>baseURI</InlineCode> (art/JSON pointer — not escrow).
              </li>
              <li>Owner cannot pull escrowed $BOP or change the 400k rate after the token is set.</li>
              <li>
                Vault (when live): deployer sets NFT once; there is no admin claim of the pool.
              </li>
            </ul>
          </Body>
        </section>

        <section>
          <SectionTitle>Source &amp; verify</SectionTitle>
          <Body>
            <ul className="list-disc pl-5 space-y-1.5 m-0">
              <li>
                Solidity: <InlineCode>contracts/src/BopRewardNft.sol</InlineCode>,{' '}
                <InlineCode>contracts/src/BopDividendVault.sol</InlineCode>
              </li>
              {NFT_EXPLORER ? (
                <li>
                  Verified NFT on explorer:{' '}
                  <a
                    href={NFT_EXPLORER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    open contract
                  </a>
                </li>
              ) : null}
              {githubRepoUrl ? (
                <li>
                  <a
                    href={githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Project repo
                  </a>
                </li>
              ) : null}
              <li>
                App stack / self-host notes:{' '}
                <Link to="/for-developers" className="text-blue-700 underline">
                  For Developers
                </Link>
              </li>
            </ul>
          </Body>
        </section>
      </div>
    </div>
  );
};

export default ContractsPage;
