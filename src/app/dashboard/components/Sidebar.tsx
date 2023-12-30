import React from "react";
import { Button } from "@/components/ui/button";

function Sidebar() {
  return (
    <div className="flex flex-col px-6 py-4 border-r h-full md:min-w-[240px]">
      <Button>Start New Game</Button>
    </div>
  );
}

export default Sidebar;
