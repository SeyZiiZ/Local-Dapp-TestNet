import React from 'react';
import { useWallet } from '../hooks/useWallet';
import WalletHeader from '../components/home/WalletHeader';
import BalanceCard from '../components/home/BalanceCard';
import SendForm from '../components/home/SendForm';
import WithdrawForm from '../components/home/WithdrawForm';
import ActionButtons from '../components/home/ActionButtons';
import StatusMessage from '../components/home/StatusMessage';
import ChatBot from '../components/home/ChatBot';
import MiniFooter from '../components/MiniFooter';

export default function Home() {
  const {
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
  } = useWallet();

  const handleAmountSendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSend(e.target.value);
  };

  const handleAmountWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountWithdraw(e.target.value);
  };

  return (
    <section className="relative bg-teal-900 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        src="src/assets/fauna-assets/headers/bg-waves.png"
        alt=""
      />

      <WalletHeader />

      <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* WALLET */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-teal-900 font-semibold mb-2">Flora&Fauna Wallet</h2>
              <p className="text-gray-600">Manage your ETH with ease</p>
            </div>

            <StatusMessage error={error} success={success} />
            <BalanceCard balance={balance} />

            <div className="space-y-6">
              <SendForm
                amountSend={amountSend}
                onChange={handleAmountSendChange}
                onSend={transfer}
              />

              <WithdrawForm
                amountWithdraw={amountWithdraw}
                onChange={handleAmountWithdrawChange}
                onWithdraw={withdraw}
              />
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => window.location.reload()}
                className="text-sm font-medium text-teal-600 hover:text-teal-800 cursor-pointer"
              >
                Refresh information
              </button>
            </div>
          </div>
        </div>

        {/* Utils */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-teal-900 font-semibold mb-2">Utilities</h2>
              <p className="text-gray-600">Tools and support</p>
            </div>

            <ActionButtons
              onAddNetwork={addNetwork}
              onFaucet={handleFaucetClick}
            />

            <ChatBot />

          </div>
        </div>
      </div>

      <MiniFooter />
    </section>
  );

}
