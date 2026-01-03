
import React, { useState, useRef, useEffect } from 'react';
import { getAIRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في TechNova! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم في اختيار حاسوب أحلامك؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getAIRecommendation(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
        <div className="p-6 bg-sky-600 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <i className="fas fa-robot text-xl"></i>
            </div>
            <div>
              <h2 className="font-bold">المساعد الذكي</h2>
              <p className="text-[10px] text-sky-100 font-medium">مدعوم بتقنية Gemini AI</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform p-1">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-sky-50/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-white border border-sky-100 text-slate-800' 
                : 'bg-sky-600 text-white'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-end">
              <div className="bg-sky-100 text-sky-600 px-4 py-3 rounded-2xl text-xs animate-pulse font-bold">
                جاري التفكير...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white shrink-0">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="مثال: لابتوب للألعاب، جهاز للمونتاج..."
              className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-sky-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-sky-700 disabled:opacity-50 transition-all shadow-lg shadow-sky-100"
            >
              <i className="fas fa-paper-plane-rtl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
