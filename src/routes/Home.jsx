import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div>
      <div className="bg-slate-100 min-h-full min-w-full bg-fixed bg-center bg-no-repeat bg-cover fixed"></div>

      {/* Header */}
      <div className="flex w-full bg-white fixed justify-between items-center px-4 py-2 z-20">
        <div className="flex gap-2">
          <button onClick={() => setShowDrawer((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <h1>Tasker</h1>
        </div>
        <div className="grow mx-4">
          <form className="flex justify-center">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="rounded-md px-4 py-2 w-1/2 bg-slate-100 focus:bg-white focus:outline-0 focus:drop-shadow ease-in-out duration-200"
            />
          </form>
        </div>
        <div className="flex-none">
          <button className="">Toggle view</button>
        </div>
      </div>

      <div className="flex relative">
        <Sidebar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
        {/* Main board */}
        <div className="mx-4 mt-24 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
