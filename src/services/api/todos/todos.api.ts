import type { ITodo } from '@/services/types/Todo';
import { ApiClient } from '../ClientApi';

export const getTodos = async () => {
  const res = await ApiClient.get('/todos');
  return res.data;
};

export const createTodo = async (todo: ITodo) => {
  const res = await ApiClient.post('/todos', todo);
  return res.data;
};

export const updateTodo = async (id: string, todo: Partial<ITodo>) => {
  const res = await ApiClient.put(`/todos/${id}`, todo);
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await ApiClient.delete(`/todos/${id}`);
  return res.data;
};
