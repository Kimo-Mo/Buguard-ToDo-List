import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DragOverlay } from '@dnd-kit/core';

import { useState, type ReactNode } from 'react';
import type { ITodo } from '@/services/types';
import TodoOverlay from './TodoOverlay';
import CardOverlay from './CardOverlay';
import { useUpdateTodoQuery } from '@/services/api';

type DndProviderProps = {
  children: ReactNode;
  todosData: ITodo[];
  setTodosData: React.Dispatch<React.SetStateAction<ITodo[]>>;
  currentTab: string;
};

const DndProvider = ({
  children,
  todosData,
  setTodosData,
  currentTab,
}: DndProviderProps) => {
  const { mutate } = useUpdateTodoQuery();

  const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveTodo(() => {
      const draggedItem = todosData.find((item) => item.id === active.id);
      return draggedItem || null;
    });
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !activeTodo) {
      setActiveTodo(null);
      return;
    }

    const activeItem = todosData.find((item) => item.id === active.id);
    const overItem = todosData.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      setActiveTodo(null);
      return;
    }

    const isSameCategory = activeItem.status === overItem.status;

    setTodosData((prevTodos) => {
      const newTodos = [...prevTodos];
      const oldIndex = newTodos.findIndex((item) => item.id === active.id);
      const newIndex = newTodos.findIndex((item) => item.id === over.id);

      if (isSameCategory) {
        const reordered = arrayMove(newTodos, oldIndex, newIndex);

        const sameCategoryTodos = reordered.filter(
          (todo) => todo.status === activeItem.status
        );

        sameCategoryTodos.forEach((todo, index) => {
          mutate(
            {
              id: todo.id,
              todo: { ...todo, order: index },
            },
            {
              onSuccess: () => {
                console.log('Todo order updated successfully');
              },
              onError: (error) => {
                console.error('Error updating todo order:', error);
              },
            }
          );
        });

        return reordered;
      } else {
        const updatedItem = {
          ...activeItem,
          status: overItem.status,
          order: newIndex,
        };
        newTodos.splice(oldIndex, 1);
        newTodos.splice(newIndex, 0, updatedItem);

        mutate(
          {
            id: updatedItem.id,
            todo: updatedItem,
          },
          {
            onSuccess: () => {
              console.log('Todo updated successfully');
            },
            onError: (error) => {
              console.error('Error updating todo:', error);
            },
          }
        );
        return newTodos;
      }
    });

    setActiveTodo(null);
  };

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={handleDragEnd}>
      {children}
      <DragOverlay>
        {activeTodo &&
          (currentTab === 'Lists' ? (
            <TodoOverlay activeTodo={activeTodo} />
          ) : currentTab === 'Cards' ? (
            <CardOverlay activeTodo={activeTodo} />
          ) : null)}
      </DragOverlay>
    </DndContext>
  );
};

export default DndProvider;
