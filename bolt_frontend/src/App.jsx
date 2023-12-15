import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Landing from "./routes/Landing";
import ErrorPage from "./routes/ErrorPage";
import MessagePage from "./routes/MessagePage";

import { useMyContext } from "./UserContext";



import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");



export default function App() {
  const { user } = useMyContext();

  return (
    <>
      <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/messages" /> : <Landing />}
        />
        <Route
          path="/messages"
          element={user ? <MessagePage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </>
  );
}
