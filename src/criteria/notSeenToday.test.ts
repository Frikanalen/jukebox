import { ScheduleEntry, MockVideo } from "../schedule/scheduleEntry";
import { notSeenToday } from "./notSeenToday";
import { add, set } from "date-fns";

const testDate = set(new Date(), { hours: 16, minutes: 30, seconds: 0 });

test("returns -1 if video is scheduled twice on same day", () => {
  const e_1 = new ScheduleEntry(new MockVideo(1, "foo", 10), testDate);
  const e_2 = new ScheduleEntry(
    new MockVideo(1, "foo", 10),
    add(testDate, { minutes: 30 })
  );

  expect(notSeenToday([e_1], e_2)).toStrictEqual(-1);
});

test("returns 0 if same video is scheduled on different day", () => {
  const e_1 = new ScheduleEntry(new MockVideo(1, "foo", 10), testDate);
  const e_2 = new ScheduleEntry(
    new MockVideo(1, "foo", 10),
    add(testDate, { days: 1 })
  );

  expect(notSeenToday([e_1], e_2)).toStrictEqual(0);
});

test("returns 0 if new video is scheduled on same day", () => {
  const e_1 = new ScheduleEntry(new MockVideo(1, "foo", 10), testDate);
  const e_2 = new ScheduleEntry(
    new MockVideo(2, "foo", 10),
    add(testDate, { minutes: 30 })
  );

  expect(notSeenToday([e_1], e_2)).toStrictEqual(0);
});
