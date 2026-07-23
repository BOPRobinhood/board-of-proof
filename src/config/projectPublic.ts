/**
 * Public launch / branding — edit `project.public.json` at the repo root and commit.
 * Server uses the same file for $BOP token when `BOP_TOKEN_ADDRESS` is unset (env wins if set).
 */
import raw from '../../project.public.json';

export interface ProjectPublicConfig {
  bopTokenAddress?: string;
  /** @deprecated use bopTokenAddress */
  liteTokenMint?: string;
  /** Deployed BopRewardNft (0x…). Empty / TBA until set. */
  bopRewardNftAddress?: string;
  githubRepoUrl: string;
  /** Solidity contracts (vault, reward NFT, attestation). */
  githubContractsRepoUrl?: string;
  /** NFT collection art + metadata. */
  githubNftsRepoUrl?: string;
  twitterProfileUrl: string;
}

export const projectPublicConfig = raw as ProjectPublicConfig;

const mintRaw = (
  projectPublicConfig.bopTokenAddress ??
  projectPublicConfig.liteTokenMint ??
  ''
).trim();

/** Shown on profile / marketing; "TBA" when unset or placeholder. */
export const liteTokenMintDisplay =
  !mintRaw || /^tba$/i.test(mintRaw) ? 'TBA' : mintRaw;

export const liteTokenMintCanCopy = liteTokenMintDisplay !== 'TBA';

export const githubRepoUrl = (projectPublicConfig.githubRepoUrl ?? '').trim();
export const githubContractsRepoUrl = (
  projectPublicConfig.githubContractsRepoUrl ?? ''
).trim();
export const githubNftsRepoUrl = (projectPublicConfig.githubNftsRepoUrl ?? '').trim();
export const twitterProfileUrl = (projectPublicConfig.twitterProfileUrl ?? '').trim();

const nftRaw = (projectPublicConfig.bopRewardNftAddress ?? '').trim();
/** Public NFT contract address, or empty when unset / TBA. */
export const bopRewardNftAddress =
  !nftRaw || /^tba$/i.test(nftRaw) ? '' : nftRaw;
