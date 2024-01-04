import React from "react";
import { Job } from "../types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobsValue: Job[][] = [
  // VexCorp
  [
    {
      id: "1",
      name: "Software Engineer",
      income: 3,
      location: "VexCorp",
    },
    {
      id: "2",
      name: "Prinicpal Engineer",
      income: 7,
      location: "VexCorp",
    },
  ],
  //Market
  [
    {
      id: "3",
      name: "Butcher",
      income: 3,
      location: "Market",
    },
    {
      id: "4",
      name: "Manager",
      income: 7,
      location: "Market",
    },
  ],
];

function JobSelector({
  currentJob,
  changeCurrentJob,
}: {
  currentJob: Job | undefined;
  changeCurrentJob: (job: Job) => void;
}) {
  function onJobChange(jobId: string) {
    const job = jobsValue
      .flatMap((jobGroup) => jobGroup)
      .find((job) => job.id === jobId);
    if (job) {
      changeCurrentJob(job);
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 border-2 border-green-400 rounded-md">
      <h2 className="font-bold">Current Job</h2>
      <Select onValueChange={onJobChange} value={currentJob?.id || ""}>
        <SelectTrigger>
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          {jobsValue.map((jobGroup, index) => (
            <SelectGroup key={jobGroup[0].location}>
              <SelectLabel className="text-gray-400">
                {jobGroup[0].location}
              </SelectLabel>
              {jobGroup.map((job) => (
                <SelectItem key={job.id} value={job.id}>
                  {job.name}, Income: ${job.income} / hr, Location:{" "}
                  {job.location}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default JobSelector;
