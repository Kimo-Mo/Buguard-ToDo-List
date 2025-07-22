import type { ITodo } from '@/services/types';
import { Avatar, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  CalendarDotIcon,
  CheckSquareOffsetIcon,
  DotsThreeIcon,
} from '@phosphor-icons/react';

const CardOverlay = ({ activeTodo }: { activeTodo: ITodo }) => {
  return (
    <Card
      style={{ backgroundColor: 'var(--c-background)' }}
      className="shadow-lg"
      title={
        <h2 className="text-md font-semibold flex justify-between items-center gap-2">
          {activeTodo.title}
        </h2>
      }
      extra={<DotsThreeIcon className="cursor-pointer" size={20} />}
      variant="borderless">
      <p className="text-description">{activeTodo.description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {activeTodo.tags.map((tag, idx) => (
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
          {activeTodo.subTasks && activeTodo.subTasks.length > 0
            ? `${activeTodo.subTasks.filter((sub) => sub.completed).length} / ${
                activeTodo.subTasks.length
              }`
            : 'No Subtasks'}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDotIcon size={20} />
          {activeTodo.dueDate ? activeTodo.dueDate : 'No Due Date'}
        </p>
      </div>
    </Card>
  );
};

export default CardOverlay;
