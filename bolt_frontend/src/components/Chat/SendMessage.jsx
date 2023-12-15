import React, { useState } from 'react';

const SendMessage = () => {
  const [message, setMessage] = useState('');


  

  const handleSendMessage = () => {
    // Implement your send message logic here
    // Clear the input after sending the message
    setMessage('');
  };

  return (
    <div className="fixed bottom-0 bg-gray-200 w-full py-4 px-7 shadow-lg">
      <div className=" flex">
        <input
          type="text"
          className="w-full max-w-screen-lg mx-auto p-2 rounded-l-lg focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="button"
          className="bg-gray-500 text-white rounded-r-lg px-5 ml-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
