import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddMainboard,
  useAllMainboard,
  useDeleteMainboard,
} from "../hooks/useMainBoardData";
import EditMainboard from "./EditMainboard";
import {useSelector, useDispatch} from "react-redux"
import { toggleSidebarDrawer } from "./sidebarSlice";

const Sidebar = () => {
  const [newMainboard, setNewMainboard] = useState("");
  const [showCreateMainboard, setShowCreateMainboard] = useState(false);

  const { data: mainboards } = useAllMainboard();

  const { mutate: deleteMainboard } = useDeleteMainboard();
  const handleDeleteMainboard = (mainboardId) => {
    deleteMainboard(mainboardId);
  };

  const { mutate: addMainboard } = useAddMainboard();
  const handleAddNewMainboard = () => {
    const newBoard = { name: newMainboard, status: false };
    addMainboard(newBoard);
    setNewMainboard("");
    setShowCreateMainboard(!showCreateMainboard);
  };

  const showDrawer = useSelector((state) => state.sidebarDrawer.value)
  const dispatch = useDispatch()

  const drawerClass = `z-50 transform top-0 left-0 w-72 bg-white shadow-lg fixed h-full overflow-auto transition-all duration-500`;
  const closeDrawerClass = drawerClass + " " + `-translate-x-80`;

  return (
    <>
    <div className={showDrawer ? drawerClass : closeDrawerClass}>
      <div className="px-4 py-2">
        <div className="flex justify-between mt-2">
          <p>Taskboard</p>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="mt-8">
          {mainboards?.data?.map((mainboard) => {
            return (
              <li key={mainboard.id} className="flex justify-between text-gray-500 hover:text-gray-700 mt-1 py-1">
                <Link key={mainboard.id} to={`board/${mainboard.id}`} className="w-full">{mainboard.name}</Link>
              </li>
            );
          })}
        </ul>
        {!showCreateMainboard && 
        <button
          className="rounded w-full bg-indigo-400 text-white py-2 mt-8"
          onClick={() => setShowCreateMainboard((prev) => !prev)}
        >
          + Add Board
        </button>}
        {showCreateMainboard && (
          <div className="flex flex-col justify-between gap-1.5 mt-4">
            <input
              type="text"
              name="mainboardName"
              className="flex-1 border rounded px-1 py-1"
              value={newMainboard}
              onChange={(e) => setNewMainboard(e.target.value)}
            />
            <div className="flex flex-row gap-1.5 justify-evenly">
              <button className="flex-1 rounded bg-indigo-400 text-white text-sm px-2 py-2" onClick={handleAddNewMainboard}>Create</button>
              <button className="flex-1 rounded bg-slate-200 text-gray-500 text-sm px-2 py-2" onClick={() => setShowCreateMainboard((prev) => !prev)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Sidebar;
