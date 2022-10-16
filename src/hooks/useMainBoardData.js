import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

// Update Mainboard
const updateMainboard = ({ updatedData, mainboardId }) => {
  return request({
    url: `/mainboards/${mainboardId}`,
    method: "patch",
    data: updatedData,
  });
};
export const useUpdateMainboard = (mainboardId) => {
  const queryClient = useQueryClient();
  return useMutation(updateMainboard, {
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries(["mainboards"]);
      const prevMainboards = queryClient.getQueriesData(["mainboards"]);
      queryClient.setQueryData(["mainboards"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            updatedData
          ],
        };
      });
      return { prevMainboards };
    },
    onError: (_error, _mainboards, context) => {
      queryClient.setQueryData(["mainboards"], context.prevMainboards);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["mainboards"]);
      queryClient.invalidateQueries(["mainboard", mainboardId]);
    },
  });
};

// Delete Mainboard
const deleteMainboard = (mainboardId) => {
  return request({ url: `/mainboards/${mainboardId}`, method: "delete" });
};
export const useDeleteMainboard = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMainboard, {
    onMutate: async () => {
      await queryClient.cancelQueries(["mainboards"]);
      const prevMainboards = queryClient.getQueriesData(["mainboards"]);
      queryClient.setQueryData(["mainboards"]);
      return prevMainboards;
    },
    onError: (_error, _mainboards, context) => {
      queryClient.setQueryData(["mainboards"], context.prevMainboards);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["mainboards"]);
    },
  });
};

// Create Mainboard
const addMainboard = (newMainboardData) => {
  return request({
    url: "/mainboards",
    method: "post",
    data: newMainboardData,
  });
};
export const useAddMainboard = () => {
  const queryClient = useQueryClient();
  return useMutation(addMainboard, {
    onMutate: async (newMainboard) => {
      await queryClient.cancelQueries(["mainboards"]);
      const prevMainboards = queryClient.getQueriesData(["mainboards"]);
      queryClient.setQueryData(["mainboards"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [{ id: oldQueryData?.data?.length + 1, newMainboard }],
        };
      });
      return { prevMainboards };
    },
    onError: (_error, _boards, context) => {
      queryClient.setQueryData(["mainboards"], context.prevMainboards);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["mainboards"]);
    },
  });
};

// Get All Mainboard
const fetchAllMainboard = () => {
  return request({ url: "/mainboards", method: "get" });
};
export const useAllMainboard = () => {
  return useQuery(["mainboards"], fetchAllMainboard);
};

// Get Mainboard by ID
const fetchMainBoardById = (mainboardId) => {
  return request({ url: `/mainboards/${mainboardId}`, method: "get" });
};
const useMainBoardData = (mainboardId) => {
  return useQuery(
    ["mainboard", mainboardId],
    fetchMainBoardById,
    {
      select: (data) => {
        const mainboard = data?.data;
        return mainboard;
      },
    }
  );
};

export default useMainBoardData;
