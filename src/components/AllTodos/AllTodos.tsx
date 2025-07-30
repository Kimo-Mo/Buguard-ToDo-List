import { Button, Result } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import TodosList from './TodosList/TodosList';
import TasksCards from './TodosCards/TodosCards';
import { useGetAssigneesQuery, useGetTodosQuery } from '@/services/api';
import type { IAssignee, ITodo } from '@/services/types';
import {
  ErrorNotFound,
  LoadingComponent,
  SegmentedTabs,
  TaskModal,
} from '../ui';
import dayjs from 'dayjs';
import { useOutletContext } from 'react-router';

const AllTodos = () => {
  const { debouncedSearch } = useOutletContext<{
    debouncedSearch: string;
  }>();
  const [searchFound, setSearchFound] = useState(true);
  const [currentTab, setCurrentTab] = useState<'Lists' | 'Cards'>('Lists'); // 'Lists' or 'Cards'
  const { data: todos, error, isLoading } = useGetTodosQuery();
  const { data: assignees } = useGetAssigneesQuery();
  const TodosWithUsers = useMemo(() => {
    return todos?.map((todo) => ({
      ...todo,
      assignee: assignees.find(
        (user: IAssignee) => user.id === todo.assigneeId
      ),
    }));
  }, [todos, assignees]);
  const [todosData, setTodosData] = useState<ITodo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalInitialValues, setModalInitialValues] =
    useState<Partial<ITodo | null>>(null);

  useEffect(() => {
    if (TodosWithUsers) setTodosData(TodosWithUsers);
  }, [TodosWithUsers]);
  useEffect(() => {
    setSearchFound(true);
    if (debouncedSearch.length > 0 && TodosWithUsers) {
      const filteredTodos = TodosWithUsers.filter((todo) =>
        todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      if (filteredTodos.length === 0) {
        setTodosData([]);
        setSearchFound(false);
        return;
      }
      setTodosData(filteredTodos);
    } else {
      setTodosData(TodosWithUsers || []);
    }
  }, [debouncedSearch, TodosWithUsers]);
  const openAddModal = (initial: Partial<ITodo>) => {
    setModalMode('add');
    setModalInitialValues(initial);
    setModalOpen(true);
  };
  const openEditModal = (todo: ITodo) => {
    setModalMode('edit');

    const fixedDueDate =
      todo.dueDate && typeof todo.dueDate === 'string'
        ? dayjs(todo.dueDate)
        : undefined;

    setModalInitialValues({
      ...todo,
      dueDate: fixedDueDate,
    });

    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalInitialValues(null);
  };

  return (
    <div className="mx-2">
      <TaskModal
        open={modalOpen}
        onClose={closeModal}
        initialValues={modalInitialValues}
        mode={modalMode}
      />
      <div className="flex justify-between items-center">
        <SegmentedTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => openAddModal({ status: 'todo' })}>
          <PlusOutlined /> New Task
        </Button>
      </div>
      <div className="mt-4 mb-6">
        {isLoading && !todos && <LoadingComponent />}
        {error && <ErrorNotFound />}
        {!isLoading &&
          !error &&
          (currentTab === 'Lists' ? (
            <TodosList
              todosData={todosData}
              setTodosData={setTodosData}
              currentTab={currentTab}
              openAddModal={openAddModal}
              openEditModal={openEditModal}
            />
          ) : (
            <TasksCards
              todosData={todosData}
              setTodosData={setTodosData}
              currentTab={currentTab}
              openAddModal={openAddModal}
              openEditModal={openEditModal}
            />
          ))}
        {!searchFound && (
          <Result
            status="error"
            title="No Tasks Found"
            subTitle="Please try again with different search criteria."
          />
        )}
      </div>
    </div>
  );
};

export default AllTodos;
