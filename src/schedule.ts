import { compareAsc } from "date-fns";
import { ScheduleEntry } from "./scheduleEntry";

export class Schedule {
  entries: ScheduleEntry[] = [];

  collidesWith = (entry: ScheduleEntry) => {
    const overlapsBefore = (a: ScheduleEntry, b: ScheduleEntry) =>
      a.startTime <= b.startTime && a.endTime >= b.startTime;
    const overlapsAfter = (a: ScheduleEntry, b: ScheduleEntry) =>
      a.startTime >= b.startTime && a.startTime <= b.endTime;

    return this.entries.some(
      (existing) =>
        overlapsBefore(existing, entry) || overlapsAfter(existing, entry)
    );
  };

  add = (entry: ScheduleEntry) => {
    if (this.collidesWith(entry)) {
      throw new Error("attempted to add colliding entry");
    }

    this.entries.push(entry);
    this.entries.sort((a, b) => compareAsc(a.startTime, b.startTime));
  };
}
