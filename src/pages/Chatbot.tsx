import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Layout } from '../components/Layout';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

export default function Chatbot() {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello. I'm your wellbeing assistant. I'm here to listen without judgment. How are you feeling today?",
            timestamp: new Date(),
        },
    ]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI delay
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I hear you. This is a safe space. While I'm still learning to provide specific advice, remember that your feelings are valid. Would you like to explore resources for stress management or career clarity?",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Layout>
            <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] max-w-3xl mx-auto">

                {/* Header Information */}
                <div className="mb-4 md:mb-6 text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Powered & Private</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-calm-800">Wellbeing Companion</h1>
                    <p className="text-calm-500 text-sm">A judgement-free zone to unpack your thoughts.</p>
                </div>

                {/* Chat Window */}
                <div className="flex-1 bg-white rounded-3xl shadow-sm border border-calm-200 overflow-hidden flex flex-col">

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={cn(
                                    "flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%]",
                                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    msg.role === 'assistant' ? "bg-sage-100 text-sage-600" : "bg-calm-200 text-calm-600"
                                )}>
                                    {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                                </div>

                                <div className={cn(
                                    "p-3 md:p-4 rounded-2xl text-sm leading-relaxed",
                                    msg.role === 'assistant'
                                        ? "bg-calm-50 text-calm-800 rounded-tl-none border border-calm-100"
                                        : "bg-sage-600 text-white rounded-tr-none shadow-md"
                                )}>
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-4 max-w-[85%]">
                                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 text-sage-600">
                                    <Bot size={18} />
                                </div>
                                <div className="bg-calm-50 p-4 rounded-2xl rounded-tl-none border border-calm-100 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-calm-50 border-t border-calm-100">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your thoughts here..."
                                className="w-full bg-white border border-calm-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-sage-200 transition-all placeholder:text-calm-400"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="absolute right-2 p-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <p className="text-center text-xs text-calm-400 mt-3 hidden md:block">
                            Logic Note: This interface is ready for LLM integration via LangChain/LangFlow.
                        </p>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
