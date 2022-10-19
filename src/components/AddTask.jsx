import React, { useState } from 'react'
import { useAddTask } from '../hooks/useTaskData'

const AddTask = ({boardId}) => {
    const [taskName, setTaskName] = useState('')
    const [taskDetails, setTaskDetails] = useState('')
    const [displayAddTask, setDisplayAddTask] = useState(false)
  
    const {mutate: addTasks} = useAddTask({boardId})

    const handleAddTask = (boardId) => {
      if (taskName) {
        const newTask = {boardId: boardId,  status: false, name: taskName, details: taskDetails }
        addTasks(newTask)
        setTaskName('')
        setTaskDetails('')
        setDisplayAddTask(!displayAddTask)
      }
      console.log("Add Task name")
    }

  return (
    <>
    {!displayAddTask && 
    <button className="flex items-center gap-1 select-none mt-2 py-2 text-sm" onClick={() => setDisplayAddTask((prev) => !prev)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-indigo-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
      Add Task</button>
    }

    {displayAddTask && 
    <div className="flex flex-col gap-1 shadow drop-shadow bg-slate-100 rounded px-2 py-2.5 my-4">
        <input type="text" placeholder="Title" className="border rounded text-sm focus:outline-0 px-1 py-0.5" name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <input type="text" placeholder="Details" className="border rounded text-sm focus:outline-0 px-1 py-0.5" name="taskDetails" value={taskDetails} onChange={(e) => setTaskDetails(e.target.value)} />
        <div className='flex flex-row gap-1 justify-evenly'>
          <button className="flex-1 rounded text-xs bg-indigo-400 text-white mt-1 px-4 py-2" onClick={() => handleAddTask(boardId)}>Add</button>
          <button className="flex-1 rounded text-xs bg-slate-200 text-gray-500 mt-1 px-4 py-2" onClick={() => setDisplayAddTask((prev) => !prev)}>Cancel</button>
        </div>
    </div>}
    </>
  )
}

export default AddTask