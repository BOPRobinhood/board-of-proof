/**
 * Load root .env and verify ROBINHOOD_RPC_URL + BOP_TOKEN_ADDRESS.
 * Run: npm run check-rpc   or   node scripts/check-rpc.mjs
 *
 * BOP_TOKEN_ADDRESS must be the ERC-20 contract (0x…), not a balance.
 */
import 'dotenv/config';
import { Contract, JsonRpcProvider, isAddress } from 'ethers';

function redactRpc(url) {
  if (!url) return '(empty)';
  return String(url)
    .replace(/api[_-]?key=[^&]+/gi, 'api_key=***')
    .replace(/\/v2\/[A-Za-z0-9_-]+/g, '/v2/***');
}

const rpc =
  process.env.ROBINHOOD_RPC_URL?.trim() ||
  process.env.ETH_RPC_URL?.trim() ||
  process.env.RPC_URL?.trim() ||
  '';
const token =
  process.env.BOP_TOKEN_ADDRESS?.trim() ||
  process.env.LITE_TOKEN_MINT?.trim() ||
  '';

console.log('ROBINHOOD_RPC_URL:', redactRpc(rpc));
console.log(
  'BOP_TOKEN_ADDRESS:',
  token
    ? `${token.slice(0, 6)}…${token.slice(-4)} (${token.length} chars)`
    : '(empty — balance sync returns 0)'
);
console.log(
  'OWNER_WALLET:',
  process.env.OWNER_WALLET?.trim()
    ? process.env.OWNER_WALLET.trim()
    : '(empty — no env owner/admin)'
);

async function main() {
  if (!rpc) {
    console.error('RPC ping: FAILED — set ROBINHOOD_RPC_URL in .env');
    process.exitCode = 1;
    return;
  }

  const provider = new JsonRpcProvider(rpc);
  try {
    const block = await provider.getBlockNumber();
    console.log('RPC ping: OK — block', block);
  } catch (e) {
    console.error('RPC ping: FAILED —', e?.message || e);
    process.exitCode = 1;
    return;
  }

  if (!token) {
    console.log('Token: skipped (empty).');
    return;
  }
  if (!isAddress(token)) {
    console.error('Token: INVALID — expected 0x… EVM address');
    process.exitCode = 1;
    return;
  }

  try {
    const c = new Contract(
      token,
      ['function decimals() view returns (uint8)', 'function symbol() view returns (string)'],
      provider
    );
    const [decimals, symbol] = await Promise.all([c.decimals(), c.symbol().catch(() => '?')]);
    console.log('Token: OK —', String(symbol), 'decimals', Number(decimals));
  } catch (e) {
    console.error('Token: FAILED —', e?.message || e);
    process.exitCode = 1;
  }
}

main();
