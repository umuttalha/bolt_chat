import React, { createContext, useState, useContext } from "react";

import Cookies from "js-cookie";

const MyContext = createContext();


export function MyProvider({ children }) {

  const [user, setUser] = useState(Cookies.get('username'));
  const [room, setRoom] = useState("");

 
  return (
    <MyContext.Provider value={{ user, setUser, room, setRoom}}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}