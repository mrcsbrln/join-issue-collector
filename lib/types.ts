export type Priority = "urgent" | "medium" | "low";
export type Category = "Technical Task" | "User Story";
export type TaskStatus = "todo" | "in-progress" | "awaiting-feedback" | "done";

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  color: string;
  is_guest: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  color: string;
  created_at: string;
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  completed: boolean;
  position: number;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  category: Category;
  priority: Priority;
  due_date: string;
  status: TaskStatus;
  created_at: string;
}

export interface TaskWithRelations extends Task {
  subtasks: Subtask[];
  contacts: Contact[];
}

export const COLUMN_LABELS: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In Progress",
  "awaiting-feedback": "Awaiting Feedback",
  done: "Done",
};

export const COLUMN_ORDER: TaskStatus[] = [
  "todo",
  "in-progress",
  "awaiting-feedback",
  "done",
];
