
import { useBoardData } from "./hooks/useBoardData";
import AddBoard from "./components/AddBoard";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";

function App() {

  const { data: boards } = useBoardData();
  
  return (
    <div className="App">
      <div className="bg-slate-100 min-h-full min-w-full bg-fixed bg-center bg-no-repeat bg-cover fixed"></div>

      {/* Header */}
      <div className="flex w-full bg-white fixed justify-between items-center px-4 py-2 z-20">
        <div className="flex-none">
          <h1>Tasker</h1>
        </div>
        <div className="grow mx-4">
          <form className="flex justify-center">
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="rounded-md px-4 py-2 w-1/2 bg-slate-100 focus:bg-white focus:outline-0 focus:drop-shadow ease-in-out duration-200"
            />
          </form>
        </div>
        <div className="flex-none">
          <button className="">Toggle view</button>
        </div>
      </div>

      <div className="flex relative">
        <Sidebar />
        {/* Main board */}
        <div className="mx-4 mt-24 w-full">
          <h2 className="mb-4">Board title</h2>

          <div className="flex items-start gap-6">
            {boards?.map((board) => {
              return <Board key={board.id} board={board} />;
            })}

            <AddBoard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
