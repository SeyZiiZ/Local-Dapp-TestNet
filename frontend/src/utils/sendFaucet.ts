import { ethers } from "ethers";
import { faucetAccounts } from "./faucetWallets";

const PROVIDER_URL = "http://localhost:8545";

export async function sendFaucet(to: string, amountEth: string = "10") {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

  const faucet = new ethers.Wallet(faucetAccounts[0].privateKey, provider);

  const tx = await faucet.sendTransaction({
    to,
    value: ethers.parseEther(amountEth),
  });

  await tx.wait();
  return tx.hash;
}