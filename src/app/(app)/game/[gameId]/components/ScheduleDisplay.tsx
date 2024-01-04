"use client";
import React from "react";
import { GameAction, WeekData } from "../types";
import { cn } from "@/lib/utils";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

export default function ScheduleDisplay({
  weeks,
  gameActions,
}: {
  weeks: WeekData[];
  gameActions: GameAction[];
}) {
  const scrollRef = useHorizontalScroll();

  return (
    <div
      ref={scrollRef}
      className="w-full md:min-h-[100px] h-full bg-gray-50 rounded flex flex-row gap-2 p-4 overflow-x-auto"
    >
      {weeks.map((week) => mapWeeksAndActions(week, gameActions))}
    </div>
  );
}

function mapWeeksAndActions(week: WeekData, gameActions: GameAction[]) {
  const regularTasksThisWeek = gameActions.filter(
    (action) => action.weekId === week.id
  ).length;

  return (
    <div
      key={week.id}
      className={cn(
        "w-full h-full bg-gray-200 rounded-sm relative overflow-hidden max-w-[24px] min-w-5"
      )}
    >
      <p className="absolute top-1 left-1/2 text-gray-800 text-xs -translate-x-1/2 opacity-60">
        {week.weekNumber}
      </p>
      <div className="flex flex-col justify-end h-full w-full">
        {/* Tasks Progress Bar */}
        <div
          className="block w-full bg-red-400 opacity-50"
          style={{
            height: `${
              regularTasksThisWeek * 10 > 100 ? 100 : regularTasksThisWeek * 10
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
}
