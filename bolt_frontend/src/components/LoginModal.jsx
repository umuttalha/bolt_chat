import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import WarningComponent from "./WarningComponent";

import { useMyContext } from "../UserContext";

import Cookies from "js-cookie";

export default function LoginModal({ isOpen, onClose }) {


  const { user, setUser } = useMyContext();

  const [loginData, setLoginData] = useState({
    loginUsername: "",
    loginPassword: "",
  });

  const [registerData, setRegisterData] = useState({
    registerUsername: "",
    registerEmail:"",
    registerPassword: "",
    confirmRegisterPassword: "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();


    const handleLogin = async () => {
      try {


        const response = await axios.post('http://localhost:3000/auth/login',{
          username: loginData.loginUsername,
          password: loginData.loginPassword
        })

        console.log(response)
        

        Cookies.set('token', response.data.token, { expires: 14 })
        Cookies.set('username', response.data.username, { expires: 14 })

        
        setUser(response.data.username)


      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    };

    handleLogin()

    onClose()


    setLoginData({
      loginUsername: "",
      loginPassword: "",
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (
      registerData.registerPassword !== registerData.confirmRegisterPassword
    ) {
      setWarningMessage("Passwords not matched");
      setShowWarning(true);

      setTimeout(() => {
        setShowWarning(false);
      }, 2000);

      return;
    }

    if (registerData.registerUsername.length < 3) {
      setWarningMessage("Username must be at least 3 characters long");
      setShowWarning(true);

      setTimeout(() => {
        setShowWarning(false);
      }, 2000);

      return;
    }

    if (registerData.registerPassword.length < 5) {
      setWarningMessage("Password must be at least 5 characters long");
      setShowWarning(true);

      setTimeout(() => {
        setShowWarning(false);
      }, 2000);

      return;
    }



    const data={
      username:registerData.registerUsername,
        email:registerData.registerEmail,
        password: registerData.registerPassword

    }



    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/register',data)
        

        Cookies.set('token', response.data.token, { expires: 14 })
        Cookies.set('username', response.data.username, { expires: 14 })
        
        setUser(response.data.username)


      } catch (error) {
        console.error('An error occurred during registration:', error);
      }
    };

    handleRegister()

    onClose()
    
    setRegisterData({
      registerUsername: "",
      registerEmail:"",
      registerPassword: "",
      confirmRegisterPassword: "",
    });
  };

  const [activeTab, setActiveTab] = useState("login");

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const overlayRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        ref={overlayRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-md"
      >
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <span className="text-gray-600 text-2xl">x</span>
        </button>
        <div className="flex justify-center mx-auto">
          <IoMdPerson size={52} />
        </div>

        <div className="flex items-center justify-center mt-6">
          <a
            href="#"
            className={`w-1/3 pb-4 font-medium text-center ${
              activeTab === "login"
                ? "text-gray-800 border-blue-500 dark:border-blue-400 dark:text-white"
                : "text-gray-500 dark:border-gray-400 dark:text-gray-300"
            } capitalize border-b`}
            onClick={() => switchTab("login")}
          >
            sign up
          </a>

          <a
            href="#"
            className={`w-1/3 pb-4 font-medium text-center ${
              activeTab === "register"
                ? "text-gray-800 border-blue-500 dark:border-blue-400 dark:text-white"
                : "text-gray-500 dark:border-gray-400 dark:text-gray-300"
            } capitalize border-b`}
            onClick={() => switchTab("register")}
          >
            sign up
          </a>
        </div>

        {activeTab === "login" && (
          <form className="w-full max-w-md" onSubmit={handleLoginSubmit}>
            <div className="relative flex items-center mt-8">
              <div className="absolute w-6 h-6 mx-3.5 mt-2 text-gray-300 dark:text-gray-500">
                <IoMdPerson />
              </div>

              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
                value={loginData.loginUsername}
                onChange={(e) =>
                  setLoginData({ ...loginData, loginUsername: e.target.value })
                }
              />
            </div>

            <div className="relative flex items-center mt-4">
              <div className="absolute w-6 h-6 mx-3.5 mt-2 text-gray-300 dark:text-gray-500">
                <RiLockPasswordFill />
              </div>

              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                value={loginData.loginPassword}
                onChange={(e) =>
                  setLoginData({ ...loginData, loginPassword: e.target.value })
                }
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Kayıt Formu */}
        {activeTab === "register" && (
          <form className="w-full max-w-md" onSubmit={handleRegisterSubmit}>
            <div className="relative flex items-center mt-8">
              <div className="absolute w-6 h-6 mx-3.5 mt-2 text-gray-300 dark:text-gray-500">
                <IoMdPerson />
              </div>

              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
                value={registerData.registerUsername}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    registerUsername: e.target.value,
                  })
                }
              />
            </div>

            <div className="relative flex items-center mt-6">
              <div className="absolute w-6 h-6 mx-3.5 mt-2 text-gray-300 dark:text-gray-500">
                <MdEmail />
              </div>

              <input
                type="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
                value={registerData.registerEmail}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    registerEmail: e.target.value,
                  })
                }
              />
            </div>

            <div className="relative flex items-center mt-4">
              <div className="absolute w-6 h-6 mx-3.5 mt-2 text-gray-300 dark:text-gray-500">
                <RiLockPasswordFill />
              </div>

              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                value={registerData.registerPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    registerPassword: e.target.value,
                  })
                }
              />
            </div>

            <div className="relative flex items-center mt-4">
              <div className="absolute w-6 h-6 mx-3.5 mt-2 text-gray-300 dark:text-gray-500">
                <RiLockPasswordFill />
              </div>

              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
                value={registerData.confirmRegisterPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmRegisterPassword: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
        <div className="mt-4">
          {showWarning && <WarningComponent message={warningMessage} />}
        </div>
      </div>
    </div>
  );
}
