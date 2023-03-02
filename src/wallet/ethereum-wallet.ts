import { hdkey } from 'ethereumjs-wallet';
import mnemonic, { Mnemonic } from '../mnemonic';
import { Account, AccountsOptions, HDWallet } from './wallet';

const defaultHdPathFn = (i: number) => `m/44'/60'/0'/0/${i}`;

export class EthereumHDWallet implements HDWallet {
  async accounts(
    secret: Mnemonic,
    options?: AccountsOptions
  ): Promise<Account[]> {
    const masterKey = hdkey.fromMasterSeed(
      Buffer.from(await mnemonic.toSeed(secret), 'hex')
    );

    const accounts = [];
    const accountQuantity = options?.quantity || 1;
    const hdPathFn = options?.hdPathFn || defaultHdPathFn;

    for (let i = 0; i < accountQuantity; i++) {
      const childKey = masterKey.derivePath(hdPathFn(i)).getWallet();

      accounts.push({
        privateKey: '0x' + childKey.getAddress().toString('hex'),
        publicKey: childKey.getPrivateKey().toString('hex')
      });
    }

    return accounts;
  }
}
