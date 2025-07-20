import { useQuery } from '@tanstack/react-query';
import { getTodos } from './todos.api';

export const GET_TODOS_QUERY_KEY = '/todos';

export const useGetTodosQuery = () => {
  return useQuery({
    queryKey: [GET_TODOS_QUERY_KEY],
    queryFn: getTodos,
  });
};
