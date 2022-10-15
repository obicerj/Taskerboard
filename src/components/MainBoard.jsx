import React from "react";
import AddBoard from "./AddBoard";
import Board from "./Board";
import { useBoardData } from "../hooks/useBoardData";
import { useParams } from "react-router-dom";
import useMainBoardData from "../hooks/useMainBoardData";

const MainBoard = () => {
  const { mainboardId } = useParams();
  const { data: mainboard } = useMainBoardData(Number(mainboardId));
  
  const { data: boards } = useBoardData(Number(mainboardId));

  return (
    <div>
      <h2 className="mb-4">{mainboard?.name}</h2>
     
      <div className="flex items-start gap-6">
        {boards?.map((board) => {
          return <Board key={board.id} board={board} mainboardId={Number(mainboardId)} />;
        })}
        <AddBoard mainboardId={mainboardId} />
      </div>
    </div>
  );
};

export default MainBoard;
