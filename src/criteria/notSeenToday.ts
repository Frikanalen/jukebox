import { ScheduleEntry } from "../schedule/scheduleEntry";
import { isSameDay } from "date-fns";
// This function helps us avoid scheduling the same video twice in a day
// to keep the schedule somewhat varied. It returns -1 if the same video
// exists in the schedule the same day; 0 if not.
export const notSeenToday = (
  schedule: ScheduleEntry[],
  candidate: ScheduleEntry
) => {
  if (
    schedule.some(
      (v) =>
        v.video.id == candidate.video.id &&
        isSameDay(v.startTime, candidate.startTime)
    )
  )
    return -1;
  return 0;
};
