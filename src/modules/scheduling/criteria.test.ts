import { endOfWeek, sub } from "date-fns"
import { nb } from "date-fns/locale"

import { Video } from "../core/types"
import { ScheduleEntry } from "./types"

import * as criteria from "./criteria"

const now = endOfWeek(new Date(), { locale: nb })

const getMockVideo = (id: number, ageInHours: number, title: string) =>
  ({
    id,
    createdAt: sub(new Date(), { hours: ageInHours }),
    title,
  } as any as Video)

const getMockScheduleEntry = (video: Video, at: Date) =>
  ({
    video,
    startsAt: at,
  } as any as ScheduleEntry)

const videoA = getMockVideo(1, 6, "6 hours ago, I made something remarkable")
const videoB = getMockVideo(2, 6000, "Ancient times")
const videoC = getMockVideo(3, 50, "Some video title")

test("notSeenToday", () => {
  const schedule = [
    getMockScheduleEntry(videoA, sub(now, { days: 2 })),
    getMockScheduleEntry(videoC, sub(now, { hours: 2 })),
  ]

  const resultA = criteria.notSeenToday(videoA, now, schedule)
  const resultB = criteria.notSeenToday(videoC, now, schedule)

  expect(resultA).toBe(0)
  expect(resultB).toBe(-1)
})

test("notSeenThisWeek", () => {
  const schedule = [
    getMockScheduleEntry(videoA, sub(now, { days: 24 })),
    getMockScheduleEntry(videoC, sub(now, { days: 2 })),
  ]

  const resultA = criteria.notSeenThisWeek(videoA, now, schedule)
  const resultB = criteria.notSeenThisWeek(videoC, now, schedule)

  expect(resultA).toBe(0)
  expect(resultB).toBe(-1)
})

test("notRecentlySeen", () => {
  const schedule = [
    getMockScheduleEntry(videoA, sub(now, { days: 24 })),
    getMockScheduleEntry(videoC, sub(now, { days: 2 })),
  ]

  const resultA = criteria.notRecentlySeen(videoB, now, schedule)
  const resultB = criteria.notRecentlySeen(videoC, now, schedule)

  expect(resultA).toBe(0)

  expect(resultB).toBeLessThan(0)
  expect(resultB).toBeGreaterThan(-1)
})

test("isRecent", () => {
  const videos = [videoA, videoB, videoC]

  const sorted = videos
    .map((v) => ({ v, score: criteria.isRecent(v, now, []) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.v)

  expect(sorted).toStrictEqual([videoA, videoC, videoB])
})
