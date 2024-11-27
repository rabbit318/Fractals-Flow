import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Source } from './types'
import { SimpleChatMessage } from './components/SimpleChatMessage'
import './expert-view.css'

const ExpertView = () => {
    const { chatflowid } = useParams()
    const [sources, setSources] = useState<Source[]>([])

    useEffect(() => {
        if (!chatflowid) return

        fetch(`/api/v1/chatflows/${chatflowid}/sources`, {
            headers: {
                'Content-Type': 'application/json',
                'x-request-from': 'internal'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSources(data)
        })
    }, [chatflowid])

    if (!chatflowid) return null

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
                <div className="chat-header">
                    <h2>Hi there! How can I help?</h2>
                </div>
                <SimpleChatMessage chatflowid={chatflowid} />
            </div>
        </div>
    )
}

export default ExpertView