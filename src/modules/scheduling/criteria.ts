import { differenceInHours, isSameDay, isSameWeek } from "date-fns"
import { nb } from "date-fns/locale"
import { clamp } from "../core/helpers/clamp"
import { A_YEAR_IN_HOURS } from "./constants"
import { Criteria, Score } from "./types"

export const notSeenToday: Criteria = (video, at, schedule) => {
  return (
    schedule.some((e) => e.video.id === video.id && isSameDay(e.startsAt, at))
      ? -1
      : 1
  ) as Score
}

export const notSeenThisWeek: Criteria = (video, at, schedule) => {
  return (
    schedule.some(
      (e) =>
        e.video.id === video.id && isSameWeek(e.startsAt, at, { locale: nb })
    )
      ? -1
      : 1
  ) as Score
}

export const isRecent: Criteria = (video) => {
  const hoursSinceUpload = differenceInHours(
    new Date(),
    new Date(video.createdAt)
  )

  // Normalized value of how close the video is to one year old,
  // where 0 is exactly one year old, and 1 is exactly 0 hours.
  const score = (A_YEAR_IN_HOURS - hoursSinceUpload) / A_YEAR_IN_HOURS

  // We clamp it because once the video is more than one year old
  // it will continue to decrease into the negatives, past -1
  return clamp(score, -1, 1) as Score
}