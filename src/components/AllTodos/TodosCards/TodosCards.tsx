import TodosCol from './TodosCol';
import { useMemo } from 'react';
import type { ITodo } from '@/services/types';
import DndProvider from '@/components/AllTodos/shared/DndProvider';
import { SortableContext } from '@dnd-kit/sortable';

import type { Dispatch, SetStateAction } from 'react';

type TodosCardsProps = {
  todosData: ITodo[];
  setTodosData: Dispatch<SetStateAction<ITodo[]>>;
  currentTab: 'Lists' | 'Cards';
};
const TodosCards = ({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <DndProvider
        todosData={todosData}
        setTodosData={setTodosData}
        currentTab={currentTab}>
        <SortableContext id="todo" items={todoItems.map((todo) => todo.id)}>
          <TodosCol label={'To-Do'} todos={todoItems} columnId="todo" />
        </SortableContext>
        <SortableContext
          id="in-progress"
          items={inProgressItems.map((todo) => todo.id)}>
          <TodosCol
            label={'In-Progress'}
            todos={inProgressItems}
            columnId="in-progress"
          />
        </SortableContext>
        <SortableContext id="done" items={doneItems.map((todo) => todo.id)}>
          <TodosCol label={'Done'} todos={doneItems} columnId="done" />
        </SortableContext>
      </DndProvider>
    </div>
  );
};

export default TodosCards;
