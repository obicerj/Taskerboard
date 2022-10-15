import React, { useState } from "react";
import { useAddBoard } from "../hooks/useBoardData";

const AddBoard = ({mainboardId}) => {

    const [name, setName] = useState('')
    const [displayAddBoard, setDisplayAddBoard] = useState(false)

    const {mutate: addBoard} = useAddBoard(Number(mainboardId))

    const handleAddBoard = () => {
        const newBoard = {name: name, status: false, mainboardId: Number(mainboardId)}
        addBoard({newBoard, mainboardId})
        setName('')
        setDisplayAddBoard(!displayAddBoard)
    }
  return (
    <div className="shadow-sm rounded-md p-4 mr-4 w-80 text-center bg-slate-50 text-gray-500">
      
      <button onClick={() => setDisplayAddBoard((prev) => !prev)}>+ New Task List</button>
      {displayAddBoard && 
      <div className="flex justify-between mt-4">
        <input type="text" className="grow" name="board" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleAddBoard} className="px-4">Create</button>
      </div>}
    </div>
  );
};

export default AddBoard;
