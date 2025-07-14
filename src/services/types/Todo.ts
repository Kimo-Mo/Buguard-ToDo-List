export interface ITodo {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  assignee?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
  tags: string[];
  subtasks?: number;
  completedSubtasks?: number;
}
