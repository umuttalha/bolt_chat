import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

  function sendMessag1e() {
    socket.emit('mesaj', "Mesajınızı girin");
  }




  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: "you",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }




  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });


    socket.on('mesaj', (data) => {
      console.log('Serverdan gelen mesaj:', data);
    });


    socket.on("room_change", (data) => {
      console.log("buradayım")
      console.log(data)
      // setOnlineUsers((prev)=> [...prev,data.userId]);
    });



  }, [socket]);


  console.log(onlineUsers)
  

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>

        {/* <button className="p-5 bg-neutral-900" onClick={sendMessag1e}>denemefalan</button> */}

        {onlineUsers}

      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index} // Add a unique key here
                className="message"
                id={"you" === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
