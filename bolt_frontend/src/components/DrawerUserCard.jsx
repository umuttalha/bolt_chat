import React from "react";

export default function DrawerUserCard({ username, online }) {
  return (
    <div className="flex items-center rounded-lg bg-gray-500 w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
      <div className="relative mt-2">
        <span
          className={`h-2 w-2 rounded-full  absolute right-0.5 ring-1 ring-white bottom-0 ${
            online == "True" ? "bg-emerald-500" : ""
          }`}
        ></span>
      </div>

      <div className="text-left rtl:text-right">
        <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">
          {username}
        </h1>
      </div>
    </div>
  );
}
