import { ScheduleEntry, Video } from "../schedule/scheduleEntry";
import { Interval } from "date-fns";
import { WeightedCriteria } from "../evaluator/evaluateCandidates";

const fillPeriod = (
  period: Interval,
  criteria: WeightedCriteria[],
  candidates: Video[],
  entries: ScheduleEntry[] = []
): ScheduleEntry[] => {
  const nextStart = period.start;
  const nextPeriod: Interval = { start: nextStart, end: period.end };

  fillPeriod(nextPeriod, criteria, candidates, entries);

  return entries;
};
