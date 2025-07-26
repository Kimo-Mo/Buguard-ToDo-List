import type { ITodo } from '@/services/types';
import {
  CalendarDotIcon,
  CheckSquareOffsetIcon,
  DotsThreeIcon,
} from '@phosphor-icons/react';
import { Avatar, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoCard = ({
  todo,
  openEditModal,
}: {
  todo: ITodo;
  openEditModal: (todo: ITodo) => void;
}) => {
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
    // assignee,
    dueDate,
    // priority,
    subTasks = [],
    // completed,
    tags,
  } = todo;
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? 'opacity-50' : ''}
      title={
        <h2 className="text-md font-semibold flex justify-between items-center gap-2">
          {title}
        </h2>
      }
      extra={
        <DotsThreeIcon
          className="cursor-pointer"
          size={20}
          onClick={(e) => {
            e.stopPropagation();
            openEditModal(todo);
          }}
        />
      }
      variant="borderless">
      <p className="text-description">{description}</p>
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
        <Avatar size={20} icon={<UserOutlined />} />
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
