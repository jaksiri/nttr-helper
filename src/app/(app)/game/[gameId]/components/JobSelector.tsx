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
  // Appliances
  [
    {
      id: "1",
      name: "Clerk",
      income: 4,
      location: "Appliances",
      experienceRequired: 0,
    },
    {
      id: "2",
      name: "Salesperson",
      income: 6,
      location: "Appliances",
      experienceRequired: 100,
    },
    {
      id: "3",
      name: "Repairman",
      income: 7,
      location: "Appliances",
      experienceRequired: 200,
    },
    {
      id: "4",
      name: "Software Servitor",
      income: 9,
      location: "Appliances",
      experienceRequired: 400,
    },
    {
      id: "5",
      name: "Manager",
      income: 11,
      location: "Appliances",
      experienceRequired: 800,
    },
    {
      id: "6",
      name: "Salesperson",
      income: 13,
      location: "Appliances",
      experienceRequired: 1600,
    },
  ],
  // Bank
  [
    {
      id: "7",
      name: "Janitor",
      income: 4,
      location: "Bank",
      experienceRequired: 0,
    },
    {
      id: "8",
      name: "Teller",
      income: 6,
      location: "Bank",
      experienceRequired: 100,
    },
    {
      id: "9",
      name: "Manager",
      income: 10,
      location: "Bank",
      experienceRequired: 400,
    },
    {
      id: "10",
      name: "Risk Manager",
      income: 13,
      location: "Bank",
      experienceRequired: 800,
    },
    {
      id: "11",
      name: "Broker",
      income: 15,
      location: "Bank",
      experienceRequired: 1600,
    },
    {
      id: "12",
      name: "Compliance Officer",
      income: 17,
      location: "Bank",
      experienceRequired: 3200,
    },
  ],
  // Mall
  [
    {
      id: "13",
      name: "Janitor",
      income: 4,
      location: "Mall",
      experienceRequired: 0,
    },
    {
      id: "14",
      name: "Mall Security",
      income: 5,
      location: "Mall",
      experienceRequired: 100,
    },
    {
      id: "15",
      name: "Salesperson",
      income: 7,
      location: "Mall",
      experienceRequired: 200,
    },
    {
      id: "16",
      name: "Store Manager",
      income: 9,
      location: "Mall",
      experienceRequired: 400,
    },
    {
      id: "17",
      name: "Assistant Manager",
      income: 11,
      location: "Mall",
      experienceRequired: 800,
    },
    {
      id: "18",
      name: "Manager",
      income: 13,
      location: "Mall",
      experienceRequired: 800,
    },
  ],
  // Cluckers
  [
    {
      id: "19",
      name: "Fry Cook",
      income: 4,
      location: "Cluckers",
      experienceRequired: 0,
    },
    {
      id: "20",
      name: "Clerk",
      income: 5,
      location: "Cluckers",
      experienceRequired: 100,
    },
    {
      id: "21",
      name: "Assistant Manager",
      income: 6,
      location: "Cluckers",
      experienceRequired: 200,
    },
    {
      id: "22",
      name: "Manager",
      income: 7,
      location: "Cluckers",
      experienceRequired: 200,
    },
  ],
  // Gym
  [
    {
      id: "23",
      name: "Janitor",
      income: 4,
      location: "Gym",
      experienceRequired: 0,
    },
    {
      id: "24",
      name: "Exercise Physiologist",
      income: 5,
      location: "Gym",
      experienceRequired: 100,
    },
    {
      id: "25",
      name: "Personal Trainer",
      income: 7,
      location: "Gym",
      experienceRequired: 200,
    },
    {
      id: "26",
      name: "Assistant Manager",
      income: 9,
      location: "Gym",
      experienceRequired: 400,
    },
    {
      id: "27",
      name: "Manager",
      income: 11,
      location: "Gym",
      experienceRequired: 800,
    },
  ],
  // Market
  [
    {
      id: "28",
      name: "Janitor",
      income: 4,
      location: "Market",
      experienceRequired: 0,
    },
    {
      id: "29",
      name: "Checker",
      income: 6,
      location: "Market",
      experienceRequired: 100,
    },
    {
      id: "30",
      name: "Butcher",
      income: 7,
      location: "Market",
      experienceRequired: 200,
    },
    {
      id: "31",
      name: "Assistant Manager",
      income: 9,
      location: "Market",
      experienceRequired: 400,
    },
    {
      id: "32",
      name: "Manager",
      income: 14,
      location: "Market",
      experienceRequired: 800,
    },
  ],
  // VexCorp
  [
    {
      id: "33",
      name: "Secretary",
      income: 7,
      location: "VexCorp",
      experienceRequired: 200,
    },
    {
      id: "34",
      name: "Quality Assurance",
      income: 9,
      location: "VexCorp",
      experienceRequired: 200,
    },
    {
      id: "35",
      name: "Developer",
      income: 14,
      location: "VexCorp",
      experienceRequired: 800,
    },
    {
      id: "36",
      name: "Senior Developer",
      income: 17,
      location: "VexCorp",
      experienceRequired: 1600,
    },
    {
      id: "37",
      name: "CTO",
      income: 19,
      location: "VexCorp",
      experienceRequired: 3200,
    },
    {
      id: "38",
      name: "CEO",
      income: 23,
      location: "VexCorp",
      experienceRequired: 6400,
    },
  ],
  // University
  [
    {
      id: "39",
      name: "Janitor",
      income: 4,
      location: "University",
      experienceRequired: 0,
    },
    {
      id: "40",
      name: "Clerk",
      income: 6,
      location: "University",
      experienceRequired: 100,
    },
    {
      id: "41",
      name: "Administrator",
      income: 7,
      location: "University",
      experienceRequired: 200,
    },
    {
      id: "42",
      name: "Adjunct",
      income: 9,
      location: "University",
      experienceRequired: 400,
    },
    {
      id: "43",
      name: "Assistant Professor",
      income: 11,
      location: "University",
      experienceRequired: 800,
    },
    {
      id: "44",
      name: "Janitor",
      income: 14,
      location: "Professor",
      experienceRequired: 1600,
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
              <SelectLabel className="">{jobGroup[0].location}</SelectLabel>
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
