import React, { useState } from "react";
import { useUpdateBoard, useDeleteBoard } from "../hooks/useBoardData";

const EditBoard = ({ name, boardId, mainboardId }) => {
  const [editName, setEditName] = useState(name);
  const [displayEdit, setDisplayEdit] = useState(false);

  const { mutate: updateBoard } = useUpdateBoard(boardId, mainboardId);
  const handleEditName = () => {
    if(editName) {
      const updatedData = { name: editName };
      updateBoard({ updatedData, boardId, mainboardId });
      setDisplayEdit(!displayEdit);
    }
    console.log("Add Board name")
  };

  const { mutate: deleteBoard } = useDeleteBoard(boardId, mainboardId);
  const handleDeleteBoard = (boardId) => {
    deleteBoard(boardId);
  };

  return (
    <>
      <div className="flex flex-row mb-2">
        {!displayEdit && <h2 className="flex-1">{name}</h2>}

        {displayEdit && (
          <div className="flex flex-row gap-1.5 w-full">
            <input
              type="text"
              className="w-full border rounded px-1 py-0.5"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              name="boardName"
            />
            <button
              className="bg-indigo-400 text-white text-sm rounded px-4"
              onClick={handleEditName}
            >
              Save
            </button>
          </div>
        )}

        {!displayEdit && (
          <div className="flex justify-between gap-2">
            <details className="relative inline-block text-left">
              <summary className="list-none cursor-pointer">
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
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </summary>
              <div role="menu" className="flex flex-col items-end gap-1 origin-top-right absolute right-0 bg-slate-100 mt-1.5 px-4 py-3 rounded shadow-md drop-shadow-md z-50">
              <div className="absolute w-4 h-4 rotate-45 -top-1 bg-slate-100 right-1.5"></div>
              <button onClick={() => setDisplayEdit((prev) => !prev)} className="flex justify-items-end items-center gap-2 text-gray-600 hover:text-gray-900 select-none">
              Edit <svg
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
            <button onClick={() => handleDeleteBoard(boardId)} className="flex justify-items-end items-center gap-2 text-gray-600 hover:text-gray-900 select-none">
              Delete <svg
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
            </details>
          </div>
        )}
      </div>
    </>
  );
};

export default EditBoard;
