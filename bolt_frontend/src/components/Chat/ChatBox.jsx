import Message from "./Message";
import { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const messagesEndRef = useRef();
  const [messages, setMassages] = useState([
    {
      id: 1,
      text: "sea",
    },
    {
      id: 2,
      text: "ase",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // <div className="pb-44 pt-20">
    //   {messages.map((message) => (
    //     <Message key={message.id} message={message} />
    //   ))}
    //   <div ref={messagesEndRef}></div>
    // </div>


    <main className="flex">
      <section className="container max-w-2xl mx-auto p-4">

      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}


        <div className="flex items-center justify-start">
          <div className="w-3 overflow-hidden">
            <div className="h-4 bg-green-400 rotate-45 transform origin-bottom-right rounded-sm"></div>
          </div>
          <div className="bg-green-400 p-4 my-6 rounded-lg flex-1">
            🔥🔥🔥🔥Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum!
          </div>
        </div>

      
      
      
      </section>
    </main>
  );
};

export default ChatBox;
