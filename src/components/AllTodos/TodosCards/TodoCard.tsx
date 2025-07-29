import type { ITodo } from '@/services/types';
import {
  CalendarDotIcon,
  CheckSquareOffsetIcon,
  DotsThreeIcon,
} from '@phosphor-icons/react';
import { Avatar, Card, Divider, message } from 'antd';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useDeleteTodoQuery } from '@/services/api';

const TodoCard = ({
  todo,
  openEditModal,
}: {
  todo: ITodo;
  openEditModal: (todo: ITodo) => void;
}) => {
  const [openActions, setOpenActions] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    backgroundColor: 'var(--c-card)',
    width: '100%',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    title,
    description,
    assignee,
    dueDate,
    // priority,
    subTasks = [],
    // completed,
    tags,
  } = todo;

  const deleteTodo = useDeleteTodoQuery();
  const confirmDelete = () => {
    setOpenActions(false);
    deleteTodo.mutate(todo.id, {
      onSuccess: () => message.success('Todo deleted successfully'),
      onError: (error) => {
        console.error('Failed to delete todo:', error);
        message.error('Failed to delete todo');
      },
    });
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setOpenActions(false)}
      className={isDragging ? 'opacity-50' : ''}
      title={
        <h2 className="text-md font-semibold flex justify-between items-center gap-2">
          {title}
        </h2>
      }
      extra={
        <>
          <DotsThreeIcon
            className="cursor-pointer relative"
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              setOpenActions((prev) => !prev);
            }}
          />
          {openActions && (
            <div className="absolute right-0 top-8 z-50 mt-2 bg-card shadow-lg rounded-md p-2">
              <button
                className="block w-full text-left px-4 py-2 transition-all duration-150 hover:bg-background rounded-md cursor-pointer"
                onClick={() => openEditModal(todo)}>
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 transition-all duration-150 hover:bg-background rounded-md cursor-pointer"
                onClick={confirmDelete}>
                Delete
              </button>
            </div>
          )}
        </>
      }
      variant="borderless">
      <p className="text-description">
        {description.length > 150
          ? description.slice(0, 150) + '...'
          : description}
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-xl bg-danger/20 text-danger/75 px-2 inline-block">
              {tag}
            </span>
          ))}
        </div>
        {assignee && (
          <Avatar
            src={assignee.avatar}
            className="!size-6 !bg-description/50"
          />
        )}
      </div>
      <Divider />
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2">
          <CheckSquareOffsetIcon size={20} />
          {subTasks.length > 0
            ? `${subTasks.filter((sub) => sub.completed).length} / ${
                subTasks.length
              }`
            : 'No Subtasks'}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDotIcon size={20} />
          {dueDate ? dueDate?.toString() : 'No Due Date'}
        </p>
      </div>
    </Card>
  );
};

export default TodoCard;
