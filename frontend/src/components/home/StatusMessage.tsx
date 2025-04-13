interface StatusMessageProps {
    error?: string;
    success?: string;
}

export default function StatusMessage({ error, success }: StatusMessageProps) {
    return (
        <>
            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}
            {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                    <p>{success}</p>
                </div>
            )}
        </>
    )
}
