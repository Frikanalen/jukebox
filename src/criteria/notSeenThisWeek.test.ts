import { ScheduleEntry, MockVideo } from "../schedule/scheduleEntry";
import { add, set, setDay, format } from "date-fns";
import { nb } from "date-fns/locale";
import { notSeenThisWeek } from "./notSeenThisWeek";

// Any given Tuesday 16:30:00
const testDate = setDay(
  set(new Date(), { hours: 16, minutes: 30, seconds: 0 }),
  1,
  { locale: nb }
);

test("returns -1 if video is scheduled twice in same week", () => {
  const e_1 = new ScheduleEntry(new MockVideo(1, "foo", 10), testDate);
  const e_2 = new ScheduleEntry(
    new MockVideo(1, "foo", 10),
    add(testDate, { days: 1 })
  );

  expect(notSeenThisWeek([e_1], e_2)).toStrictEqual(-1);
});

test("returns 0 if same video is scheduled next week", () => {
  const e_1 = new ScheduleEntry(new MockVideo(1, "foo", 10), testDate);
  const e_2 = new ScheduleEntry(
    new MockVideo(1, "foo", 10),
    add(testDate, { days: 8 })
  );

  expect(notSeenThisWeek([e_1], e_2)).toStrictEqual(0);
});

test("returns 0 if new video is scheduled same week", () => {
  const e_1 = new ScheduleEntry(new MockVideo(1, "foo", 10), testDate);
  const e_2 = new ScheduleEntry(
    new MockVideo(2, "foo", 10),
    add(testDate, { days: 1 })
  );

  expect(notSeenThisWeek([e_1], e_2)).toStrictEqual(0);
});
