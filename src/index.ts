import { Video } from "./scheduleEntry";

export type Schedule = {
  date: Date;
  scheduleEntries: Video[];
};

export type SchedulingContext = {
  schedule: Schedule;
  currentTime: Date;
};

export const SeenToday = () => {};

export type CandidateEvaluator = typeof SeenToday;

export interface WeightedCriteria {
  criteria: CandidateEvaluator;
  weight: number;
}

export interface BooleanCriteria {}

export type Criteria = WeightedCriteria;

export interface Timeslot {
  name: string;
  criteria: Criteria[];
}

SeenToday();
