import prisma from "./prima";
export const db = {
  getTasks: async () => prisma.task.findMany(),
  createTask: async (title: string) =>
    prisma.task.create({
      data: { title },
    }),
  toggleCompletion: async (taskId: number) => {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.task.update({
      where: { id: taskId },
      data: { completed: !task.completed },
    });
  },
  deleteTask: async (taskId: number) => {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.task.delete({
      where: { id: taskId },
    });
  },
};
