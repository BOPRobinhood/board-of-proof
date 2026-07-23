/**
 * Chain explorer links for Robinhood Chain (EVM).
 * Defaults to rh-scan.xyz. Override with VITE_CHAIN_EXPLORER_TX_BASE /
 * VITE_CHAIN_EXPLORER_ADDRESS_BASE (no trailing slash).
 */

const DEFAULT_TX_BASE = 'https://rh-scan.xyz/tx';
const DEFAULT_ADDRESS_BASE = 'https://rh-scan.xyz/address';

function trimBase(base: string | undefined): string {
  return String(base ?? '')
    .trim()
    .replace(/\/+$/, '');
}

function isEvmTxHash(value: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(value.trim());
}

function isEvmAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

/** Transaction page URL, or empty string if unavailable / non-EVM. */
export function explorerTxUrl(signature: string): string {
  const sig = String(signature ?? '').trim();
  if (!sig) return '';
  const base =
    trimBase(import.meta.env.VITE_CHAIN_EXPLORER_TX_BASE as string | undefined) ||
    (isEvmTxHash(sig) ? DEFAULT_TX_BASE : '');
  if (base) return `${base}/${encodeURIComponent(sig)}`;
  return '';
}

/** Account / address page URL, or empty string if unavailable / non-EVM. */
export function explorerAddressUrl(wallet: string): string {
  const w = String(wallet ?? '').trim();
  if (!w) return '';
  const base =
    trimBase(import.meta.env.VITE_CHAIN_EXPLORER_ADDRESS_BASE as string | undefined) ||
    (isEvmAddress(w) ? DEFAULT_ADDRESS_BASE : '');
  if (base) return `${base}/${encodeURIComponent(w)}`;
  return '';
}

/** Short form: `xxxx…xxxx` for display */
export function truncateWalletDisplay(
  wallet: string,
  headChars = 4,
  tailChars = 4
): string {
  const w = wallet.trim();
  if (w.length <= headChars + tailChars + 1) return w;
  return `${w.slice(0, headChars)}…${w.slice(-tailChars)}`;
}
