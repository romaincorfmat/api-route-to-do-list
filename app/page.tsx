import TaskDisplay from "@/components/TaskDisplay";
import TaskForm from "@/components/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  p-4">
      <h1>Simple To do List using Zustand and API routes</h1>
      <div className="flex flex-col items-center justify-center w-full p-4 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="hidden">Task Form Card</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm />
          </CardContent>
        </Card>
        <TaskDisplay />
      </div>
    </div>
  );
}
