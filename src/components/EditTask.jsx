import React, { useState } from 'react'
import { useUpdateTask } from '../hooks/useTaskData'

const EditTask = ({name, details, taskId, boardId, displayEdit}) => {

    const [editName, setEditName] = useState(name)
    const [editDetails, setEditDetails] = useState(details)
    
    const {mutate: updateTask} = useUpdateTask(boardId)
    const handleUpdateTask = (taskId) => {
        const updatedTask = { name: editName, details: editDetails }
        updateTask({updatedTask, taskId})
        displayEdit(false)
        // console.log(newTask)
    }
  return (
    <>
        <div className="flex flex-col gap-2">
            <input type="text" className="border focus:outline-none" name="editName" value={editName} onChange={(e) => setEditName(e.target.value)} />
            <input type="text" className="border focus:outline-none" name="editDetails" value={editDetails} onChange={(e) => setEditDetails(e.target.value)} />
            <button onClick={() => handleUpdateTask(taskId)}>Update</button>
        </div>
    </>
  )
}

export default EditTask