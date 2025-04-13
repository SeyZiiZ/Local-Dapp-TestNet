interface ActionButtonsProps {
    onAddNetwork: () => Promise<void>;
    onFaucet: () => Promise<void>;
}

export default function ActionButtons({ onAddNetwork, onFaucet }: ActionButtonsProps) {
    return (
        <div className="flex space-x-2 mt-6">
            <button onClick={onAddNetwork} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors cursor-pointer">
                Ajouter le réseau local
            </button>
            <button onClick={onFaucet} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors cursor-pointer">
                Recevoir du faucet
            </button>
        </div>
    )
}