import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, message, Button } from 'antd';
import type { ISubTask, ITodo } from '@/services/types';
import { useCreateTodoQuery, useUpdateTodoQuery } from '@/services/api';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useTheme } from '@/services/context';

export interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Partial<ITodo> | null;
  mode?: 'add' | 'edit';
}

const statusOptions = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

const priorityOptions = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  initialValues,
  mode = 'add',
}) => {
  const [subTasks, setSubTasks] = useState<ISubTask[]>(
    initialValues?.subTasks || []
  );
  const [description, setDescription] = useState<string | undefined>(
    initialValues?.description || ''
  );

  const { theme } = useTheme();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    if (initialValues?.subTasks) {
      setSubTasks(initialValues.subTasks);
    }

    form.resetFields();
    if (mode === 'edit' && initialValues) {
      form.setFieldsValue({
        ...initialValues,
      });
      setDescription(initialValues.description);
    } else {
      form.setFieldsValue({
        status: initialValues?.status || 'todo',
        priority: initialValues?.priority || 'Medium',
        description: initialValues?.description || '',
      });
    }
  }, [open, initialValues, form, mode]);

  const addTodo = useCreateTodoQuery();
  const updataTodo = useUpdateTodoQuery();
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (subTasks.map((s) => s.title).some((title) => !title.trim())) {
        message.error('All subtasks must have a title');
        throw new Error('Subtask titles cannot be empty');
      }

      const formattedValues = {
        ...values,
        dueDate: values.dueDate?.format('YYYY-MM-DD'),
        description: description,
        subTasks: subTasks,
      };

      if (mode === 'add') {
        await addTodo.mutateAsync(formattedValues, {
          onSuccess: () => message.success('Task added successfully'),
        });
      } else if (mode === 'edit' && initialValues?.id) {
        await updataTodo.mutateAsync(
          { id: initialValues.id, todo: formattedValues },
          { onSuccess: () => message.success('Task updated successfully') }
        );
      }

      form.resetFields();
      handleCancel();
    } catch (error) {
      console.error('Validation or mutation error:', error);
    } finally {
      restoreScrollbar();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setDescription('');
    restoreScrollbar();
    setSubTasks([]);
    onClose();
  };
  const restoreScrollbar = () => {
    document.body.style.overflow = 'auto';
  };

  return (
    <Modal
      open={open}
      title={mode === 'edit' ? 'Edit Task' : 'Add Task'}
      onCancel={handleCancel}
      onOk={handleOk}>
      <Form className="!mt-4" form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input placeholder="Task title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              min: 5,
              message: 'Please enter a description (min 5 characters)',
            },
          ]}>
          <div data-color-mode={theme}>
            <MDEditor
              height={160}
              value={description}
              commands={[...commands.getCommands()]}
              onChange={setDescription}
              textareaProps={{
                placeholder: 'Enter task description',
                minLength: 5,
              }}
            />
          </div>
        </Form.Item>
        <div className="flex justify-between items-center gap-x-4 flex-col md:flex-row *:flex-1 *:w-full">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}>
            <Select options={statusOptions} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select a priority' }]}>
            <Select options={priorityOptions} />
          </Form.Item>
        </div>
        <div className="flex justify-between items-center gap-x-4 flex-col md:flex-row *:flex-1 *:w-full">
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select a due date' }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: 'Please enter an assignee' }]}>
            <Input placeholder="Assignee name" />
          </Form.Item>
        </div>
        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            {
              required: true,
              type: 'array',
              min: 1,
              max: 3,
              message: 'Please add one to three tags',
            },
          ]}>
          <Select mode="tags" placeholder="Add tags" />
        </Form.Item>
        {subTasks.map((subtask, index) => (
          <div key={subtask.id || index} className="flex items-center mb-2">
            <Input
              placeholder="Subtask title"
              value={subtask.title}
              onChange={(e) => {
                const newSubtasks = [...subTasks];
                newSubtasks[index].title = e.target.value;
                setSubTasks(newSubtasks);
              }}
            />
            <Button
              type="link"
              danger
              onClick={() => {
                const updated = subTasks.filter((_, i) => i !== index);
                setSubTasks(updated);
              }}>
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="default"
          onClick={() =>
            setSubTasks((prev) => [
              ...prev,
              { id: `sub-${Date.now()}`, title: '', completed: false },
            ])
          }
          block>
          Add Subtask
        </Button>
      </Form>
    </Modal>
  );
};

export default TaskModal;
