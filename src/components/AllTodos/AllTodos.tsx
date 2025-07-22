import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SegmentedTabs from '../ui/SegmentedTabs';
import { useMemo, useState } from 'react';
import TodosList from './TodosList/TodosList';
import TasksCards from './TodosCards/TodosCards';
import LoadingComponent from '../ui/LoadingComponent';
import { useGetTodosQuery } from '@/services/api';
import type { ITodo } from '@/services/types';

const AllTodos = () => {
  const [currentTab, setCurrentTab] = useState<'Lists' | 'Cards'>('Lists'); // 'Lists' or 'Cards'
  const { data: todos, error, isLoading } = useGetTodosQuery();
  const [todosData, setTodosData] = useState<ITodo[]>([]);
  useMemo(() => {
      if (todos) {
        setTodosData(todos);
      }
  }, [todos]);
  
  return (
    <div className="mx-2">
      <div className="flex justify-between items-center">
        <SegmentedTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Button color="primary" variant="outlined">
          <PlusOutlined /> New Task
        </Button>
      </div>
      <div className="mt-4 mb-6">
        {isLoading && !todos && <LoadingComponent />}
        {error && (
          <p className="text-danger">Error loading todos: {error.message}</p>
        )}
        {!isLoading &&
          !error &&
          (currentTab === 'Lists' ? (
            <TodosList
              todosData={todosData}
              setTodosData={setTodosData}
              currentTab={currentTab}
            />
          ) : (
            <TasksCards
              todosData={todosData}
              setTodosData={setTodosData}
              currentTab={currentTab}
            />
          ))}
      </div>
    </div>
  );
};

export default AllTodos;
