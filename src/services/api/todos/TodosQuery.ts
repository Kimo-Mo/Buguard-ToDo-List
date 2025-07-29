import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodos, updateTodo } from './todos.api';
import type { ITodo } from '@/services/types';

export const GET_TODOS_QUERY_KEY = '/todos';

export const useGetTodosQuery = () => {
  return useQuery({
    queryKey: [GET_TODOS_QUERY_KEY],
    queryFn: getTodos,
    select: (data) => [...data].sort((a, b) => a.order - b.order),
  });
};

export const useUpdateTodoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: Partial<ITodo> }) =>
      updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS_QUERY_KEY] });
    },
  });
};
export const useCreateTodoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: ITodo) => createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS_QUERY_KEY] });
    },
  });
};
export const useDeleteTodoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TODOS_QUERY_KEY] });
    },
  });
};
