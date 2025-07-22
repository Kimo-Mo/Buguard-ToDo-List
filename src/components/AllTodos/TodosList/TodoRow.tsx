import {
  CaretDownIcon,
  CaretRightIcon,
  CheckCircleIcon,
  FlagIcon,
} from '@phosphor-icons/react';
import { Avatar, Divider } from 'antd';
import { HolderOutlined, UserOutlined } from '@ant-design/icons';
import type { ISubTask, ITodo } from '@/services/types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo, useState } from 'react';

const TodoRow = ({ todo }: { todo: ITodo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    title,
    // assignee,
    dueDate,
    priority,
    subTasks = [],
    completed,
    tags,
  } = todo;
  const [subTasksVisible, setSubTasksVisible] = useState(false);
  const toggleSubtasks = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setSubTasksVisible((prev) => !prev);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-3 py-3 px-4  border-b border-border hover:bg-input transition-background duration-150">
        <div
          className="opacity-0 group-hover:opacity-100 duration-300 transition-opacity cursor-move flex items-center"
          {...listeners}
          {...attributes}
          onMouseDown={(e) => e.preventDefault()}>
          <HolderOutlined className="text-description text-lg size-4" />
        </div>
        <div className="flex flex-1 items-center gap-2">
          {subTasksVisible ? (
            <CaretDownIcon
              weight="fill"
              color="var(--c-description)"
              className="cursor-pointer size-4"
              onClick={toggleSubtasks}
            />
          ) : (
            <CaretRightIcon
              weight="fill"
              color="var(--c-description)"
              className="cursor-pointer size-4"
              onClick={toggleSubtasks}
            />
          )}
          <CheckCircleIcon
            weight={completed ? 'fill' : 'regular'}
            className="cursor-pointer size-4"
            color={completed ? 'var(--c-primary)' : 'var(--c-description)'}
          />

          <p className="flex-1">
            {title}
            {tags &&
              tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-xl bg-danger/20 text-danger/75 px-2 ms-4 inline-block">
                  {tag}
                </span>
              ))}
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {/* <p>{assignee}</p> */}
          <Avatar size={20} icon={<UserOutlined />} />
          <Divider type="vertical" />
          <p>{dueDate}</p>
          <Divider type="vertical" />
          {priority === 'High' ? (
            <FlagIcon size={20} weight="fill" fill="var(--c-danger)" />
          ) : priority === 'Medium' ? (
            <FlagIcon size={20} weight="fill" fill="var(--c-info)" />
          ) : (
            <FlagIcon size={20} fill="var(--c-text)" />
          )}
        </div>
      </div>
      {!isDragging && subTasks.length > 0 && subTasksVisible && (
        <div>
          {subTasks.map((subTask: ISubTask) => (
            <div
              key={subTask.id}
              className="flex items-center justify-between gap-x-4 py-2 ps-12 md:ps-16 border-b border-border hover:bg-input transition-background duration-150">
              <CheckCircleIcon
                weight={subTask.completed ? 'fill' : 'regular'}
                className="cursor-pointer size-4 md:ms-4 "
                color={subTask.completed ? 'var(--c-primary)' : 'var(--c-description)'}
              />
              <p className="flex-1">{subTask.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(TodoRow);
