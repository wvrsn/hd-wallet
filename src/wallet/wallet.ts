import { Mnemonic } from '../mnemonic';
import { EthereumHDWallet } from './ethereum-wallet';
import { SolanaHDWallet } from './solana-wallet';

export type Account = {
  privateKey: string;
  publicKey: string;
};

export type AccountsOptions = {
  quantity?: number;
  hdPathFn?: (accountIndex: number) => string;
};

export interface HDWallet {
  accounts(secret: Mnemonic, params?: AccountsOptions): Promise<Account[]>;
}

export const Wallet = {
  ethereum: 'ethereum',
  solana: 'solana'
} as const;

const ethereum = new EthereumHDWallet();
const solana = new SolanaHDWallet();

export const wallets: Record<(typeof Wallet)[keyof typeof Wallet], HDWallet> = {
  ethereum: ethereum,
  solana: solana
};
