import { ScheduleEntry, Video } from "./schedule/scheduleEntry";

export type Schedule = {
  date: Date;
  scheduleEntries: Video[];
};

export type SchedulingContext = {
  schedule: Schedule;
  currentTime: Date;
};
