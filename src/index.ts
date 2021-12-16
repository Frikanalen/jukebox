import { ScheduleEntry, Video } from "./schedule/scheduleEntry";

export type Schedule = {
  date: Date;
  scheduleEntries: Video[];
};

export type SchedulingContext = {
  schedule: Schedule;
  currentTime: Date;
};

export type Criteria = (
  entries: ScheduleEntry[],
  candidate: ScheduleEntry
) => number;

export interface WeightedCriteria {
  criteria: Criteria;
  weight: number;
}

export interface Timeslot {
  name: string;
  criteria: WeightedCriteria[];
}
