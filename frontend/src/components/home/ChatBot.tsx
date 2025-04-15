import { useState, useRef, useEffect } from 'react';
import { UserService } from '../../api/user';

export default function ChatBot () {
    const [messages, setMessages] = useState([{ text: "How can I help you with your Web3 portfolio?", isBot: true }]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;
        setMessages(prev => [...prev, { text: input, isBot: false }]);
        setInput('');
    
        try {
            setMessages(prev => [...prev, { text: "I process your request ...", isBot: true }]);
    
            const result = await UserService.askChatBot(input);
    
            setMessages(prev => [...prev, {
                text: result?.response || "Sorry, I didn't understand that.",
                isBot: true
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                text: "Oops! Something went wrong. Please try again later.",
                isBot: true
            }]);
        }
    };
    

    return (
        <div className="mt-8 border border-gray-200 rounded-xl p-6 shadow-lg bg-white max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Web3 Intelligent Assistant</h3>
            <span className="flex items-center text-sm text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
              En ligne
            </span>
          </div>
    
          <div
            ref={chatContainerRef}
            className="bg-gray-50 p-4 rounded-xl mb-4 h-80 overflow-y-auto border border-gray-100 shadow-inner"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-3`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[80%] shadow-sm transition-all duration-300 ${
                    message.isBot
                      ? 'bg-teal-50 text-gray-800 border border-teal-100'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
    
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-gray-700"
            />
            <button
              onClick={handleSendMessage}
              disabled={input.trim() === ''}
              className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Send
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            Powered by secure Blockchain & AI technology
          </div>
        </div>
      );
};
