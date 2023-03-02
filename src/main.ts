import mnemonic from './mnemonic';
import { Wallet, wallets } from './wallet/wallet';

const main = async () => {
  const solana = wallets[Wallet.solana];
  console.log('solana');
  console.log(await solana.accounts(mnemonic.generate()));

  const ethereum = wallets[Wallet.ethereum];
  console.log('ethereum based');
  console.log(await ethereum.accounts(mnemonic.generate()));
};

main().catch((err) => console.log(err));
