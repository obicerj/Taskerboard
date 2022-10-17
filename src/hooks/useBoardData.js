import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

// Update Board
const updateBoard = ({ updatedData, boardId }) => {
  return request({
    url: `/boards/${boardId}`,
    method: "patch",
    data: updatedData,
  });
};
export const useUpdateBoard = (boardId, mainboardId) => {
  const queryClient = useQueryClient();
  return useMutation(updateBoard, {
    onMutate: async (updatedBoard) => {
      await queryClient.cancelQueries(["boards", mainboardId]);
      const prevBoards = queryClient.getQueriesData(["boards", mainboardId]);
      queryClient.setQueryData(["boards", mainboardId], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, updatedBoard],
        };
      });
      return { prevBoards };
    },
    onError: (_error, _boards, context) => {
      queryClient.setQueryData(["boards", mainboardId], context.prevBoards);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["boards", mainboardId]);
    },
  });
};

// Delete Board
const deleteBoard = (boardId) => {
  return request({ url: `/boards/${boardId}`, method: "delete" });
};
export const useDeleteBoard = (boardId, mainboardId) => {
  const queryClient = useQueryClient();
  return useMutation(deleteBoard, {
    onMutate: async (boardId) => {
      await queryClient.cancelQueries(["boards", mainboardId]);
      const prevBoards = queryClient.getQueriesData(["boards"], boardId);
      queryClient.setQueryData(["boards", mainboardId], boardId);
      return { prevBoards };
    },
    onError: (_error, _boards, context) => {
      queryClient.setQueryData(["boards", mainboardId], context.prevBoards);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["boards", mainboardId]);
    //   queryClient.removeQueries(["tasks", boardId]);
    },
  });
};

// Create Board (newBoardData) received from onMutate
const addBoard = ({ newBoardData }) => {
  return request({ url: "/boards", method: "post", data: newBoardData });
};
export const useAddBoard = (mainboardId) => {
  const queryClient = useQueryClient();
  return useMutation(addBoard, {
    onMutate: async (newBoardData) => {
      await queryClient.cancelQueries(["boards", mainboardId]);
      const prevBoards = queryClient.getQueriesData(["boards", mainboardId]);
      queryClient.setQueryData(["boards", mainboardId], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [{ id: oldQueryData?.data?.length + 1, ...newBoardData }],
        };
      });
      return { prevBoards };
    },
    onError: (_error, _boards, context) => {
      queryClient.setQueryData(["boards", mainboardId], context.prevBoards);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["boards", mainboardId]);
    },
  });
};

// Get Board by ID
const fetchBoards = (mainboardId) => {
  return request({ url: `/mainboards/${mainboardId}/boards`, method: "get" });
};
export const useBoardData = (mainboardId) => {
  return useQuery(["boards", mainboardId], () => fetchBoards(mainboardId), {
    select: (data) => {
      const boards = data?.data?.filter(
        // (list) => list.status === false
        // (list) => list.mainboardId === mainboardId && list.status === false
        (list) => list.mainboardId === mainboardId && list.status === false
        );
      return boards;
    },
  });
};

export default useBoardData;