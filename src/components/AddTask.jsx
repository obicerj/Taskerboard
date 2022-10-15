import React, { useState } from 'react'
import { useAddTask } from '../hooks/useTaskData'

const AddTask = ({boardId}) => {
    const [taskName, setTaskName] = useState('')
    const [taskDetails, setTaskDetails] = useState('')
    const [displayAddTask, setDisplayAddTask] = useState(false)
  
    const {mutate: addTasks} = useAddTask()

    const handleAddTask = (boardId) => {
      const newTask = {boardId: boardId,  status: false, name: taskName, details: taskDetails }
      addTasks(newTask)
      setTaskName('')
      setTaskDetails('')
      setDisplayAddTask(!displayAddTask)
    }

  return (
    <>
    <button className="py-2 text-sm" onClick={() => setDisplayAddTask((prev) => !prev)}>+ Add Task</button>
    {displayAddTask && 
    <div className="flex flex-col gap-1">
        <input type="text" placeholder="Title" className="border focus:outline-0" name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <input type="text" placeholder="Details" className="border focus:outline-0" name="taskDetails" value={taskDetails} onChange={(e) => setTaskDetails(e.target.value)} />
        <button className="" onClick={() => handleAddTask(boardId)}>Add</button>
    </div>}
    </>
  )
}

export default AddTask