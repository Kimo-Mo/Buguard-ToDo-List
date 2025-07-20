import TodosCol from './TodosCol';
import { useMemo } from 'react';
import { useGetTodosQuery } from '@/services/api';
import type { ITodo } from '@/services/types';

const TodosCards = () => {
  const { data: todos } = useGetTodosQuery();
  const todoItems = useMemo(
    () => todos?.filter((todo: ITodo) => todo.status === 'todo'),
    [todos]
  );
  const inProgressItems = useMemo(
    () => todos?.filter((todo: ITodo) => todo.status === 'in-progress'),
    [todos]
  );
  const doneItems = useMemo(
    () => todos?.filter((todo: ITodo) => todo.status === 'done'),
    [todos]
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TodosCol label={'To-Do'} todos={todoItems} />
      <TodosCol label={'In-Progress'} todos={inProgressItems} />
      <TodosCol label={'Done'} todos={doneItems} />
    </div>
  );
};

export default TodosCards;
