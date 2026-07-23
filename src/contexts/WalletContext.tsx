/* eslint-disable react-refresh/only-export-components -- provider + useWallet hook */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { BrowserProvider, getAddress } from 'ethers';

type WalletContextValue = {
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  clearError: () => void;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
};

const WalletContext = createContext<WalletContextValue | null>(null);

function getEthereum() {
  return window.ethereum ?? null;
}

function hexSignatureToBytes(sigHex: string): Uint8Array {
  const hex = sigHex.startsWith('0x') ? sigHex.slice(2) : sigHex;
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid signature encoding');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function canonAddress(addr: string): string | null {
  try {
    return getAddress(addr.trim());
  } catch {
    return null;
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Keep React state in sync with MetaMask after refresh / account change */
  useEffect(() => {
    const eth = getEthereum();
    if (!eth) return;

    const syncAccounts = (accounts: unknown) => {
      const list = Array.isArray(accounts) ? accounts : [];
      const first = typeof list[0] === 'string' ? list[0] : null;
      setPublicKey(first ? canonAddress(first) : null);
    };

    void (async () => {
      try {
        const accounts = await eth.request({ method: 'eth_accounts' });
        syncAccounts(accounts);
      } catch {
        /* ignore */
      }
    })();

    const onAccountsChanged = (...args: unknown[]) => syncAccounts(args[0]);
    eth.on?.('accountsChanged', onAccountsChanged);

    return () => {
      eth.removeListener?.('accountsChanged', onAccountsChanged);
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const connect = useCallback(async (): Promise<boolean> => {
    setError(null);
    const eth = getEthereum();
    if (!eth) {
      setError('MetaMask not found. Install from https://metamask.io/');
      return false;
    }
    setConnecting(true);
    try {
      const accounts = (await eth.request({ method: 'eth_requestAccounts' })) as string[];
      const addr = accounts?.[0] ? canonAddress(accounts[0]) : null;
      if (!addr) {
        setError('No wallet account returned');
        return false;
      }
      setPublicKey(addr);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not connect');
      return false;
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    setError(null);
    const eth = getEthereum();
    try {
      await eth?.request?.({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      });
    } catch {
      /* not all wallets support revoke; clear local session anyway */
    }
    setPublicKey(null);
  }, []);

  const signMessage = useCallback(async (message: Uint8Array) => {
    const eth = getEthereum();
    if (!eth) {
      throw new Error('MetaMask not found. Install from https://metamask.io/');
    }
    const provider = new BrowserProvider(eth);
    const signer = await provider.getSigner();
    const sigHex = await signer.signMessage(message);
    return hexSignatureToBytes(sigHex);
  }, []);

  const value = useMemo(
    () => ({
      publicKey,
      connecting,
      error,
      clearError,
      connect,
      disconnect,
      signMessage,
    }),
    [publicKey, connecting, error, clearError, connect, disconnect, signMessage]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return ctx;
}
