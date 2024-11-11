import { useState } from 'react'
import { ChatMessage } from '../views/chatmessage/ChatMessage'
import { baseURL } from '@/store/constant'
import './expert-view.css'

export const ExpertView = ({ chatflowid }) => {
    const [sources, setSources] = useState([])

    return (
        <div className="expert-container">
            <div className="source-column">
                <h2>Source Documents</h2>
                <div className="source-list">
                    {sources.map((source, index) => (
                        <div key={index} className="source-item">
                            <h3>{source.title}</h3>
                            <p>{source.preview}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-column">
                <ChatMessage 
                    chatflowid={chatflowid}
                    isFullPage={true}
                />
            </div>
        </div>
    )
}