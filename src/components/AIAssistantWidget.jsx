import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Welcome to TraitInovation Aero AI Systems. How can I assist your team today?'
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'What solutions do you build?',
    'How do you integrate with legacy avionics?',
    'Schedule an executive demo'
  ];

  const handleSend = (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    // Add User Message
    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!userText) setInput('');

    // Generate AI Response
    setTimeout(() => {
      let reply = 'Thank you for your inquiry. Our engineering team specializes in sub-millisecond avionics AI, autonomous mesh networks, and enterprise flight telemetry integration.';
      if (textToSend.toLowerCase().includes('solution')) {
        reply = 'We develop autonomous avionics engines, real-time trajectory optimization algorithms, and fault-tolerant telemetry mesh grids for aerospace operators.';
      } else if (textToSend.toLowerCase().includes('integrate')) {
        reply = 'Our platform natively interfaces with standard aerospace data formats (ARINC 429, ED-102, Asterix, and custom telemetry streams) via edge connectors.';
      } else if (textToSend.toLowerCase().includes('demo') || textToSend.toLowerCase().includes('schedule')) {
        reply = 'We would be glad to arrange a technical discovery session with our Founder Trisha Ray N and executive leadership team. Click "Start a Conversation" below to connect directly!';
      }

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-slate-900 text-white font-semibold shadow-2xl hover:shadow-brand-500/30 border border-brand-accent/40 group hover:scale-105 transition-all duration-300"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white">
            <Bot className="w-4 h-4 text-brand-accent" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-mono tracking-wider uppercase">ASK AERO AI</span>
        </button>
      )}

      {/* CHAT DRAWER DIALOG */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl glass-panel-dark text-white border border-brand-accent/40 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* HEADER */}
          <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-accent border border-brand-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Aero AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE // LATENCY 0.8ms
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES LIST */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs leading-relaxed">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white/10 text-slate-200 border border-white/10 rounded-bl-none font-mono text-[11px]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* QUICK SUGGESTION CAPSULES */}
          <div className="p-3 bg-black/40 border-t border-white/5 space-y-1.5">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
              SUGGESTED QUERIES:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[10px] font-mono text-brand-accent bg-brand-500/10 hover:bg-brand-500/20 px-2.5 py-1 rounded-full border border-brand-500/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI avionics, scale..."
              className="flex-1 bg-white/5 text-xs text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-accent font-mono"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
