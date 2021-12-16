import { Schedule } from "./schedule";
import { MockVideo, ScheduleEntry } from "./scheduleEntry";
import { add } from "date-fns";

test("new schedule returns empty list", () => {
  const s = new Schedule();
  expect(s.entries).toStrictEqual<ScheduleEntry[]>([]);
});

test("can add entry", () => {
  const s = new Schedule();
  const v_1 = new MockVideo(1, "foo", 10);
  const startTime_1 = new Date();
  const e_1 = new ScheduleEntry(v_1, startTime_1);

  s.add(e_1);

  expect(s.entries).toStrictEqual<ScheduleEntry[]>([e_1]);
});

test("entries are chronological", () => {
  const s = new Schedule();
  const v_1 = new MockVideo(1, "foo", 10);
  const startTime_1 = new Date();
  const e_1 = new ScheduleEntry(v_1, startTime_1);

  const startTime_2 = add(startTime_1, { seconds: 20 });
  const v_2 = new MockVideo(1, "foo", 10);
  const e_2 = new ScheduleEntry(v_2, startTime_2);

  s.add(e_2);
  s.add(e_1);

  expect(s.entries).toStrictEqual<ScheduleEntry[]>([e_1, e_2]);
});

test("cannot add overlapping", () => {
  const s = new Schedule();

  const v_1 = new MockVideo(1, "first video", 10);
  const startTime_1 = new Date();
  const e_1 = new ScheduleEntry(v_1, startTime_1);

  const v_2 = new MockVideo(2, "second video", 10);
  const startTime_2 = add(startTime_1, { seconds: 5 });
  const e_2 = new ScheduleEntry(v_2, startTime_2);

  const v_3 = new MockVideo(3, "third video", 10);
  const startTime_3 = add(startTime_1, { seconds: -5 });
  const e_3 = new ScheduleEntry(v_3, startTime_3);

  s.add(e_1);
  expect(s.entries).toStrictEqual<ScheduleEntry[]>([e_1]);

  expect(() => s.add(e_2)).toThrow();
  expect(() => s.add(e_3)).toThrow();

  expect(s.entries).toStrictEqual<ScheduleEntry[]>([e_1]);
});
