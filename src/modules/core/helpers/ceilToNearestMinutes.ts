import { add, getMinutes, isBefore, roundToNearestMinutes } from "date-fns"

export const ceilToNearestMinutes = (date: Date, minutes = 1): Date => {
  const rounded = roundToNearestMinutes(date, {
    nearestTo: minutes,
  })

  if (isBefore(rounded, date)) {
    return ceilToNearestMinutes(add(date, { seconds: 30 }), minutes)
  }

  return rounded
}
