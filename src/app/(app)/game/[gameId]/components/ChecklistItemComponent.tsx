import { useState } from "react";
import { ChecklistItem } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

function ChecklistItemComponent({
  item,
  updateChecklistItem,
  deleteChecklistItem,
}: {
  item: ChecklistItem;
  updateChecklistItem: (id: string, checklistItem: ChecklistItem) => void;
  deleteChecklistItem: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(item.text);

  function saveText() {
    setIsEditing(false);
    updateChecklistItem(item.id, { ...item, text });
  }

  return (
    <div
      className={cn(
        "flex flex-row gap-2 rounded-sm p-1",
        isHovered && "bg-gray-200"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        checked={item.completed}
        className="relative top-[2px]"
        onClick={() => {
          updateChecklistItem(item.id, { ...item, completed: !item.completed });
        }}
      />
      <div className="flex-grow">
        {isEditing ? (
          <Textarea
            className="h-[80px]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveText();
              }
            }}
            onBlur={() => {
              saveText();
            }}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        ) : (
          <p onClick={() => setIsEditing(true)} className="text-sm">
            {item.text || "text here..."}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        {(isHovered || isEditing) && (
          <X
            className="text-red-600"
            onClick={() => {
              deleteChecklistItem(item.id);
            }}
            height={20}
            width={20}
          />
        )}
        {isEditing && (
          <Check
            className="text-green-600"
            onClick={() => saveText()}
            height={20}
            width={20}
          />
        )}
      </div>
    </div>
  );
}

export default ChecklistItemComponent;
