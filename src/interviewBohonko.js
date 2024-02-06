import React from 'react';
import './interview.css';


const ChatContainer = (props) => {

    const {  micTranscription, tabTranscription, copilotFeedback } = props;
    return (
        // <div>
            <div className="chat-container">
                <div className="chat-box">
                    <p className="chat-header">Покупатель</p>
                    <div className="chat-content" id="interviewer-chat">
                        {tabTranscription.map((message, index) => (
                            <div key={index}>
                                <strong>Покупатель: </strong>
                                <span>{message}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-box copilot">
                    <p className="chat-header">Copilot</p>
                    <div className="chat-content" id="copilot-chat">
                        {copilotFeedback.map((message, index) => (
                            <div key={index}>
                                <strong>Copilot: </strong>
                                <span>{message}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-box">
                    <p className="chat-header">Вы</p>
                    <div className="chat-content" id="interviewee-chat">
                        {micTranscription.map((message, index) => (
                            <div key={index}>
                                <strong>Вы: </strong>
                                <span>{message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        // </div>
    );
};

export default ChatContainer;

