import React, { useState } from 'react'
import { useUpdateTask } from '../hooks/useTaskData'

const EditTask = ({name, details, taskId, boardId, displayEdit}) => {

    const [editName, setEditName] = useState(name)
    const [editDetails, setEditDetails] = useState(details)
    
    const {mutate: updateTask} = useUpdateTask(boardId)
    const handleUpdateTask = (taskId) => {
        const updatedData = { name: editName, details: editDetails }
        updateTask({updatedData, taskId})
        displayEdit(false)
        // console.log(newTask)
    }
  return (
    <>
        <div className="flex flex-col gap-1 shadow drop-shadow bg-slate-100 rounded px-2 py-2.5">
            <input type="text" className="border rounded text-sm focus:outline-none px-1 py-0.5" name="editName" value={editName} onChange={(e) => setEditName(e.target.value)} />
            <input type="text" className="border rounded text-sm focus:outline-none px-1 py-0.5" name="editDetails" value={editDetails} onChange={(e) => setEditDetails(e.target.value)} />
            <button className="rounded text-xs bg-indigo-400 text-white mt-1 px-4 py-2" onClick={() => handleUpdateTask(taskId)}>Update</button>
        </div>
    </>
  )
}

export default EditTask