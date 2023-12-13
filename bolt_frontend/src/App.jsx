import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Landing from "./routes/Landing";
import ErrorPage from "./routes/ErrorPage";
import Message from "./routes/Message";

import { useMyContext } from "./UserContext";

export default function App() {
  const { user } = useMyContext();

  console.log(user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/messages" element={<Message />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}
