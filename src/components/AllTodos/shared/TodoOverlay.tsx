import {
  CaretRightIcon,
  CheckCircleIcon,
  FlagIcon,
} from '@phosphor-icons/react';
import { Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ITodo } from '@/services/types';

const TodoOverlay = ({ activeTodo }: { activeTodo: ITodo }) => {
  return (
    <div className="bg-background w-full opacity-90 flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-3 py-3 px-4 border-b border-border shadow-lg">
      <div className="flex flex-1 items-center gap-2">
        <CaretRightIcon
          weight="fill"
          color="var(--c-text)"
          className="cursor-pointer size-4"
        />
        <CheckCircleIcon
          weight={activeTodo.completed ? 'fill' : 'regular'}
          className="cursor-pointer size-4"
          color={activeTodo.completed ? 'var(--c-primary)' : 'var(--c-text)'}
        />

        <p className="flex-1">
          {activeTodo.title}
          {activeTodo.tags.map((tag, idx) => (
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
        <p>{activeTodo.dueDate as string}</p>
        <Divider type="vertical" />
        {activeTodo.priority === 'High' ? (
          <FlagIcon size={20} weight="fill" fill="var(--c-danger)" />
        ) : activeTodo.priority === 'Medium' ? (
          <FlagIcon size={20} weight="fill" fill="var(--c-info)" />
        ) : (
          <FlagIcon size={20} fill="var(--c-text)" />
        )}
      </div>
    </div>
  );
};

export default TodoOverlay;
