"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { GameAction, WeekData } from "../types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
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
    <div className="h-full kanban">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div
          className="flex gap-4 p-4 bg-gray-200 rounded overflow-x-auto"
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

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Week";
    if (!isActiveAColumn) return;

    console.log("DRAG END");
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTimeout(() => {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);
          const overIndex = tasks.findIndex((t) => t.id === overId);

          if (tasks[activeIndex].weekId != tasks[overIndex].weekId) {
            // Fix introduced after video recording
            tasks[activeIndex].weekId = tasks[overIndex].weekId;
            return arrayMove(tasks, activeIndex, overIndex - 1);
          }

          return arrayMove(tasks, activeIndex, overIndex);
        });
      }, 0);
    }

    const isOverAColumn = over.data.current?.type === "Week";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTimeout(() => {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);

          tasks[activeIndex].weekId = overId.toString();
          console.log("DROPPING TASK OVER COLUMN", activeIndex);
          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }, 0);
    }
  }
}
