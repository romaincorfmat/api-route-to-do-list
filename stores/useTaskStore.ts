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
      throw new Error("Failed to fetch tasks");
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
    const currentTask = useTaskStore
      .getState()
      .tasks.find((task) => task.id === taskId);
    if (!currentTask) {
      throw new Error("Task not found");
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !currentTask.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle task completion");
      }

      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      }));
    } catch (error) {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: currentTask.completed }
            : task
        ),
      }));
      console.error("Error toggling task completion:", error);
    }
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
