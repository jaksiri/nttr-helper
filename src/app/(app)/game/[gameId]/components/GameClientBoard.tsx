"use client";
import React, { useEffect, useMemo, useState } from "react";
import { GameAction, GameLength, Job, WeekData } from "../types";
import ScheduleDisplay from "./ScheduleDisplay";
import Checklist from "./Checklist";
import JobSelector from "./JobSelector";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initTasksData, initWeeksData } from "../utils/InitFunctions";
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
  const [weeks, setWeeks] = useState<WeekData[]>(new Array<WeekData>());
  const weeksId = useMemo(() => weeks.map((week) => week.id), [weeks]);

  const [gameActions, setGameActions] = useLocalStorage<GameAction[]>(
    `nttr-tasks-${gameId}`,
    new Array<GameAction>()
  );

  // Current States
  const [currentJob, setCurrentJob] = useLocalStorage<Job>(
    `nttr-currentJob-${gameId}`,
    initialJobData
  );

  useEffect(() => {
    setWeeks(initWeeksData(gameId, gameLength));
  }, [gameId, gameLength]);

  useEffect(() => {
    const localStorageData: Array<GameAction> = JSON.parse(
      localStorage.getItem(`nttr-tasks-${gameId}`) || "[]"
    );
    if (localStorageData.length === 0 && weeks.length > 0) {
      setGameActions(initTasksData(gameLength, weeks));
    }
  }, [gameLength, weeks, setGameActions, gameId]);

  // State Mutation Functions

  function changeCurrentJob(job: Job) {
    setCurrentJob(job);
    localStorage.setItem(`nttr-currentJob-${gameId}`, JSON.stringify(job));
  }

  return (
    <div className="w-full rounded grid grid-cols-10 grid-rows-5 gap-4">
      <div className="flex flex-col col-span-8 gap-4">
        <ScheduleDisplay weeks={weeks} gameActions={gameActions} />
        <JobSelector
          currentJob={currentJob}
          changeCurrentJob={changeCurrentJob}
        />
      </div>

      {/* right block */}
      <div className="flex flex-col gap-4 w-full col-span-2 row-span-5">
        <Checklist />
      </div>

      {/* left block */}
      <div className="flex flex-col col-span-8 space-y-4 row-span-4">
        <KanbanBoard
          weeks={weeks}
          weeksId={weeksId}
          tasks={gameActions}
          setTasks={setGameActions}
        />
      </div>
    </div>
  );
}
