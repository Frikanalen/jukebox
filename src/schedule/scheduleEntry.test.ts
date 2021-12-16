import { ScheduleEntry, MockVideo } from "./scheduleEntry";
import { add } from "date-fns";

test("sets correct endTime", () => {
  const seconds = Math.random() * 5000;
  const v = new MockVideo(1, "foo", seconds);
  const startTime = new Date();
  const e = new ScheduleEntry(v, startTime);
  expect(e.endTime).toStrictEqual(add(e.startTime, { seconds }));
});
