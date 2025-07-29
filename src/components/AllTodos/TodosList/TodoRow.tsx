import {
  CaretDownIcon,
  CaretRightIcon,
  CheckCircleIcon,
  FlagIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import {
  Avatar,
  Divider,
  message,
  Popconfirm,
  type PopconfirmProps,
} from 'antd';
import { HolderOutlined, UserOutlined } from '@ant-design/icons';
import type { ISubTask, ITodo } from '@/services/types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useDeleteTodoQuery, useUpdateTodoQuery } from '@/services/api';

const TodoRow = ({
  todo,
  openEditModal,
}: {
  todo: ITodo;
  openEditModal: (todo: ITodo) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    title,
    // assignee,
    dueDate,
    priority,
    subTasks = [],
    completed,
    tags,
  } = todo;
  const [subTasksVisible, setSubTasksVisible] = useState(false);
  const toggleSubtasks = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setSubTasksVisible((prev) => !prev);
  };

  const updateTodo = useUpdateTodoQuery();
  const toggleCheckTodo = () => {
    if (!todo.id) return;

    updateTodo.mutate(
      {
        id: todo.id,
        todo: {
          ...todo,
          completed: !todo.completed,
        },
      },
      {
        onSuccess: () => {
          message.success('Todo updated successfully');
        },
        onError: (error) => {
          console.error('Failed to toggle todo:', error);
          message.error('Failed to update todo');
        },
      }
    );
  };
  const toggleCheckSubTask = (subTaskId: string) => {
    if (!todo.id || !todo.subTasks) return;

    const updatedSubTasks = todo.subTasks.map((subTask) => {
      if (subTask.id === subTaskId) {
        return { ...subTask, completed: !subTask.completed };
      }
      return subTask;
    });

    const updatedTodo = {
      ...todo,
      subTasks: updatedSubTasks,
    };

    updateTodo.mutate(
      { id: todo.id, todo: updatedTodo },
      {
        onSuccess: () => {
          message.success('Subtask updated successfully');
        },
        onError: (error) => {
          console.error('Error updating subtask:', error);
          message.error('Failed to update subtask');
        },
      }
    );
  };

  const deleteTodo = useDeleteTodoQuery();
  const confirmDelete: PopconfirmProps['onConfirm'] = () => {
    deleteTodo.mutate(todo.id, {
      onSuccess: () => message.success('Todo deleted successfully'),
      onError: (error) => {
        console.error('Failed to delete todo:', error);
        message.error('Failed to delete todo');
      },
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-3 py-3 px-4  border-b border-border hover:bg-input transition-background duration-150">
        <div
          className="opacity-0 group-hover:opacity-100 duration-300 transition-opacity cursor-move flex items-center"
          {...listeners}
          {...attributes}
          onMouseDown={(e) => e.preventDefault()}>
          <HolderOutlined className="text-description text-lg size-4" />
        </div>
        <div className="flex flex-1 items-center gap-2">
          {subTasksVisible && subTasks.length > 0 ? (
            <CaretDownIcon
              weight="fill"
              color="var(--c-description)"
              className="cursor-pointer size-4"
              onClick={toggleSubtasks}
            />
          ) : (
            <CaretRightIcon
              weight="fill"
              color="var(--c-description)"
              className="cursor-pointer size-4"
              onClick={toggleSubtasks}
            />
          )}
          <CheckCircleIcon
            weight={completed ? 'fill' : 'regular'}
            className="cursor-pointer size-4"
            color={completed ? 'var(--c-primary)' : 'var(--c-description)'}
            onClick={toggleCheckTodo}
          />

          <div
            className="flex-1 cursor-pointer flex flex-wrap items-center gap-2"
            onClick={() => openEditModal(todo)}>
            <p className={completed ? 'line-through text-description' : ''}>
              {title}
            </p>
            {tags &&
              tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-xl bg-danger/20 text-danger/75 px-2 inline-block">
                  {tag}
                </span>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {/* <p>{assignee}</p> */}
          <Avatar size={20} icon={<UserOutlined />} />
          <Divider type="vertical" />
          <p>{dueDate?.toString()}</p>
          <Divider type="vertical" />
          {priority === 'High' ? (
            <FlagIcon size={20} weight="fill" fill="var(--c-danger)" />
          ) : priority === 'Medium' ? (
            <FlagIcon size={20} weight="fill" fill="var(--c-info)" />
          ) : (
            <FlagIcon size={20} fill="var(--c-text)" />
          )}
          <Divider type="vertical" />
          <Popconfirm
            className="cursor-pointer"
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirmDelete}
            okText="Yes"
            cancelText="No">
            <TrashIcon size={20} />
          </Popconfirm>
        </div>
      </div>
      {!isDragging && subTasks.length > 0 && subTasksVisible && (
        <div>
          {subTasks.map((subTask: ISubTask) => (
            <div
              key={subTask.id}
              className="flex items-center justify-between gap-x-4 py-2 ps-12 md:ps-16 border-b border-border hover:bg-input transition-background duration-150">
              <CheckCircleIcon
                weight={subTask.completed ? 'fill' : 'regular'}
                className="cursor-pointer size-4 md:ms-4 "
                color={
                  subTask.completed
                    ? 'var(--c-primary)'
                    : 'var(--c-description)'
                }
                onClick={() => toggleCheckSubTask(subTask.id)}
              />
              <p
                className={`flex-1 ${
                  subTask.completed ? 'line-through text-description' : ''
                }`}>
                {subTask.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoRow;
