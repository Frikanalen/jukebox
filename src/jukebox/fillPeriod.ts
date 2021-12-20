import { ScheduleEntry, Video } from "../schedule/scheduleEntry";
import { Interval } from "date-fns";
import { WeightedCriteria } from "../evaluator/evaluateCandidate";

const fillPeriod = (
  period: Interval,
  criteria: WeightedCriteria[],
  candidates: Video[],
  entries: ScheduleEntry[] = []
): ScheduleEntry[] => {
  // here we pick a video

  const nextStart = period.start; // + chosenVideo.duration + whatever we pad it with

  const nextPeriod: Interval = { start: nextStart, end: period.end };

  fillPeriod(nextPeriod, criteria, candidates, entries);

  return entries;
};
