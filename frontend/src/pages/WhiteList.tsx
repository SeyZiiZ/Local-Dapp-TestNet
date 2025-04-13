import { useState } from "react";
import ConnectWalletButton from "../components/wallet/ConnectWalletButton";
import { UserService } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function WhitelistPage() {
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [requestSended, setRequestSended] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleButtonWallet = (address: string) => {
        setMessage("");
        setWalletAddress(address);
    }

    const requestWhitelist = async () => {
        if (walletAddress.trim() === "") {
            setMessage("No Wallet provided");
            return;
        }
        try {
            const response = await UserService.addUserWallet(walletAddress);
            if (!response.success) {
                setMessage("Error Adding Your Wallet");
            }
            setRequestSended(!requestSended);

            setMessage("✅ Request sent, you will be whitelisted in less than 24 hours, redirecting...");
            setTimeout(() => {
                navigate('/');
            }, 2000)
            return; 
        } catch (err) {
            setMessage("❌ Request error");
            console.log(err);
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
                {!requestSended &&
                <button
                    onClick={requestWhitelist}
                    className="mt-6 w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
                >
                    Envoyer
                </button>}
            </div>
        </div>

    );
}