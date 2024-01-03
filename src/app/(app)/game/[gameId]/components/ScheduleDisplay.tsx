import React from "react";
import { GameAction, WeekData } from "../types";
import { cn } from "@/lib/utils";

export default function ScheduleDisplay({
  weeks,
  gameActions,
  currentWeek,
  changeCurrentWeek,
}: {
  weeks: WeekData[];
  gameActions: GameAction[];
  currentWeek: number;
  changeCurrentWeek: (week: number) => void;
}) {
  return (
    <div className="w-full h-48 bg-gray-50 rounded flex flex-row gap-2 p-4 overflow-x-scroll">
      {weeks.map((week) =>
        mapWeeksAndActions(week, currentWeek, changeCurrentWeek, gameActions)
      )}
    </div>
  );
}

function mapWeeksAndActions(
  week: WeekData,
  currentWeek: number,
  changeCurrentWeek: (week: number) => void,
  gameActions: GameAction[]
) {
  const regularTasksThisWeek = gameActions.filter(
    (action) => action.weekId === week.id
  ).length;

  const currentWeekBorder =
    week.weekNumber === currentWeek + 1
      ? "outline outline-2 outline-gray-500 outline-offset-2"
      : "";

  return (
    <div
      key={week.id}
      className={cn(
        "w-full h-25 bg-gray-200 rounded-sm relative overflow-hidden max-w-[36px] min-w-6 border-spac",
        currentWeekBorder
      )}
      onClick={() => changeCurrentWeek(week.weekNumber - 1)}
    >
      <p className="absolute top-1 left-1/2 text-gray-800 -translate-x-1/2 opacity-60">
        {week.weekNumber}
      </p>
      <div className="flex flex-col justify-end h-full w-full">
        {/* Tasks Progress Bar */}
        <div
          className="block w-full bg-red-400 opacity-50"
          style={{ height: `${regularTasksThisWeek * 10}px` }}
        ></div>
      </div>
    </div>
  );
}
