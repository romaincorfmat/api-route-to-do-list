import { tasks } from "@/fakeTasks";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  revalidatePath("/");
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newTask = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };
  tasks.push(newTask);
  revalidatePath("/");
  return NextResponse.json(newTask, { status: 201 });
}
