import {
  CaretDownIcon,
  CaretRightIcon,
  CheckCircleIcon,
  FlagIcon,
} from '@phosphor-icons/react';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ISubTask, ITodo } from '@/services/types';
import { useState } from 'react';

const TodoRow = ({ todo }: { todo: ITodo }) => {
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
  const toggleSubtasks = () => {
    setSubTasksVisible((prev) => !prev);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-3 py-3 px-6 first:border-t not-last:border-b border-border  hover:bg-input transition-background duration-150">
        <div className="flex flex-1 items-center gap-2">
          {subTasksVisible ? (
            <CaretDownIcon
              weight="fill"
              color="var(--c-text)"
              className="cursor-pointer size-4"
              onClick={toggleSubtasks}
            />
          ) : (
            <CaretRightIcon
              weight="fill"
              color="var(--c-text)"
              className="cursor-pointer size-4"
              onClick={toggleSubtasks}
            />
          )}
          <CheckCircleIcon
            weight={completed ? 'fill' : 'regular'}
            className="cursor-pointer size-4"
            color={completed ? 'var(--c-primary)' : 'var(--c-text)'}
          />

          <p className="flex-1">
            {title}
            {tags.map((tag, idx) => (
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
      {subTasks.length > 0 && subTasksVisible && (
        <div>
          {subTasks.map((subTask: ISubTask) => (
            <div
              key={subTask.id}
              className="flex items-center justify-between gap-x-4 py-2 pl-16 border-b border-border hover:bg-input transition-background duration-150">
              <CheckCircleIcon
                weight={subTask.completed ? 'fill' : 'regular'}
                className="cursor-pointer size-4"
                color={subTask.completed ? 'var(--c-primary)' : 'var(--c-text)'}
              />
              <p className="flex-1">{subTask.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TodoRow;
