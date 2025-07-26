import type { Dayjs } from "dayjs";

export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'Low' | 'Medium' | 'High';
  assignee?: string;
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
