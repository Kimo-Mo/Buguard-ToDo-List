import TodosCategory from './TodosCategory';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import type { ITodo } from '@/services/types';
import { SortableContext } from '@dnd-kit/sortable';
import DndProvider from '@/components/AllTodos/shared/DndProvider';

type TodosCardsProps = {
  todosData: ITodo[];
  setTodosData: Dispatch<SetStateAction<ITodo[]>>;
  currentTab: 'Lists' | 'Cards';
};
const TodosList = ({
  todosData,
  setTodosData,
  currentTab,
}: TodosCardsProps) => {
  const todoItems = useMemo(
    () => todosData.filter((todo: ITodo) => todo.status === 'todo'),
    [todosData]
  );
  const inProgressItems = useMemo(
    () => todosData.filter((todo: ITodo) => todo.status === 'in-progress'),
    [todosData]
  );
  const doneItems = useMemo(
    () => todosData.filter((todo: ITodo) => todo.status === 'done'),
    [todosData]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-y-3 gap-x-6 bg-card px-6 py-3 rounded-lg shadow-sm">
        <p className="flex-1">To-Do Name</p>
        <p>Assignee</p>
        <p>Due Date</p>
        <p>Priority</p>
      </div>

      <DndProvider
        todosData={todosData}
        setTodosData={setTodosData}
        currentTab={currentTab}>
        <SortableContext id="todo" items={todoItems.map((todo) => todo.id)}>
          <TodosCategory label={'To-Do'} todos={todoItems} catId="todo" />
        </SortableContext>
        <SortableContext
          id="in-progress"
          items={inProgressItems.map((todo) => todo.id)}>
          <TodosCategory
            label={'In-Progress'}
            todos={inProgressItems}
            catId="in-progress"
          />
        </SortableContext>
        <SortableContext id="done" items={doneItems.map((todo) => todo.id)}>
          <TodosCategory label={'Done'} todos={doneItems} catId="done" />
        </SortableContext>
      </DndProvider>
    </div>
  );
};

export default TodosList;
