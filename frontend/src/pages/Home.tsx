import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, formatEther, parseEther } from 'ethers';
import Wallet from '../artifacts/contracts/Wallet.sol/Wallet.json';
import { UserService } from '../api/user';
import { hardhatLocalParams } from '../utils/networkParams';

const walletAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [balance, setBalance] = useState<number | string>(0);
  const [amountSend, setAmountSend] = useState<number | string>(0);
  const [amountWithdraw, setAmountWithdraw] = useState<number | string>(0);
  const [error, setError] = useState<string>('');
  const [succes, setSucces] = useState<string>('');

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(walletAddress, Wallet.abi, provider);

        const data = await contract.getBalance({ from: accounts[0] });
        setBalance(formatEther(data));
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération du solde");
      }
    }
  }

  async function transfer() {
    if (!amountSend) {
      return;
    }

    setError('');
    setSucces('');
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      try {
        const tx = {
          from: accounts[0],
          to: walletAddress,
          value: parseEther(String(amountSend))
        }
        const transaction = (await signer).sendTransaction(tx);
        (await transaction).wait();
        setAmountSend('');
        await getBalance();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setSucces('Votre argent a bien été transféré, rechargement de votre solde ....');

      } catch (error: any) {
        setError("Erreur lors du transfer");
      }
    }
  }

  function changeAmountSend(e: any) {
    setAmountSend(e.target.value);
  }

  async function withdraw() {
    if (!amountWithdraw) {
      return;
    }
    setError('');
    setSucces('');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, Wallet.abi, signer);

    try {
      const transaction = await contract.withdrawMoney(accounts[0], ethers.parseEther(String(amountWithdraw)))
      await transaction.wait();

      setAmountWithdraw('');
      await getBalance();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setSucces('Votre argent a bien été transféré, rechargement de votre solde ....');

    } catch (error) {
      setError('Une erreur est survenue');
    }
  }

  function changeAmountWithdraw(e: any) {
    setAmountWithdraw(e.target.value);
  }

  useEffect(() => {
    getBalance();
  }, []);

  const addNetwork = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask n'est pas installé !");

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [hardhatLocalParams],
      });
      
    } catch (error) {
      console.error('❌ Erreur ajout réseau local :', error);
    }
  }



  return (
    <section className="relative bg-teal-900 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        src="src/assets/fauna-assets/headers/bg-waves.png"
        alt=""
      />

      {/* Logo */}
      <div className="relative mb-10">
        <div className="inline-block bg-white p-3 rounded-full shadow-lg">
          <svg className="h-10 w-10 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 7V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12Z" stroke="currentColor" strokeWidth="2" />
            <path d="M8.5 19C7.8181 18.1452 7.64075 17.1623 7.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M15.5 19C16.1819 18.1452 16.3593 17.1623 16.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-teal-900 font-semibold mb-2">Web3 Wallet</h2>
            <p className="text-gray-600">Gérez vos ETH en toute simplicité</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{String(error)}</p>
            </div>
          )}

          {succes && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              <p>{succes}</p>
            </div>
          )}

          <div className="mb-8 p-6 bg-teal-50 rounded-xl text-center">
            <h3 className="text-gray-700 mb-2">Votre solde</h3>
            <p className="text-3xl font-bold text-teal-600">{balance} <span className="text-xl">ETH</span></p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="flex items-center text-lg font-medium text-gray-700 mb-4">
                <svg className="h-5 w-5 mr-2 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                Envoyer des ETH
              </h3>
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="amountSend"
                  placeholder="Montant en ETH"
                  onChange={changeAmountSend}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                />
              </div>
              <button
                onClick={transfer}
                className="w-full py-3 px-4 flex justify-center items-center text-lg font-medium text-teal-900 bg-lime-500 hover:bg-lime-600 border border-lime-500 rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
              >
                Envoyer
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="flex items-center text-lg font-medium text-gray-700 mb-4">
                <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" transform="rotate(180 10 10)" />
                </svg>
                Retirer des ETH
              </h3>
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="amountWithdraw"
                  placeholder="Montant en ETH"
                  onChange={changeAmountWithdraw}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                />
              </div>
              <button
                onClick={withdraw}
                className="w-full py-3 px-4 flex justify-center items-center text-lg font-medium text-white bg-red-500 hover:bg-red-600 border border-red-500 rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retirer
              </button>
            </div>
          </div>

          <button onClick={addNetwork} className="px-4 py-2 bg-emerald-600 text-white rounded">
            Ajouter le réseau local
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="text-sm font-medium text-teal-600 hover:text-teal-800"
            >
              Actualiser les informations
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-12 text-center">
        <p className="text-sm text-white opacity-80">
          © {new Date().getFullYear()} Web3 Wallet. Tous droits réservés.
        </p>
      </div>
    </section>
  )

}