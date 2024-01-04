"use client";
import React, { useEffect, useMemo, useState } from "react";
import { GameAction, GameLength, Job, WeekData } from "../types";
import ScheduleDisplay from "./ScheduleDisplay";
import Checklist from "./Checklist";
import JobSelector from "./JobSelector";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  createGameActionDataArray,
  createWeeksDataArray,
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
};

export default function GameClientBoard({ gameId, gameLength }: Props) {
  // Data States
  const [weeks, setWeeks] = useState<WeekData[]>([]);

  const [gameActions, setGameActions] = useState<GameAction[]>([]);

  // Current States
  const [currentJob, setCurrentJob] = useLocalStorage<Job>(
    `nttr-currentJob-${gameId}`,
    initialJobData
  );

  const [lastSaved, setLastSaved] = useState<Date>(new Date(Date.now()));

  // Initialize Week Data
  useEffect(() => {
    setWeeks(initWeeksData(gameId, gameLength));
  }, [gameId, gameLength]);

  // Initialize Game Actions from Local Storage
  useEffect(() => {
    const localStorageData: Array<GameAction> = JSON.parse(
      localStorage.getItem(`nttr-tasks-${gameId}`) || "[]"
    );
    if (localStorageData.length === 0 && weeks.length > 0) {
      setGameActions(initTasksData(gameLength, weeks));
    } else {
      setGameActions(localStorageData);
    }
  }, [gameId, gameLength, weeks]);

  // Autosaving Game Actions to Local Storage
  useEffect(() => {
    if (gameActions.length === 0) return;
    if (new Date(Date.now()).getTime() - lastSaved.getTime() > 180000) {
      console.log("Saving Game Actions...");
      localStorage.setItem(`nttr-tasks-${gameId}`, JSON.stringify(gameActions));
      setLastSaved(new Date(Date.now()));
    }
  }, [gameActions, gameId, lastSaved]);

  return (
    <div className="w-full rounded grid grid-cols-10 grid-rows-5 gap-4">
      <div className="flex flex-col col-span-8 gap-4">
        <ScheduleDisplay weeks={weeks} gameActions={gameActions} />
        <JobSelector currentJob={currentJob} changeCurrentJob={setCurrentJob} />
      </div>

      {/* right block */}
      <div className="flex flex-col gap-4 w-full col-span-2 row-span-5">
        <Checklist />
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
