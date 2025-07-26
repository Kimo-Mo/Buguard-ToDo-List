import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';
import type { ITodo } from '@/services/types';
import { useCreateTodoQuery, useUpdateTodoQuery } from '@/services/api';

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
  const [form] = Form.useForm();
  useEffect(() => {
    if (!open) return;

    form.resetFields();
    if (mode === 'edit' && initialValues) {
      form.setFieldsValue({
        ...initialValues,
      });
    } else {
      form.setFieldsValue({
        status: initialValues?.status || 'todo',
        priority: initialValues?.priority || 'Medium',
      });
    }
  }, [open, initialValues, form, mode]);

  const addTodo = useCreateTodoQuery();
  const updataTodo = useUpdateTodoQuery();
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        dueDate: values.dueDate?.format('YYYY-MM-DD'),
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
      onClose();
    } catch (error) {
      console.error('Validation or mutation error:', error);
      message.error('Something went wrong, please try again');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
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
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status' }]}>
          <Select options={statusOptions} />
        </Form.Item>
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
        <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true, message: 'Please enter an assignee' }]}>
          <Input placeholder="Assignee name" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select a due date' }]}>
          <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select a priority' }]}>
          <Select options={priorityOptions} />
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
          <Input.TextArea rows={3} placeholder="Task description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
