const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OUTPUT_PATH = path.join(__dirname, '../src/utils/accounts.json');

async function exportAccounts() {
  try {
    const res = await axios.post('http://localhost:8545', {
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
      id: 1
    });

    const accounts = res.data.result;

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(accounts, null, 2));
    console.log(`✅ Comptes écrits dans ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Erreur récupération des comptes :', error.message);
    process.exit(1);
  }
}

exportAccounts();