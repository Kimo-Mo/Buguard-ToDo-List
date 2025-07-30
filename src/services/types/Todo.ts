import type { Dayjs } from 'dayjs';
import type { IAssignee } from './Assignee';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'Low' | 'Medium' | 'High';
  assigneeId: string;
  assignee?: IAssignee;
  dueDate?: string | Dayjs;
  tags: string[];
  subTasks?: ISubTask[];
  completed: boolean;
  order: number;
}
export interface ISubTask {
  id: string;
  title: string;
  completed: boolean;
}
