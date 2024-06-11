import React, { useState } from 'react';
import MessengerChat from 'react-messenger-customer-chat';

const ChatButton = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const pageId = '251001508398917'; // Replace with your Facebook Page ID
    const appId = '1597362570838620'; // Replace with your Facebook App ID

    const handleChatClick = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <button
                onClick={handleChatClick}
                className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
                aria-label="Chat with us on Messenger"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-8 h-8"
                    fill="currentColor"
                >
                    <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 7.2 16 16 16 8.8 0 16-7.2 16-16 0-8.8-7.2-16-16-16zM17.4 24.1l-4.5-4.5 6.3-6.3-6.6 4.6-4.5-4.5 8.7-8.7 4.5 4.5-6.4 6.3 6.6-4.6 4.5 4.5-8.7 8.7z"/>
                </svg>
            </button>
            {isChatOpen && (
                <div className="fixed bottom-20 right-4 w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                    <div className="flex justify-between items-center p-2 bg-blue-600 text-white">
                        <span>Chat with us</span>
                        <button onClick={handleChatClick} className="text-lg">✕</button>
                    </div>
                    <MessengerChat
                        pageId={pageId}
                        appId={appId}
                        htmlRef="https://www.facebook.com/my-page-name"
                    />
                </div>
            )}
        </>
    );
};

export default ChatButton;