import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { request } from "../utils/axios-utils"

const fetchTasksByBoardId = (boardId) => {
    return request({ url: `/boards/${boardId}/tasks`, method: 'get'})
}

const addTask = (newTask) => {
    return request({ url: `/tasks`, method: 'post', data: newTask })
}

const deleteTask = (taskId) => {
    return request({ url: `/tasks/${taskId}`, method: 'delete' })
}

const updateTask = ({updatedTask, taskId}) => {
    return request({ url: `/tasks/${taskId}`, method: 'patch', data: updatedTask })
}

const doneTask = ({doneTask, taskId}) => {
    return request({ url: `/tasks/${taskId}`, method: 'patch', data: doneTask })
}

const undoneTask = ({uncheck, taskId}) => {
    return request({ url: `/tasks/${taskId}`, method: 'patch', data:uncheck })
}

export const useUndoneTask = (boardId) => {
    const queryClient = useQueryClient()
    return useMutation(undoneTask, {
        onMutate: async(uncheckTask) => {
            await queryClient.cancelQueries(['tasks', boardId])
            const prevTasks = queryClient.getQueriesData(['tasks', boardId])

            queryClient.setQueryData(['tasks', boardId], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        // uncheckTask
                    ]
                }
            })
            return {prevTasks}
        },
        onError: (_error, _tasks, context) => {
            queryClient.setQueryData(['tasks', boardId], context.prevTasks)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tasks', boardId])
        }
    })
}


export const useDoneTask = (boardId) => {
    const queryClient = useQueryClient()
    return useMutation(doneTask, {
        onMutate: async(completedTask) => {
            await queryClient.cancelQueries(['tasks', boardId])
            const prevTasks = queryClient.getQueriesData(['tasks', boardId])

            queryClient.setQueryData(['tasks', boardId], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        // completedTask
                    ]
                }
            })
            return {prevTasks}
        },
        onError: (_error, _tasks, context) => {
            queryClient.setQueryData(['tasks', boardId], context.prevTasks)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tasks', boardId])
        }
    })
}

export const useUpdateTask = (boardId) => {
    const queryClient = useQueryClient()
    return useMutation(updateTask, {
        onMutate: async(updatedTask) => {
            await queryClient.cancelQueries(['tasks', boardId])
            const prevTasks = queryClient.getQueriesData(['tasks', boardId])

            queryClient.setQueryData(['tasks', boardId], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        // updatedTask
                    ]
                }
            })
            return {prevTasks}
        },
        onError: (_error, _tasks, context) => {
            queryClient.setQueryData(['tasks', boardId], context.prevTasks)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tasks', boardId])
        }
    })
}

export const useDeleteTask = (boardId) => {
    const queryClient = useQueryClient()
    return useMutation(deleteTask, {
        onMutate: async() => {
            await queryClient.cancelQueries(['tasks', boardId])
            const prevTasks = queryClient.getQueriesData(['tasks', boardId])
            queryClient.setQueryData(['tasks', boardId])
            return {prevTasks}
        },
        onError: (_error, _tasks, context) => {
            queryClient.setQueryData(['tasks', boardId], context.prevTasks)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tasks', boardId])
        }

    })
}

export const useAddTask = () => {
    const queryClient = useQueryClient()
    return useMutation(addTask, {
        onMutate: async (newTask) => {
            await queryClient.cancelQueries(['tasks', newTask.boardId])
            const prevTasks = queryClient.getQueriesData(['tasks', newTask.boardId])
            queryClient.setQueryData(['tasks', newTask.boardId], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        {id: oldQueryData?.data?.length + 1, ...newTask}
                    ]
                }
            })
            return {prevTasks}
        },
        onError: (_error, _tasks, context) => {
            queryClient.setQueryData('tasks', context.prevTasks)
        },
        onSettled: () => {
            queryClient.invalidateQueries('tasks')
        }
    })
}

export const useCompletedTaskData = (boardId) => {
    return useQuery(['tasks', boardId], () => fetchTasksByBoardId(boardId), {
        select: (data) => {
            const completedTasks = data.data.filter((list) => (list.boardId === boardId && list.status === true))
            return completedTasks;
        }
    })
}

const useTaskData = (boardId) => {
    return useQuery(['tasks', boardId], () => fetchTasksByBoardId(boardId), {
        select: (data) => {
            const tasks = data.data.filter((list) => (list.boardId === boardId && list.status === false))
            return tasks;
        }
    })
}

export default useTaskData