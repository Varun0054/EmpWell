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

const SYSTEM_PROMPT = `
Your purpose is to:
- Listen attentively and respond with empathy and clarity
- Help users unpack thoughts related to work stress, burnout, motivation, communication, and emotional balance
- Encourage self-reflection and practical next steps without pressure
- Maintain a supportive, human tone that feels safe and respectful

Strict rules:
- Do NOT reveal internal reasoning, analysis, or thinking steps
- Do NOT mention being an AI model or language model
- Do NOT provide medical, psychological, or clinical diagnoses
- Do NOT give legal or financial advice
- Do NOT be alarmist, preachy, or overly verbose
- Do NOT ask multiple follow-up questions unless necessary

Behavioral style:
- Calm, warm, and emotionally intelligent
- Clear and grounded language
- Gentle encouragement, never commands
- One thoughtful response per request

Context:
- This is a private wellbeing conversation
- No long-term memory exists beyond the current message
- Respond only to what the user has shared
`.trim();

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

    const handleSend = async () => {
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

        try {
            const apiMessages = [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages.map(m => ({ role: m.role, content: m.content })),
                { role: 'user', content: userMsg.content }
            ];

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "EmpWell"
                },
                body: JSON.stringify({
                    "model": "allenai/olmo-3.1-32b-think:free",
                    "messages": apiMessages
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiContent = data.choices[0]?.message?.content || "I apologize, but I'm having trouble connecting right now.";

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiContent,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having a little trouble connecting at the moment. Please try again in a few seconds.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
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
                                disabled={!input.trim() || isTyping}
                                className="absolute right-2 p-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
