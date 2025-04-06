// app/api/tasks/[taskId]/route.ts
import { NextResponse } from "next/server";
import { tasks } from "@/fakeTasks";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> } // Params is now a Promise
) {
  try {
    // Await the params Promise
    const taskId = (await params).taskId;
    const body = await request.json();

    // Find and update the task
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Merge updates with existing task
    tasks[taskIndex] = { ...tasks[taskIndex], ...body };

    return NextResponse.json(tasks[taskIndex]);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> } // Params is now a Promise
) {
  try {
    // Await the params Promise
    const taskId = (await params).taskId;

    // Find and update the task
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Merge updates with existing task
    const [deletedTask] = tasks.splice(taskIndex, 1);
    return NextResponse.json({ deleted: deletedTask, success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
