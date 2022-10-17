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
              <li key={mainboard.id} className="flex justify-between mt-2">
                <Link to={`board/${mainboard.id}`}>{mainboard.name}</Link>
                <div className="flex gap-2">
                  {/* move to mainboard */}
                  {/* <EditMainboard
                    mainboardName={mainboard.name}
                    mainboardId={mainboard.id}
                  /> */}
                  {/* <button onClick={() => handleDeleteMainboard(mainboard.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button> */}
                </div>
              </li>
            );
          })}
        </ul>
        {!showCreateMainboard && 
        <button
          className="mt-4"
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
