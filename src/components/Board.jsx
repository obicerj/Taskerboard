import { useSelector } from "react-redux";
import useTaskData, { useCompletedTaskData } from "../hooks/useTaskData";
import AddTask from "./AddTask";
import CompletedTask from "./CompletedTask";
import EditBoard from "./EditBoard";
import Task from "./Task";

const Board = ({ board, mainboardId }) => {
  const { data: tasks } = useTaskData(board.id);
  const { data: completedTasks } = useCompletedTaskData(board.id);
    
  const totalCompleted = completedTasks?.length;

  const toggleView = useSelector((state) => state.boardView.value)

  return (
    <>
      <div
        key={board.id}
        className={`shadow-sm drop-shadow-sm rounded-md p-4 bg-white ${toggleView ? "w-full":"w-80"}`}
      >
        <EditBoard name={board.name} boardId={board.id} mainboardId={mainboardId} />

        <AddTask boardId={board.id} />

        {tasks?.map((task) => {
          return <Task key={task.id} task={task} boardId={board.id} />;
        })}

        {!totalCompleted ? '' :
            <p className="mt-4 text-sm">Completed ({totalCompleted})</p>
        }

        {completedTasks?.map((completedTask) => {
            return <CompletedTask key={completedTask.id} completed={completedTask} boardId={board.id}/>
        })}
      </div>
    </>
  );
};

export default Board;
