interface BalanceCardProps {
    balance: number | string;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
    return (
        <div className="mb-8 p-6 bg-teal-50 rounded-xl text-center">
            <h3 className="text-gray-700 mb-2">Your balance</h3>
            <p className="text-3xl font-bold text-teal-600">{balance} <span className="text-xl">ETH</span></p>
        </div>
    )
}
