import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, formatEther, parseEther } from 'ethers';
import Wallet from '../artifacts/contracts/Wallet.sol/Wallet.json';
import { hardhatLocalParams } from '../utils/networkParams';
import address from '../utils/contractAddress.json';
import { sendFaucet } from '../utils/sendFaucet';
import Swal from 'sweetalert2';

const walletAddress = address.walletAddress;

export function useWallet() {
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState<number | string>(0);
  const [amountSend, setAmountSend] = useState<number | string>(0);
  const [amountWithdraw, setAmountWithdraw] = useState<number | string>(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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
    if (!amountSend) return;

    setError('');
    setSuccess('');
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
        setSuccess('Votre argent a bien été transféré, rechargement de votre solde ....');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error: any) {
        setError("Erreur lors du transfer");
      }
    }
  }

  async function withdraw() {
    if (!amountWithdraw) return;
    
    setError('');
    setSuccess('');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, Wallet.abi, signer);

    try {
      const transaction = await contract.withdrawMoney(accounts[0], ethers.parseEther(String(amountWithdraw)))
      await transaction.wait();

      setAmountWithdraw('');
      await getBalance();
      setSuccess('Votre argent a bien été transféré, rechargement de votre solde ....');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError('Une erreur est survenue');
    }
  }

  const handleFaucetClick = async () => {
    try {
      await sendFaucet(userAddress);
      Swal.fire({
        icon: 'success',
        title: 'ETH envoyé !',
        text: `You'll be receiving your ETH faucets any second now.`,
        confirmButtonText: 'OK',
      });
    } catch (err: any) {
      console.error("Erreur faucet :", err);
  
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'envoi',
        text: err.message || 'Quelque chose s\'est mal passé.',
        confirmButtonText: 'OK',
      });
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install Metamask");

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];
    setUserAddress(address);
  };

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
  };

  useEffect(() => {
    getBalance();
    connectWallet();
  }, []);

  return {
    userAddress,
    balance,
    amountSend,
    setAmountSend,
    amountWithdraw,
    setAmountWithdraw,
    error,
    success,
    transfer,
    withdraw,
    handleFaucetClick,
    addNetwork,
    getBalance
  };
}