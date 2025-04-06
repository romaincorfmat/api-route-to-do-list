"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/stores/useTaskStore";
import { Button } from "./ui/button";

const TaskDisplay = () => {
  const { tasks, fetchTasks, toggleCompletion, deleteTask } = useTaskStore();
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="hidden">Task Form Card</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex gap-6 items-center justify-between"
            >
              <p>{task.id}</p>
              <p>{task.title}</p>
              <p>Completed: {task.completed.toString()}</p>
              <Button onClick={() => toggleCompletion(task.id)}>
                Mark as completed
              </Button>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDisplay;
