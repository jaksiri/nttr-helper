import { GameAction } from "../types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit2, X } from "lucide-react";
import { useEffect, useState } from "react";

const GameActionType = [
  "rent",
  "food",
  "relax",
  "work",
  "purchase",
  "education",
  "other",
];
// const GameActionTypeColor = {
//   rent: "bg-red-200",
//   food: "bg-yellow-200",
//   relax: "bg-purple-200",
//   work: "bg-green-200",
//   purchase: "bg-pink-200",
//   education: "bg-blue-200",
//   other: "bg-gray-100",
// };
const GameActionTypeColor = {
  rent: "border-red-400",
  food: "border-yellow-400",
  relax: "border-purple-400",
  work: "border-green-400",
  purchase: "border-pink-400",
  education: "border-blue-400",
  other: "border-gray-200",
};

function Task({
  task,
  deleteTask,
  updateTask,
}: {
  task: GameAction;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: GameAction) => void;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // State Value to be changed when editing
  const [thisTask, setThisTask] = useState<GameAction>(task);

  // DnD Kit
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleInputChange(e: any) {
    const { name, value } = e;
    setThisTask((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (!isEditing) {
      updateTask(task.id, thisTask);
    }
  }, [task.id, thisTask, isEditing, updateTask]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex flex-row rounded p-3 gap-3 relative shadow-md bg-gray-50 h-[100px] min-h-[100px] opacity-50 border-2 border-dashed",
          GameActionTypeColor[thisTask.type as keyof typeof GameActionTypeColor]
        )}
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-row rounded p-3 gap-3 relative shadow-md bg-gray-50 min-h-[100px]",
        GameActionTypeColor[thisTask.type as keyof typeof GameActionTypeColor],
        "border-r-8 cursor-grab",
        task.completed ? "opacity-50" : ""
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      {...attributes}
      {...listeners}
    >
      <Checkbox
        checked={thisTask.completed}
        onClick={() => {
          setThisTask((prev) => ({ ...prev, completed: !prev.completed }));
        }}
      />
      <div className="flex flex-col flex-grow gap-2">
        {/* <p className="text-xs font-medium">Type:</p> */}
        <Select
          value={thisTask.type}
          onValueChange={(x) => {
            handleInputChange({ name: "type", value: x });
            setIsHovered(false);
          }}
        >
          <SelectTrigger className="w-full" id={"type" + task.id}>
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            {GameActionType.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isEditing ? (
          <Textarea
            id={"note-" + task.id}
            name="notes"
            value={thisTask.notes}
            onChange={(e) => handleInputChange(e.target)}
            onBlur={() => {
              setIsEditing(false);
            }}
            className="w-full bg-transparent mt-[6px] mb-[6px]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                return;
              } else if (e.key === "Enter" || e.key === "Escape") {
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <div className="py-1 text-sm flex flex-col gap-1 items-top">
            <div
              className="flex flex-row gap-1 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 width={12} height={12} className="text-gray-400" />
              <div className="text-xs font-medium text-gray-400">Notes: </div>
            </div>
            <p className="whitespace-pre-wrap overflow-x-auto overflow-y-auto h-[90%]">
              {task.notes}
            </p>
          </div>
        )}
      </div>

      {isHovered && (
        <div
          onClick={() => deleteTask(task.id)}
          className="absolute right-0 translate-x-2/3 top-0 -translate-y-1/3 hover:bg-red-500 border border-red-500 hover:text-white bg-white text-red-500 w-6 h-6 flex items-center justify-center rounded-full "
        >
          <X width={16} height={16} />
        </div>
      )}
    </div>
  );
}

export default Task;
