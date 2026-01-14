import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Send, Loader2, Bot, User, RefreshCw } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "I am your advanced writing assistant. I can help with blog posts, emails, creative writing, or rewriting existing content. How can I help you today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Pass history excluding the latest user message which we just added
      const responseText = await sendChatMessage(
        messages.map(m => ({ role: m.role, text: m.text })),
        userMsg.text
      );

      const aiMsg: ChatMessage = {
        role: 'model',
        text: responseText || "I apologize, I couldn't generate a response.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        role: 'model',
        text: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{
      role: 'model',
      text: "Chat cleared. What shall we write next?",
      timestamp: Date.now()
    }]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
      {/* Chat Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-mono text-sm text-slate-600 font-bold">GHOSTWRITER_GENERAL_V1.0</span>
        </div>
        <button 
            onClick={handleClearChat}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 hover:bg-slate-200 rounded-md"
            title="Clear Chat"
        >
            <RefreshCw size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border ${msg.role === 'user' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div 
                className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
                }`}
            >
                {msg.text}
            </div>
          </div>
        ))}
        {loading && (
             <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-slate-500" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm">
                    <Loader2 className="animate-spin text-blue-500" size={18} />
                </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-12 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-400 shadow-inner"
            placeholder="Describe content to generate or refine..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Powered by Gemini Pro</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;