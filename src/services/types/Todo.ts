export interface ITodo {
  id: string;
  title: string;
  description: string,
  status: 'todo' | 'in-progress' | 'done';
  priority: 'Low' | 'Medium' | 'High';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  subTasks?: ISubTask[];
  completed: boolean;
}
export interface ISubTask {
  id: string;
  title: string;
  completed: boolean;
}
