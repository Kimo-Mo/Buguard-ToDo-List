import type { ITodo } from '@/services/types';
import { DotsThreeIcon, PlusIcon } from '@phosphor-icons/react';
import TodoCard from './TodoCard';
import { useDroppable } from '@dnd-kit/core';

type TodosColProps = {
  label: string;
  todos: ITodo[] | undefined;
  columnId: string;
  openAddModal: (initial: Partial<ITodo>) => void;
  openEditModal: (todo: ITodo) => void;
};
const TodosCol = ({
  label,
  todos,
  columnId,
  openAddModal,
  openEditModal,
}: TodosColProps) => {
  const { setNodeRef } = useDroppable({
    id: columnId,
  });
  return (
    <div className="flex flex-col gap-4" ref={setNodeRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {label}{' '}
          <span className="py-1 px-2 rounded-full bg-card text-sm border border-border">
            {todos?.length}
          </span>{' '}
        </h2>
        <div className="flex gap-2 *:cursor-pointer">
          <PlusIcon
            size={20}
            onClick={() =>
              openAddModal({
                status: columnId as 'todo' | 'in-progress' | 'done',
              })
            }
          />
          <DotsThreeIcon size={20} />
        </div>
      </div>
      {todos?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} openEditModal={openEditModal} />
      ))}
    </div>
  );
};

export default TodosCol;
