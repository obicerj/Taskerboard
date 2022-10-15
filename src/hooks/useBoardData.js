
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {request} from "../utils/axios-utils"
import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://localhost:4500",
})


const deleteBoard = (boardId) => {
    return request({ url: `/boards/${boardId}`, method: 'delete' })
}

const updateBoard = ({newBoardName, boardId}) => {
    return request({ url: `/boards/${boardId}`, method: 'patch', data: newBoardName })
}

export const useUpdateBoard = (boardId, mainboardId) => {
    const queryClient = useQueryClient()
    return useMutation(updateBoard, {
        onMutate: async(updatedBoard) => {
            await queryClient.cancelQueries(['boards', mainboardId])
            const prevBoards = queryClient.getQueriesData(['boards', mainboardId])
            queryClient.setQueryData(['boards', mainboardId], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                    ]
                }
            })
            return {prevBoards}
        },
        onError: (_error, _boards, context) => {
            queryClient.setQueryData(['boards', mainboardId], context.prevBoards)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['boards', mainboardId])
        }
    })
}

export const useDeleteBoard = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteBoard, {
        onMutate: async({boardId}) => {
            await queryClient.cancelQueries('boards', boardId)
            const prevBoards = queryClient.getQueriesData(['boards'], boardId)
            queryClient.setQueryData(['boards'], boardId)
            return {prevBoards}
        },
        onError: (_error, _boards, context) => {
            queryClient.setQueryData(['boards', context.prevBoards])
        },
        onSettled: () => {
            queryClient.invalidateQueries('boards')
        }
    })
}


const addBoard = ({newBoard, mainboardId}) => {
    return request({ url: '/boards', method: 'post', data: newBoard })
}

export const useAddBoard = (mainboardId) => {
    const queryClient = useQueryClient()
    return useMutation(addBoard, {
        onMutate: async (newBoard) => {
            await queryClient.cancelQueries(['boards', mainboardId])
            const prevBoards = queryClient.getQueriesData(['boards', mainboardId])
            queryClient.setQueryData(['boards', mainboardId], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        {id: oldQueryData?.data?.length + 1, ...newBoard}
                    ]
                }
            })
            return {prevBoards}
        },
        onError: (_error, _boards, context) => {
            queryClient.setQueryData(['boards', mainboardId], context.prevBoards)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['boards', mainboardId])
        }
    })
}

const fetchBoards = (mainboardId) => {
    // return axiosClient.get('/boards');
    return request({url: `/mainboards/${mainboardId}/boards`, method: 'get'})
}

export const useBoardData = (mainboardId) => {
    return useQuery(['boards', mainboardId], () => fetchBoards(mainboardId), {
        select: (data) => {
            const boards = data?.data?.filter((list) => list.status === false)
            return boards;
        }
    })
}