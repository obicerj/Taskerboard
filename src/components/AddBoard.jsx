import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddBoard } from "../hooks/useBoardData";

const AddBoard = ({mainboardId}) => {
    
    const [name, setName] = useState('')
    const [displayAddBoard, setDisplayAddBoard] = useState(false)

    const {mutate: addBoard} = useAddBoard(Number(mainboardId))
    const handleAddBoard = () => {
      if(name) {
        const newBoardData = {name: name, status: false, mainboardId: Number(mainboardId)}
        addBoard(newBoardData)
        setName('')
        setDisplayAddBoard(!displayAddBoard)
      }
      console.log("Add Board name")
    }

    const toggleView = useSelector((state) => state.boardView.value)
    

    return (
    <div className={`shadow-sm rounded-md p-4 mr-4 w-80 text-center bg-slate-50 text-gray-500 ${toggleView ?  "!mx-auto":""}`}>
      {!displayAddBoard && 
      <button onClick={() => setDisplayAddBoard((prev) => !prev)}>+ New Task List</button>
      }
      {displayAddBoard && 
      <div className="flex flex-col">
        <input type="text" className="flex-1 rounded px-1 py-1" name="board" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex flex-row justify-evenly gap-1 mt-2">
          <button onClick={handleAddBoard} className="rounded flex-1 bg-indigo-400 text-sm text-white px-4 py-2">Create</button>
          <button onClick={() => setDisplayAddBoard((prev) => !prev)} className="rounded flex-1 bg-slate-200 text-sm text-gray-500 px-4 py-2">Cancel</button>
        </div>
      </div>}
    </div>
  );
};

export default AddBoard;
