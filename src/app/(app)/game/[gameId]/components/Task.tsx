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
import { Edit2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const GameActionType = ["rent", "food", "relax", "work", "other", "purchase"];

function Task({
  task,
  deleteTask,
  updateTask,
}: {
  task: GameAction;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: GameAction) => void;
}) {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  // State Value to be changed when editing
  const [thisTask, setThisTask] = useState<GameAction>(task);

  function handleInputChange(e: any) {
    const { name, value } = e;
    setThisTask((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    updateTask(task.id, thisTask);
    // Want this to only update when task checkbox is clicked
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id, thisTask.completed]);

  return (
    <div
      className="flex flex-row bg-slate-200 rounded p-3 gap-3 relative shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Checkbox
        checked={thisTask.completed}
        onClick={() => {
          setThisTask((prev) => ({ ...prev, completed: !prev.completed }));
        }}
      />
      <div className="flex flex-col flex-grow gap-2">
        <p className="text-xs font-medium">Type:</p>
        <Select
          value={thisTask.type}
          onValueChange={(x) => {
            handleInputChange({ name: "type", value: x });
            setIsHovered(false);
            updateTask(task.id, thisTask);
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
              updateTask(task.id, thisTask);
            }}
            className="w-full bg-transparent mt-[6px] mb-[6px]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                updateTask(task.id, thisTask);
              }
            }}
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="py-1 text-sm flex flex-row gap-1 items-center cursor-pointer"
          >
            <Edit2 width={12} height={12} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-400">Notes: </span>
            {task.notes}
          </div>
        )}
      </div>

      {isHovered && (
        <Button
          onClick={() => deleteTask(task.id)}
          className="absolute right-0 translate-x-1/2 top-0 -translate-y-1/2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          variant="outline"
          size="icon"
        >
          <X />
        </Button>
      )}
    </div>
  );
}

export default Task;
