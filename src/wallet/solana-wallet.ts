import mnemonic, { Mnemonic } from '../mnemonic';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { Account, AccountsOptions, HDWallet } from './wallet';
import base58 from 'bs58';

const defaultHdPathFn = (i: number) => `m/44'/501'/${i}'/0'`;

export class SolanaHDWallet implements HDWallet {
  async accounts(
    secret: Mnemonic,
    options?: AccountsOptions
  ): Promise<Account[]> {
    const seed = await mnemonic.toSeed(secret);
    const accounts = [];
    const accountQuantity = options?.quantity || 1;
    const hdPathFn = options?.hdPathFn || defaultHdPathFn;

    for (let i = 0; i < accountQuantity; i++) {
      const path = hdPathFn(i);
      const keypair = Keypair.fromSeed(derivePath(path, seed).key);

      accounts.push({
        privateKey: String(base58.encode(keypair.secretKey)),
        publicKey: String(keypair.publicKey.toBase58())
      });
    }

    return accounts;
  }
}
