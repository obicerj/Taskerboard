import React, { useEffect, useState } from "react";
import AddBoard from "./AddBoard";
import Board from "./Board";
import { useBoardData } from "../hooks/useBoardData";
import { useNavigate, useParams } from "react-router-dom";
import useMainBoardData, {
  useDeleteMainboard,
  useUpdateMainboard,
} from "../hooks/useMainBoardData";
import { useSelector } from "react-redux";

const MainBoard = () => {
  const { mainboardId } = useParams();

  const { data: mainboard } = useMainBoardData(Number(mainboardId));

  const { data: boards } = useBoardData(Number(mainboardId));

  const [editMainboardName, setEditMainboardName] = useState();

  const toggleView = useSelector((state) => state.boardView.value)

  const { mutate: updateMainboard } = useUpdateMainboard(Number(mainboardId));
  const handleUpdateMainboard = (mainboardId) => {
    if(editMainboardName) {
      const updatedData = { name: editMainboardName };
      updateMainboard({ updatedData, mainboardId });
      setDisplayEdit((prev) => !prev);
    }
    console.log("Add Mainboard name")
  };

  const [displayEdit, setDisplayEdit] = useState(false);
  const handleDisplayEditMainboard = () => {
    setEditMainboardName(mainboard?.name);
    setDisplayEdit((prev) => !prev);
  };

  const { mutate: deleteMainboard } = useDeleteMainboard();
  const handleDeleteMainboard = (mainboardId) => {
    deleteMainboard(mainboardId);
    navigate("/");
  };

  const navigate = useNavigate();

  const query = useSelector((state) => state.searchQuery.value)
  const keys = ["name"]
  const search = (data) => {
    return data?.filter((item) => 
    keys.some((key) => item[key].toLowerCase().includes(query))
    )
  }
  const lists = search(boards)

  return (
    <div className={toggleView ? "mt-24 px-4 mb-8 w-full":"mt-24 px-4 mb-8"}>
      <div className={toggleView ? "flex justify-between bg-white/80 shadow rounded z-20 w-full sticky top-16 items-center px-2 py-2 my-4":"flex justify-between fixed z-20 w-full top-16 items-center pl-1 pr-8 my-4"}>
        {!displayEdit && <h2 className="">{mainboard?.name}</h2>}

        {displayEdit && (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              className="rounded px-1 py-1"
              value={editMainboardName}
              onChange={(e) => setEditMainboardName(e.target.value)}
            />
            <button
              className="rounded bg-indigo-400 text-white px-4 py-1"
              onClick={() => handleUpdateMainboard(mainboard.id)}
            >
              Save
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={handleDisplayEditMainboard}>
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
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
      </div>

      <div className={toggleView ? "flex flex-col items-start gap-6 mt-8":"flex flex-row items-start gap-6 mt-8"}>
        {lists?.map((board) => {
          return (
            <Board
              key={board.id}
              board={board}
              mainboardId={Number(mainboardId)}
            />
          );
        })}
        <AddBoard mainboardId={mainboardId} />
      </div>
    </div>
  );
};

export default MainBoard;
