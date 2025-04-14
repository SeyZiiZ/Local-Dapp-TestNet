import { useNavigate } from "react-router-dom"

export default function WalletHeader() {
    const navigate = useNavigate();

    return (
        <div className="relative mb-10">
            <div className="inline-block bg-white p-3 rounded-full shadow-lg">
                <span onClick={() => navigate("/")} className="cursor-pointer">
                    <svg className="h-10 w-10 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2 7V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M8.5 19C7.8181 18.1452 7.64075 17.1623 7.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M15.5 19C16.1819 18.1452 16.3593 17.1623 16.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>
            </div>
        </div>
    )
}
