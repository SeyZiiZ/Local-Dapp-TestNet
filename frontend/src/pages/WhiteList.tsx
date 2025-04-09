import { useState } from "react";
import axios from "axios";
import ConnectWalletButton from "../components/wallet/ConnectWalletButton";

export default function WhitelistPage() {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleButtonWallet = (address: string) => {
        setWalletAddress(address);
    }

    const requestWhitelist = async () => {
        try {
            /*
              const response = await axios.post(
                "http://localhost:3000/whitelist/request",
                { walletAddress },
                { withCredentials: true }
              );
            */
            setMessage("✅ Request sent, you will be whitelisted in less than 24 hours");
            console.log("Wallet : ", walletAddress);
        } catch (err) {
            setMessage("❌ Request error");
        }
    };

    return (
        <div className="relative min-h-screen bg-teal-900 flex items-center justify-center px-4 py-12">
            <img
                src="/src/assets/fauna-assets/headers/bg-waves.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-teal-800">Whitelist request</h2>
                    <p className="text-gray-500 text-sm mt-1">Connect your Metamask wallet to make a request</p>
                </div>

                <ConnectWalletButton onAddressDetected={handleButtonWallet} />

                {message && (
                    <div
                        className={`mt-6 text-center font-medium p-3 rounded-xl ${message.startsWith("✅")
                                ? "bg-green-50 text-green-700 border border-green-400"
                                : "bg-red-50 text-red-700 border border-red-400"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <button onClick={requestWhitelist}>Envoyé</button>
            </div>
        </div>

    );
}