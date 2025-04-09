export default function Hero() {
    return (
        <section className="p-4 bg-white">
            <div className="pt-16 pb-24 px-5 xs:px-8 xl:px-12 bg-lime-500 rounded-3xl">
                <div className="container mx-auto px-4">
                    <div className="flex mb-4 items-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#022C22"></circle>
                        </svg><span className="inline-block ml-2 text-sm font-medium">Financial Solution</span>
                    </div>
                    <div className="border-t border-teal-900 border-opacity-25 pt-14">
                        <h1 className="font-heading text-4xl sm:text-6xl mb-24">Decentralized financial freedom</h1>
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full sm:w-1/2 px-4 mb-16">
                                <div>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="white"></path>
                                        <circle cx="16" cy="16" r="4" fill="#022C22"></circle>
                                        <circle cx="24" cy="32" r="4" fill="#022C22"></circle>
                                        <circle cx="32" cy="16" r="4" fill="#022C22"></circle>
                                    </svg>
                                    <div className="mt-6">
                                        <h5 className="text-2xl font-medium mb-3">Crypto wallets</h5>
                                        <p className="mb-6">Manage your digital assets securely, without banking intermediaries. Your funds, your control, 24 hours a day.</p><a className="inline-block text-lg  font-medium hover:text-teal-700" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 px-4 mb-16">
                                <div>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="white"></path>
                                        <rect x="23" y="8" width="2" height="12" rx="1" fill="#022C22"></rect>
                                        <rect x="23" y="28" width="2" height="12" rx="1" fill="#022C22"></rect>
                                    </svg>
                                    <div className="mt-6">
                                        <h5 className="text-2xl font-medium mb-3">Decentralization</h5>
                                        <p className="mb-6">No need to trust banks anymore. Blockchain lets you manage your finances freely and transparently.</p><a className="inline-block text-lg  font-medium hover:text-teal-700" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 px-4 mb-16 sm:mb-0">
                                <div>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="white"></path>
                                        <path d="M25 24C25 24.5523 24.5523 25 24 25C23.4477 25 23 24.5523 23 24C23 23.4477 23.4477 23 24 23C24.5523 23 25 23.4477 25 24Z" fill="#022C22"></path>
                                    </svg>
                                    <div className="mt-6">
                                        <h5 className="text-2xl font-medium mb-3">Instant transactions</h5>
                                        <p className="mb-6">Send and receive money internationally without delays or exorbitant bank fees, thanks to crypto-currencies.</p><a className="inline-block text-lg  font-medium hover:text-teal-700" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 px-4">
                                <div>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="white"></path>
                                        <path d="M23.8425 12.3779C23.9008 12.238 24.0992 12.238 24.1575 12.3779L30.1538 26.7692C31.9835 31.1605 28.7572 36 24 36C19.2428 36 16.0165 31.1605 17.8462 26.7692L23.8425 12.3779Z" fill="#022C22"></path>
                                    </svg>
                                    <div className="mt-6">
                                        <h5 className="text-2xl font-medium mb-3">Safety and transparency</h5>
                                        <p className="mb-6">Every transaction is recorded on the blockchain, guaranteeing maximum security and total transparency for all.</p><a className="inline-block text-lg  font-medium hover:text-teal-700" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}