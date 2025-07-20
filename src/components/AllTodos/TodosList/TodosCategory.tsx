import { Button, Collapse, type CollapseProps } from 'antd';
import TodoRow from './TodoRow';
import type { ITodo } from '@/services/types';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

type TodosCategoryProps = {
  label: string;
  todos: ITodo[] | undefined;
};

const TodosCategory = ({ label, todos }: TodosCategoryProps) => {
  const items: CollapseProps['items'] = useMemo(
    () => [
      {
        key: label,
        label: (
          <h2 className="font-semibold">
            {label}{' '}
            <span className="py-1 px-2 rounded-full bg-card text-sm border border-border">
              {todos?.length}
            </span>{' '}
          </h2>
        ),
        children: (
          <>
            {todos?.map((todo) => (
              <TodoRow key={todo.id} todo={todo} />
            ))}
            <Button
              variant="text"
              style={{ border: 'none', color: 'var(--c-primary)' }}
              className="text-primary py-3 px-6 cursor-pointer">
              <PlusOutlined /> Add Task
            </Button>
          </>
        ),
      },
    ],
    [label, todos]
  );
  return (
    <Collapse
      items={items}
      bordered={false}
      defaultActiveKey={[label]}
      className="shadow-sm"
    />
  );
};

export default TodosCategory;
