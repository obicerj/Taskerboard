import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddMainboard,
  useAllMainboard,
  useDeleteMainboard,
} from "../hooks/useMainBoardData";
import EditMainboard from "./EditMainboard";

const Sidebar = ({ showDrawer, setShowDrawer }) => {
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

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const drawerClass = `z-50 transform top-0 left-0 w-64 bg-white shadow-lg fixed h-full overflow-auto transition-all duration-500`;
  const closeDrawerClass = drawerClass + " " + `-translate-x-80`;

  return (
    <>
    {/* <div className="bg-black/50 min-h-full min-w-full bg-fixed bg-center bg-no-repeat bg-cover fixed z-40"></div> */}
    <div className={showDrawer ? drawerClass : closeDrawerClass}>
      <div className="px-4 py-2">
        <div className="flex justify-between mt-2">
          <p>Tasker</p>
          <button onClick={handleCloseDrawer}>
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
                  {/* <button>Edit</button> */}
                  <EditMainboard
                    mainboardName={mainboard.name}
                    mainboardId={mainboard.id}
                  />
                  <button onClick={() => handleDeleteMainboard(mainboard.id)}>
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
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          className="mt-4"
          onClick={() => setShowCreateMainboard((prev) => !prev)}
        >
          + Add Board
        </button>
        {showCreateMainboard && (
          <div>
            <input
              type="text"
              name="mainboardName"
              value={newMainboard}
              onChange={(e) => setNewMainboard(e.target.value)}
            />
            <button onClick={handleAddNewMainboard}>Create</button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Sidebar;
