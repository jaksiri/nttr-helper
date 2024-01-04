"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { GameAction, WeekData } from "../types";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { v4 as uuid } from "uuid";
import ColumnContainer from "./ColumnContainer";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

export default function KanbanBoard({
  weeks,
  weeksId,
  tasks,
  setTasks,
}: {
  weeks: WeekData[];
  weeksId: string[];
  tasks: GameAction[];
  setTasks: Dispatch<SetStateAction<GameAction[]>>;
}) {
  const [activeTask, setActiveTask] = useState<GameAction | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const scrollRef = useHorizontalScroll();

  return (
    <div className="h-full">
      <DndContext
        sensors={sensors}
        // onDragStart={onDragStart}
        // onDragEnd={onDragEnd}
        // onDragOver={onDragOver}
      >
        <div
          className="flex gap-4 p-4 bg-gray-100 rounded overflow-x-auto"
          ref={scrollRef}
        >
          {weeks.map((week) => (
            <ColumnContainer
              key={week.id}
              week={week}
              tasks={tasks.filter((task) => task.weekId === week.id)}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );

  function createTask(weekId: string) {
    const newTask: GameAction = {
      id: uuid(),
      weekId,
      type: "",
      completed: false,
      notes: "",
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: string, newTask: GameAction) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...newTask };
    });

    setTasks(newTasks);
  }
}
