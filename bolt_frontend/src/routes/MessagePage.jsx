import React, { useState, useEffect } from "react";

import RoomDrawer from "../components/RoomDrawer";
import UserDrawer from "../components/UserDrawer";
import DiscoverModal from "../components/DiscoverModal";

import ChatBox from "../components/Chat/ChatBox";

import SendMessage from "../components/Chat/SendMessage";

import io from "socket.io-client";

import Cookies from "js-cookie";

import { useMyContext } from "../UserContext";

import Chat from "./Chat";

export default function MessagePage() {
  // const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  // const closeSearchModal = () => {
  //   setSearchModalOpen(false);
  // };

  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = () => {
  //   console.log(`Searching for: ${searchQuery}`);
  // };

  // const token = Cookies.get("token")

  // const socket = io.connect("http://localhost:3000", {
  //   query: { token },
  // });

  // const [room, setRoom] = useState("");

  // const joinRoom = () => {
  //   if ( room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };

  const { user } = useMyContext();


  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [room, setRoom] = useState("");
  const token = Cookies.get("token");



  const socket = io.connect("http://localhost:3000", {
    query: { token },
  });

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room, token:token });
    }
  };

  return (
    <>
      <RoomDrawer setSearchModalOpen={setSearchModalOpen} />
      <UserDrawer />

      <div className="mx-24 my-3 bg-slate-500">
        <h3>Join A Chat</h3>

        <input
          type="text"
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>

        <Chat socket={socket} room={room} />
      </div>

      <div className="absolute w-full bottom-0 bg-slate-100">
        <SendMessage />
      </div>

      {isSearchModalOpen && (
        <DiscoverModal
          handleSearch={handleSearch}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          closeSearchModal={closeSearchModal}
        />
      )}
    </>
  );
}
