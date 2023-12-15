import React, { useState } from "react";

import DrawerUserCard from "./DrawerUserCard";
import { CiSaveDown2 } from "react-icons/ci";

export const UserDrawer = ({ }) => {

  return (
    <div className="flex">
      <input
        type="checkbox"
        id="right-drawer-toggle"
        className="relative sr-only peer cursor-pointer"
      />
      <label
        htmlFor="right-drawer-toggle"
        className="absolute top-0 right-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:right-64 cursor-pointer"
      >
        <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
        <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
      </label>
      <div className="fixed top-0 right-0 z-5 w-64 h-full transition-all duration-500 transform translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
        <div className="px-6 py-4">
          <div className="mt-8 space-y-4">


            {/* bir gruba giriniz yazacak sonra bir gruba tıklayınca kişiler yenilenecek*/}

            <div className="flex items-center ">
              <h2 className="mr-2">Group Title</h2>
              <CiSaveDown2 className="cursor-pointer" />
            </div>

            <DrawerUserCard username={"Umut"} online={"True"} />
            <DrawerUserCard username={"Talha"} online={"False"} />
            <DrawerUserCard username={"Çalışkan"} online={"False"} />
            <DrawerUserCard username={"Deneme"} online={"True"} />




          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDrawer;
