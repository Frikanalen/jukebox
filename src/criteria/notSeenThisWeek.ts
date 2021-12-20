import { ScheduleEntry } from "../schedule/scheduleEntry";
import { isSameWeek } from "date-fns";
import { nb } from "date-fns/locale";
import { Criteria } from "../evaluator/evaluateCandidate";
console.log(nb.options?.weekStartsOn);

// This function helps us avoid scheduling the same video twice in a week
// to keep the schedule somewhat varied. It returns -1 if the same video
// exists in the schedule the same week; 0 if not.
export const notSeenThisWeek: Criteria = (
  schedule: ScheduleEntry[],
  candidate: ScheduleEntry
) => {
  if (
    schedule.some(
      (v) =>
        v.video.id == candidate.video.id &&
        isSameWeek(v.startTime, candidate.startTime, { locale: nb })
    )
  )
    return -1;
  return 0;
};
