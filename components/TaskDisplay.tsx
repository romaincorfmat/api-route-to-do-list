"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/stores/useTaskStore";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="grid grid-cols-2 gap-6 items-center justify-between  border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="grid grid-cols-2 gap-4  max-sm:flex-col max-sm:flex">
                <p className="text-lg font-semibold max-sm:text-sm">
                  {index + 1} : {task.title}
                </p>
                <p className="text-lg font-semibold max-sm:text-sm">
                  Completed:{" "}
                  <span
                    className={cn(
                      task.completed === true
                        ? "text-green-400"
                        : "text-red-500",
                      "capitalize "
                    )}
                  >
                    {task.completed.toString()}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 max-sm:flex-col max-sm:flex">
                <Button
                  className="max-md:text-xs"
                  onClick={() => toggleCompletion(task.id)}
                >
                  Mark as completed
                </Button>
                <Button
                  className="max-md:text-xs"
                  variant="destructive"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDisplay;
