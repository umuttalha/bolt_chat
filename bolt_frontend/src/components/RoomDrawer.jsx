import React, { useState } from "react";

import { FaCompass } from "react-icons/fa";
import { useMyContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CiSearch } from "react-icons/ci";
import { FiPlusCircle } from "react-icons/fi";

export const RoomDrawer = ({ setSearchModalOpen }) => {
  const { user, setUser } = useMyContext();
  const navigate = useNavigate();

  function setLogout() {
    setUser(null);
    Cookies.remove("username");
    Cookies.remove("token");
    navigate("/");
  }

  const handleButtonClick = () => {
    setSearchModalOpen(true);
  };

  return (
    <div className="flex">
      <input
        type="checkbox"
        id="drawer-toggle"
        className="relative sr-only peer cursor-pointer"
        // defaultChecked
      />
      <label
        htmlFor="drawer-toggle"
        className="absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64 cursor-pointer"
      >
        <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
        <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
      </label>
      <div className="fixed top-0 left-0 z-5 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
        <div className="px-6 py-4">
          <div className="mt-8 space-y-4">
            <div
              className="flex items-center bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              onClick={handleButtonClick}
            >
              <FiPlusCircle className="mr-2" size={24} />
              Create Chat Room
            </div>

            <div
              className="flex items-center bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              onClick={handleButtonClick}
            >
              <FaCompass className="mr-2" size={24} />
              Discover Chat Room
            </div>
          </div>
        </div>

        <div className="flex justify-center mx-auto">
          <button
            onClick={setLogout}
            className="px-12  py-2 mb-16 absolute bottom-4 text-white bg-red-500 rounded-lg focus:outline-none hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDrawer;
