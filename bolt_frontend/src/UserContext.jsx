import React, { createContext, useState, useContext } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [user, setUser] = useState("pb.authStore.model");

 
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}