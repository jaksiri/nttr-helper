"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChecklistItem, GameAction, GameLength, Job, WeekData } from "../types";
import ScheduleDisplay from "./ScheduleDisplay";
import Checklist from "./Checklist";
import JobSelector from "./JobSelector";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  initChecklistData,
  initTasksData,
  initWeeksData,
} from "../utils/InitFunctions";
import KanbanBoard from "./KanbanBoard";

type Props = {
  gameId: string;
  gameLength: GameLength;
};

const initialJobData: Job = {
  id: "",
  name: "",
  income: 0,
  location: "",
  experienceRequired: 0,
};

export default function GameClientBoard({ gameId, gameLength }: Props) {
  // Data States
  const [weeks, setWeeks] = useState<WeekData[]>([]);

  const [gameActions, setGameActions] = useState<GameAction[]>([]);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  // Current States
  const [currentJob, setCurrentJob] = useLocalStorage<Job | undefined>(
    `nttr-currentJob-${gameId}`,
    undefined
  );

  const [lastSaved, setLastSaved] = useState<Date>(new Date(Date.now()));

  // Initialize Week Data
  useEffect(() => {
    setWeeks(initWeeksData(gameId, gameLength));
    setChecklistItems(initChecklistData(gameId));
  }, [gameId, gameLength, setChecklistItems]);

  // Initialize Game Actions from Local Storage
  useEffect(() => {
    if (weeks.length > 0) {
      setGameActions(initTasksData(gameLength, weeks));
    }
  }, [gameId, gameLength, weeks]);

  // Autosaving Game Actions to Local Storage
  useEffect(() => {
    if (gameActions.length === 0) return;
    if (new Date(Date.now()).getTime() - lastSaved.getTime() > 180000) {
      // Saving Checklist Item
      localStorage.setItem(
        `nttr-checklist-${gameId}`,
        JSON.stringify(checklistItems)
      );

      // Saving Game Actions
      localStorage.setItem(`nttr-tasks-${gameId}`, JSON.stringify(gameActions));

      // Change Last Save time
      setLastSaved(new Date(Date.now()));
    }
  }, [checklistItems, gameActions, gameId, lastSaved]);

  return (
    <div className="w-full rounded grid grid-cols-10 row-auto gap-4">
      <div className="flex flex-col col-span-8 gap-4">
        {/* <ScheduleDisplay weeks={weeks} gameActions={gameActions} /> */}
        <JobSelector currentJob={currentJob} changeCurrentJob={setCurrentJob} />
      </div>

      {/* right block */}
      <div className="flex flex-col gap-4 w-full col-span-2 row-span-5">
        <Checklist
          checklistItems={checklistItems}
          setChecklistItems={setChecklistItems}
          gameId={gameId}
        />
      </div>

      {/* left block */}
      <div className="flex flex-col col-span-8 space-y-4 row-span-4">
        <KanbanBoard
          weeks={weeks}
          tasks={gameActions}
          setTasks={setGameActions}
        />
      </div>
    </div>
  );
}
