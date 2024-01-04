import React from "react";
import { GameAction, WeekData } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Task from "./Task";

export default function ColumnContainer({
  week,
  tasks,
  createTask,
  deleteTask,
  updateTask,
}: {
  week: WeekData;
  tasks: GameAction[];
  createTask: (weekId: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: GameAction) => void;
}) {
  return (
    <div className="min-w-[350px] min-h-[500px] rounded-md flex flex-col bg-white p-4">
      {/* Column Header */}
      <div id="column-header">
        <p className="font-semibold">Week {week.weekNumber}</p>
        <hr className="mt-2" />
      </div>

      {/* Column Body */}
      <div id="column-body" className="flex flex-col space-y-2 py-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>

      {/* Column Footer */}
      <div id="column-footer" className="w-full">
        <Button
          onClick={() => createTask(week.id)}
          className="select-none w-full flex flex-row items-center justify-center gap-2"
          variant="ghost"
        >
          <PlusCircle height={16} width={16} />
          Add Task
        </Button>
      </div>
    </div>
  );
}
