import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAddMainboard, useAllMainboard } from '../hooks/useMainBoardData'

const Dashboard = () => {

  const {data: mainboards} = useAllMainboard()

  const [showCreateMainboard, setShowCreateMainboard] = useState(false)

  const [newMainBoard, setNewMainboard] = useState("")

  const {mutate: addMainboard} = useAddMainboard()
  const handleAddNewMainboard = () => {
    const newBoard = {name: newMainBoard, status: false}
    addMainboard(newBoard)
    setNewMainboard("")
    setShowCreateMainboard(!showCreateMainboard)
  }


  return (
    <div className='w-full mt-24 mb-14'>
      <div className="flex justify-center">
        <div className='flex flex-col'>
          <h1 className='font-bold text-5xl mt-14 text-indigo-500'>Taskboard</h1>
          <p className="mt-1.5 text-gray-600">Get things done on a fullscreen</p>
        </div>
      
      </div>

        <div className='w-full md:w-4/5 !mx-auto'>
          <div className='flex flex-col lg:flex-row lg:flex-wrap gap-8 justify-center mt-14 px-4'>

            {mainboards?.data?.map((mainboard) => {
              return (
                <Link to={`/board/${mainboard.id}`}>
                <div className='relative'>
                  <div className="rounded w-8 h-8 bg-yellow-300 absolute -top-2 -left-2"></div>
                  <div className="shadow bg-white hover:bg-slate-50 relative rounded px-4 py-4 w-full lg:w-80">
                    <p>{mainboard.name}</p>
                  </div>
                </div>
                </Link>
              )
            })}
            <div>

            {!showCreateMainboard && 
              <button onClick={() => setShowCreateMainboard((prev) => !prev)} className='shadow bg-slate-100 hover:bg-slate-50 w-80 relative rounded text-gray-500 text-center px-4 py-4'>
                + Add Board
              </button>}

              {showCreateMainboard && 
              <div className="relative">
                <div className="rounded w-8 h-8 bg-yellow-300 absolute -top-2 -left-2"></div>
                <div className="flex flex-col w-full lg:w-80 bg-slate-50 shadow drop-shadow-sm rounded px-2 py-2">
                  <input type="text" className="flex-1 border rounded px-1 py-1" onChange={(e) => setNewMainboard(e.target.value)} />
                  <div className="flex flex-row gap-1.5 justify-between mt-2">
                  <button className="flex-1 rounded bg-indigo-400 text-white text-sm px-2 py-2" onClick={handleAddNewMainboard}>Create</button>
                  <button className="flex-1 rounded bg-slate-200 text-gray-500 text-sm px-2 py-2" onClick={() => setShowCreateMainboard(false)}>Cancel</button>
                </div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard