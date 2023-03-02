import { generateMnemonic, mnemonicToSeed } from 'bip39';

export type Mnemonic = string;

const generate = (): Mnemonic => {
  return generateMnemonic();
};

const toSeed = async (mnemonic: Mnemonic): Promise<string> => {
  const seed = await mnemonicToSeed(mnemonic);
  return seed.toString('hex');
};

export default {
  generate,
  toSeed
};
