import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleCompletion: (taskId: number) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  // Fetch all tasks from the API
  fetchTasks: async () => {
    const res = await fetch("/api/tasks");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    set({ tasks: await res.json() });
  },
  addTask: async (title: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error("Failed to add task");
    }
    const newTask = await res.json();
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  toggleCompletion: async (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));

    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !useTaskStore
          .getState()
          .tasks.find((task) => task.id === taskId)?.completed,
      }),
    });
  },
  deleteTask: async (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));

    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
}));
