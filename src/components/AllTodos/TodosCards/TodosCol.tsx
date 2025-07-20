import type { ITodo } from '@/services/types';
import { DotsThreeIcon, PlusIcon } from '@phosphor-icons/react';
import TodoCard from './TodoCard';

type TodosColProps = {
  label: string;
  todos: ITodo[] | undefined;
};
const TodosCol = ({ label, todos }: TodosColProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {label}{' '}
          <span className="py-1 px-2 rounded-full bg-card text-sm border border-border">
            {todos?.length}
          </span>{' '}
        </h2>
        <div className="flex gap-2 *:cursor-pointer">
          <PlusIcon size={20} />
          <DotsThreeIcon size={20} />
        </div>
      </div>
      {todos?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosCol;
