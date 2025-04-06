import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const tasks = await db.getTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const newTask = await db.createTask(title);
  return NextResponse.json(newTask, { status: 201 });
}
