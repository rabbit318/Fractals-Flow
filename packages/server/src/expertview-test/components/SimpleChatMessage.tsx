import { useState } from 'react';
import { Message, Votes } from '../types';
import { ThumbUpIcon } from './ThumbUpIcon';
import { ThumbDownIcon } from './ThumbDownIcon';

interface SimpleChatMessageProps {
    chatflowid: string;
}

export const SimpleChatMessage = ({ chatflowid }: SimpleChatMessageProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [votes, setVotes] = useState<Votes>({});

    const handleVote = async (messageIndex: number, vote: 'up' | 'down') => {
        try {
            const newVote = votes[messageIndex] === vote ? null : vote;
            setVotes(prev => ({
                ...prev,
                [messageIndex]: newVote
            }));

            await fetch(`/api/v1/chat/${chatflowid}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-request-from': 'internal'
                },
                body: JSON.stringify({
                    messageIndex,
                    vote: newVote
                })
            });
        } catch (error) {
            console.error('Error submitting vote:', error);
            setVotes(prev => ({
                ...prev,
                [messageIndex]: votes[messageIndex]
            }));
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userMessage = { type: 'user', message: input } as Message;
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        
        try {
            const response = await fetch(`/api/v1/chat/${chatflowid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-request-from': 'internal'
                },
                body: JSON.stringify({ question: input })
            });
            
            const data = await response.json();
            const botMessage = { type: 'bot', message: data.text } as Message;
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message-container">
                        <div className={`message-bubble ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}>
                            {msg.message}
                            {msg.type === 'bot' && (
                                <div className="feedback-buttons">
                                    <button 
                                        onClick={() => handleVote(index, 'up')}
                                        className={`vote-button ${votes[index] === 'up' ? 'active' : ''}`}
                                    >
                                        <ThumbUpIcon />
                                    </button>
                                    <button 
                                        onClick={() => handleVote(index, 'down')}
                                        className={`vote-button ${votes[index] === 'down' ? 'active' : ''}`}
                                    >
                                        <ThumbDownIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="message-input"
                />
                <button onClick={sendMessage} className="send-button">
                    ➤
                </button>
            </div>
        </div>
    );
}; 