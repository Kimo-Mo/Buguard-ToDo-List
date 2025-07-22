import { Button, Collapse, type CollapseProps } from 'antd';
import TodoRow from './TodoRow';
import type { ITodo } from '@/services/types';
import { PlusOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';

type TodosCategoryProps = {
  label: string;
  todos: ITodo[] | undefined;
  catId: string;
};

const TodosCategory = ({ label, todos, catId }: TodosCategoryProps) => {
  const { setNodeRef } = useDroppable({
    id: catId,
  });
  const items: CollapseProps['items'] = [
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
          {todos && todos.map((todo) => <TodoRow key={todo.id} todo={todo} />)}
          <Button
            variant="text"
            style={{
              border: 'none',
              color: 'var(--c-primary)',
              backgroundColor: 'var(--c-card)',
            }}
            onClick={(e) => e.preventDefault()}
            className="text-primary py-3 px-6 cursor-pointer">
            <PlusOutlined /> Add Task
          </Button>
        </>
      ),
    },
  ];
  return (
    <div ref={setNodeRef}>
      <Collapse
        items={items}
        bordered={false}
        defaultActiveKey={[label]}
        className="shadow-sm"
      />
    </div>
  );
};

export default TodosCategory;
