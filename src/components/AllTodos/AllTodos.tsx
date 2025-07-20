import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SegmentedTabs from '../ui/SegmentedTabs';
import { useState } from 'react';
import TasksList from './TodosList/TodosList';
import TasksCards from './TodosCards/TodosCards';
import LoadingComponent from '../ui/LoadingComponent';
import { useGetTodosQuery } from '@/services/api';

const AllTodos = () => {
  const [currentTab, setCurrentTab] = useState('Lists'); // 'Lists' or 'Cards'
  const { data: todos, error, isLoading } = useGetTodosQuery();
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
          (currentTab === 'Lists' ? <TasksList /> : <TasksCards />)}
      </div>
    </div>
  );
};

export default AllTodos;
