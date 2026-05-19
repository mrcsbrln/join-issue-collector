import { TaskWithRelations } from "@/lib/types";

export const mockTask: TaskWithRelations = {
  id: "test-id-1",
  title: "Fix login bug",
  description: "Users cannot log in with Google OAuth",
  category: "Technical Task",
  priority: "urgent",
  due_date: "2026-06-01",
  status: "triage",
  created_at: "2026-05-01T10:00:00Z",
  creator_email: "dev@example.com",
  creator_type: "internal",
  subtasks: [
    {
      id: "s1",
      task_id: "test-id-1",
      title: "Investigate root cause",
      completed: true,
      position: 0,
    },
    {
      id: "s2",
      task_id: "test-id-1",
      title: "Write fix",
      completed: false,
      position: 1,
    },
  ],
  contacts: [
    {
      id: "c1",
      name: "Alice Brown",
      email: "alice@example.com",
      phone: null,
      color: "#FF7A00",
      created_at: "2026-01-01T00:00:00Z",
    },
  ],
};

export const mockTaskNoExtras: TaskWithRelations = {
  ...mockTask,
  id: "test-id-2",
  description: null,
  subtasks: [],
  contacts: [],
};
