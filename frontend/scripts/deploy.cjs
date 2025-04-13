const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Wallet = await hre.ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy();
  await wallet.waitForDeployment();

  const address = wallet.target;
  console.log(`✅ Contrat Wallet déployé à l'adresse : ${address}`);

  const outputPath = path.join(__dirname, "../src/utils/contractAddress.json");
  fs.writeFileSync(
    outputPath,
    JSON.stringify({ walletAddress: address }, null, 2)
  );
  console.log(`💾 Adresse enregistrée dans ${outputPath}`);
}

main().catch((error) => {
  console.error("❌ Échec du déploiement :", error);
  process.exitCode = 1;
});
