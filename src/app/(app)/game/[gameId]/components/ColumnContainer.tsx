import React, { useMemo } from "react";
import { GameAction, WeekData } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: week.id,
      data: {
        type: "Week",
        week,
      },
      disabled: true,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  return (
    <div
      className="min-w-[350px] min-h-[840px] rounded-md flex flex-col bg-gray-50 p-4 shadow-xl cursor-default"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* Column Header */}
      <div id="column-header">
        <div className="flex flex-row justify-between">
          <p className="font-semibold">Week {week.weekNumber}</p>
          <PlusCircle
            height={20}
            width={20}
            onClick={() => createTask(week.id)}
            className="cursor-pointer hover:opacity-50 transition-opacity"
          />
        </div>
        <hr className="mt-2" />
      </div>

      {/* Column Body */}
      <div id="column-body" className="flex flex-col space-y-2 py-2 flex-grow">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
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
