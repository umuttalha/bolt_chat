import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';

import LoginModal from "../components/LoginModal";


import { useMyContext } from "../UserContext";

import { redirect } from "react-router-dom";

export default function Landing() {

  // useEffect(() => {
  //   localStorage.getItem("theme") === "dark" && document.documentElement.classList.add("dark");
  // }, []);

  // const darkModeFunc = () => {
  //   document.documentElement.classList.toggle("dark");
  //   localStorage.getItem("theme") == "dark" ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
  // };


  const { user } = useMyContext();


  const [isOpen, setModalOpen] = useState(false);
  

  const openModal = () => {
    if (user == null || user== ''){
      setModalOpen(true);

    }
    else{
      redirect("/messages")

    }
  };

  const onClose = () => {
    setModalOpen(false);
  };





  // Cookies.set('token', 'value', { expires: 14 })

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center dark:bg-black">
      {/* <button onClick={darkModeFunc} className="p-4 bg-gray-600">
        Dark mode
      </button> */}

      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">Bolt Chat</h1>
        <p className="text-gray-600 text-xl">Like others but better one.</p>
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Get Started
        </button>
           <LoginModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
}
