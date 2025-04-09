import { useState } from "react";

interface ConnectWalletButtonProp {
    onAddressDetected: (address: string) => void;
}

export default function ConnectWalletButton({ onAddressDetected }: ConnectWalletButtonProp) {
    const [walletAddress, setWalletAddress] = useState<string>("");

    const connectWallet = async () => {
        if (!window.ethereum) return alert("Install Metamask");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        setWalletAddress(address);
        onAddressDetected(address);
    };

    return (
        <div className="space-y-4">
            <button
                onClick={connectWallet}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-lime-600 hover:from-teal-600 hover:to-lime-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-200 cursor-pointer"
            >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.25 3.6 10.74 9 12 5.4-1.26 9-6.75 9-12V5l-9-4z" />
                </svg>
                Connect With Metamask
            </button>

            {walletAddress && (
                <div className="bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md shadow-sm text-center break-all">
                    Wallet detected : <span className="font-mono text-teal-600">{walletAddress}</span>
                </div>
            )}
        </div>
    );
}