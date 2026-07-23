/** EIP-1193 provider (MetaMask and compatible EVM wallets) */

type EthereumRequestArguments = {
  method: string;
  params?: unknown[] | Record<string, unknown>;
};

type EthereumProvider = {
  isMetaMask?: boolean;
  request: (args: EthereumRequestArguments) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

interface Window {
  ethereum?: EthereumProvider;
}
