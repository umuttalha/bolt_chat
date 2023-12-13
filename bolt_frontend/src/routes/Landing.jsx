import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';

export default function Landing() {


  useEffect(() => {
    localStorage.getItem("theme") === "dark" && document.documentElement.classList.add("dark");
  }, []);

  const darkModeFunc = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.getItem("theme") == "dark" ? localStorage.setItem("theme", "light") : localStorage.setItem("theme", "dark");
  };


//   Cookies.set('token', 'value', { expires: 14 })

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center dark:bg-black">
      <button onClick={darkModeFunc} className="p-4 bg-gray-600">
        Dark mode
      </button>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bolt Chat</h1>
        <p className="text-gray-600">Like others but better one.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Get Started
        </button>
      </div>
    </div>
  );
}
