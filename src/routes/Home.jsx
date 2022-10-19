import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux"
import { toggleSidebarDrawer } from "../components/sidebarSlice";
import { toggleBoardView } from "../components/boardViewSlice";

const Home = () => {
 const dispatch = useDispatch()
 const toggleView = useSelector((state) => state.boardView.value)

  return (
    <div>
      <div className="bg-slate-100 min-h-full min-w-full bg-fixed bg-center bg-no-repeat bg-cover fixed"></div>

      {/* Header */}
      <div className="flex w-full bg-white fixed drop-shadow-sm shadow-sm justify-between items-center px-4 py-2 z-20">
        <div className="flex gap-2">
          <button onClick={() => dispatch(toggleSidebarDrawer())}>
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
          <Link to="/">
          <h1>Taskboard</h1>
          </Link>
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
          <button className="" onClick={() => dispatch(toggleBoardView())}>
            
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={toggleView ? "w-5 h-5 rotate-90 transition-all":"w-5 h-5 rotate-0 transition-all"}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
          </svg>

          </button>
        </div>
      </div>

      <div className="flex relative">
        <Sidebar />
        {/* Main board */}
          <Outlet />
      </div>
    </div>
  );
};

export default Home;
