import { useEffect, useState } from 'react';
import { faqItemsData } from './faqData';

type FaqItem = {
    question: string;
    answer: string;
};

export default function FaqAccordion() {
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        setFaqItems(faqItemsData);
    }, [])

    return (
        <section className="py-12 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h1 className="text-6xl mb-6">FAQ</h1>
                    <p className="text-gray-700">Here you will find the answers to the frequently asked questions.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    {faqItems.map((item, index) => (
                        <button
                            key={index}
                            className="flex w-full py-6 px-8 mb-4 items-start justify-between text-left shadow-md rounded-2xl cursor-pointer"
                            onClick={() => toggleAccordion(index)}
                        >
                            <div>
                                <div className="pr-5">
                                    <h5 className="text-lg font-medium">{item.question}</h5>
                                </div>
                                <div
                                    className={`overflow-hidden duration-500 pr-5 ${openIndex === index ? 'mt-4' : 'h-0'}`}
                                >
                                    <p className="text-gray-700">{item.answer}</p>
                                </div>
                            </div>
                            <span className="flex-shrink-0">
                                {openIndex === index ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.69995 12H18.3" stroke="#1D1F1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5.69995V18.3" stroke="#1D1F1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M5.69995 12H18.3" stroke="#1D1F1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                )}
                            </span>
                        </button>
                    ))}

                    <div className="sm:flex py-10 px-5 sm:px-10 bg-orange-50 rounded-2xl mt-24">
                        <div className="mb-4 sm:mb-0 sm:mr-6">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#BEF264"></path>
                                <path d="M13.676 15.5617C11.7951 17.8602 10.6666 20.7983 10.6666 24C10.6666 27.2017 11.7951 30.1398 13.6761 32.4383L18.9201 27.1943C18.3372 26.2694 18 25.174 18 24C18 22.8259 18.3372 21.7306 18.92 20.8057L13.676 15.5617Z" fill="#022C22"></path>
                                <path d="M15.5616 13.6761L20.8056 18.9201C21.7306 18.3372 22.8259 18 24 18C25.174 18 26.2694 18.3372 27.1943 18.9201L32.4383 13.6761C30.1398 11.7951 27.2017 10.6666 24 10.6666C20.7982 10.6666 17.8601 11.7951 15.5616 13.6761Z" fill="#022C22"></path>
                                <path d="M34.3239 15.5617L29.0799 20.8057C29.6628 21.7307 30 22.8259 30 24C30 25.174 29.6627 26.2693 29.0799 27.1943L34.3238 32.4383C36.2048 30.1398 37.3333 27.2017 37.3333 24C37.3333 20.7983 36.2048 17.8602 34.3239 15.5617Z" fill="#022C22"></path>
                                <path d="M32.4382 34.3239L27.1942 29.0799C26.2693 29.6628 25.174 30 24 30C22.8259 30 21.7307 29.6628 20.8057 29.0799L15.5617 34.3239C17.8602 36.2048 20.7983 37.3333 24 37.3333C27.2016 37.3333 30.1397 36.2048 32.4382 34.3239Z" fill="#022C22"></path>
                            </svg>
                        </div>
                        <div>
                            <h5 className="text-xl font-medium mb-4">Still have questions?</h5>
                            <p className="text-gray-700">
                                <span>For assistance, please visit our </span>
                                <a className="inline-block text-black font-medium underline" href="#">Contact Us</a>
                                <span> page. Our dedicated team is ready to help you on your way to a more sustainable and free future.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};