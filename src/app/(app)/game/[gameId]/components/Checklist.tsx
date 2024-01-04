import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { ChecklistItem } from "../types";
import ChecklistItemComponent from "./ChecklistItemComponent";
import { PlusCircle } from "lucide-react";

function Checklist({
  gameId,
  checklistItems,
  setChecklistItems,
}: {
  gameId: string;
  checklistItems: ChecklistItem[];
  setChecklistItems: Dispatch<SetStateAction<ChecklistItem[]>>;
}) {
  return (
    <div className="rounded bg-gray-100 h-full p-4 space-y-2">
      <div className="flex flex-row justify-between">
        <p className="font-semibold">Checklist</p>
        <PlusCircle width={20} height={20} onClick={createChecklistItem} />
      </div>
      <hr className=" border-gray-500" />
      <div className="flex flex-col space-y-2">
        {checklistItems.map((item) => (
          <ChecklistItemComponent
            key={item.id}
            item={item}
            updateChecklistItem={updateChecklistItem}
            deleteChecklistItem={deleteChecklistItem}
          />
        ))}
      </div>
    </div>
  );

  function createChecklistItem() {
    const newChecklistItem: ChecklistItem = {
      id: uuid(),
      gameId,
      completed: false,
      text: "",
    };
    setChecklistItems([...checklistItems, newChecklistItem]);
  }

  function deleteChecklistItem(id: string) {
    setChecklistItems(checklistItems.filter((item) => item.id !== id));
  }

  function updateChecklistItem(id: string, checklistItem: ChecklistItem) {
    setChecklistItems(
      checklistItems.map((item) => (item.id === id ? checklistItem : item))
    );
  }
}

export default Checklist;
