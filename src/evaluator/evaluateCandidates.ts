import { ScheduleEntry } from "../schedule/scheduleEntry";

export type Criteria = (
  entries: ScheduleEntry[],
  candidate: ScheduleEntry
) => number;

export interface WeightedCriteria {
  criteria: Criteria;
  weight: number;
}
