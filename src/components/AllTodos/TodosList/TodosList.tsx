import TodosCategory from './TodosCategory';
import { useMemo } from 'react';
import { useGetTodosQuery } from '@/services/api';
import type { ITodo } from '@/services/types';

const TasksList = () => {
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-y-3 gap-x-6 bg-card px-6 py-3 rounded-lg shadow-sm">
        <p className="flex-1">To-Do Name</p>
        <p>Assignee</p>
        <p>Due Date</p>
        <p>Priority</p>
      </div>
      <TodosCategory label={'To-Do'} todos={todoItems} />
      <TodosCategory label={'In-Progress'} todos={inProgressItems} />
      <TodosCategory label={'Done'} todos={doneItems} />
    </div>
  );
};

export default TasksList;
