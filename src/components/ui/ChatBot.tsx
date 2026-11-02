import React, { useState } from 'react';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { sendChatMessage, type ChatMessage } from '../../services/chatService';
import './ChatBot.css';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: 'Hi! I am the Ikasle assistant. Ask me about our services, process or how we can help your brand grow.',
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = { role: 'user', content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft('');
    setError('');
    setIsSending(true);

    try {
      const answer = await sendChatMessage(nextMessages);
      setMessages((current) => [...current, { role: 'assistant', content: answer }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'The assistant could not respond right now.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`chatbot${isOpen ? ' is-open' : ''}`}>
      {isOpen && (
        <section className="chatbot-panel" aria-label="Ikasle chat assistant">
          <header className="chatbot-header">
            <span className="chatbot-avatar" aria-hidden="true"><Bot size={20} /></span>
            <div>
              <strong>Ikasle Assistant</strong>
              <small><i /> Here to help</small>
            </div>
            <button type="button" className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chatbot-message chatbot-message--${message.role}`} key={`${message.role}-${index}`}>
                {message.content}
              </div>
            ))}
            {isSending && <div className="chatbot-message chatbot-message--assistant chatbot-typing"><i /><i /><i /></div>}
            {error && <p className="chatbot-error" role="alert">{error}</p>}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask us anything..."
              aria-label="Message the Ikasle assistant"
              maxLength={500}
              disabled={isSending}
            />
            <button type="submit" aria-label="Send message" disabled={!draft.trim() || isSending}><Send size={17} /></button>
          </form>
        </section>
      )}

      <button type="button" className="chatbot-launcher" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}>
        <span className="chatbot-launcher-icon">{isOpen ? <X size={22} /> : <MessageCircle size={22} />}</span>
        {!isOpen && <span className="chatbot-launcher-copy"><Sparkles size={14} /> Chat with us</span>}
      </button>
    </div>
  );
};

export default ChatBot;