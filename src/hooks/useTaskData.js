import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

// Update Task
const updateTask = ({ updatedData, taskId }) => {
  return request({
    url: `/tasks/${taskId}`,
    method: "patch",
    data: updatedData,
  });
};
export const useUpdateTask = (boardId) => {
  const queryClient = useQueryClient();
  return useMutation(updateTask, {
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries(["tasks", boardId]);
      const prevTasks = queryClient.getQueriesData(["tasks", boardId]);

      queryClient.setQueryData(["tasks", boardId], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, updatedData],
        };
      });
      return { prevTasks };
    },
    onError: (_error, _tasks, context) => {
      queryClient.setQueryData(["tasks", boardId], context.prevTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", boardId]);
    },
  });
};

// Delete Task
const deleteTask = (taskId) => {
  return request({ url: `/tasks/${taskId}`, method: "delete" });
};
export const useDeleteTask = (boardId) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onMutate: async () => {
      await queryClient.cancelQueries(["tasks", boardId]);
      const prevTasks = queryClient.getQueriesData(["tasks", boardId]);
      queryClient.setQueryData(["tasks", boardId]);
      return { prevTasks };
    },
    onError: (_error, _tasks, context) => {
      queryClient.setQueryData(["tasks", boardId], context.prevTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", boardId]);
    },
  });
};

// Create Task
const addTask = (newTask) => {
  return request({ url: `/tasks`, method: "post", data: newTask });
};
export const useAddTask = ({ boardId }) => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(["tasks", newTask.boardId]);
      const prevTasks = queryClient.getQueriesData(["tasks", newTask.boardId]);
      queryClient.setQueryData(["tasks", newTask.boardId], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newTask },
          ],
        };
      });
      return { prevTasks };
    },
    onError: (_error, _tasks, context) => {
      queryClient.setQueryData(["tasks", boardId], context.prevTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks", boardId]);
    },
  });
};

const fetchTasksByBoardId = (boardId) => {
  return request({ url: `/boards/${boardId}/tasks`, method: "get" });
};

// Get all completed Task by ID
export const useCompletedTaskData = (boardId) => {
  return useQuery(["tasks", boardId], () => fetchTasksByBoardId(boardId), {
    select: (data) => {
      const completedTasks = data.data.filter(
        (list) => list.boardId === boardId && list.status === true
      );
      return completedTasks;
    },
  });
};

// Get Task by ID
const useTaskData = (boardId) => {
  return useQuery(["tasks", boardId], () => fetchTasksByBoardId(boardId), {
    select: (data) => {
      const tasks = data.data.filter(
        (list) => list.boardId === boardId && list.status === false
      );
      return tasks;
    },
  });
};

export default useTaskData;
