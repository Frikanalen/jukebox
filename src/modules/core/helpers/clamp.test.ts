import { clamp } from "./clamp"

test("clamp", () => {
  expect(clamp(-2.1, -1, 1)).toBe(-1)
  expect(clamp(300, -1, 1)).toBe(1)
  expect(clamp(1, 20, 50)).toBe(20)
})
