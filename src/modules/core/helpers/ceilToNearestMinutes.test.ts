import { add, getMinutes } from "date-fns"
import { ceilToNearestMinutes } from "./ceilToNearestMinutes"

test("ceilToNearestMinutes", () => {
  const a = add(new Date(0), { minutes: 2 })
  const b = add(new Date(0), { minutes: 1, seconds: 20 })
  const c = add(new Date(0), { minutes: 7 })

  const ceilA = ceilToNearestMinutes(a, 5)
  const ceilB = ceilToNearestMinutes(b)
  const ceilC = ceilToNearestMinutes(c, 5)

  expect(getMinutes(ceilA)).toBe(5)
  expect(getMinutes(ceilB)).toBe(2)
  expect(getMinutes(ceilC)).toBe(10)
})
