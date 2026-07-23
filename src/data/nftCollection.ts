/**
 * BOP Reward NFT collection display data.
 * Art lives in `public/images/nfts/{id}.png` (1.png … 500.png).
 */
export type NftCollectionItem = {
  id: number;
  name: string;
  /** Public URL path */
  image: string;
};

const TOTAL_SUPPLY = 500;

function nftItem(id: number): NftCollectionItem {
  return {
    id,
    name: `Proof #${String(id).padStart(3, '0')}`,
    image: `/images/nfts/${id}.png`,
  };
}

/** Full set (1–500) — use when you need the whole collection. */
export const NFT_COLLECTION_ALL: NftCollectionItem[] = Array.from(
  { length: TOTAL_SUPPLY },
  (_, i) => nftItem(i + 1)
);

/** Two showcase rows on Dividend Claims (10 tiles). */
export const NFT_COLLECTION_SHOWCASE: NftCollectionItem[] = NFT_COLLECTION_ALL.slice(0, 10);
