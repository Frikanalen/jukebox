import { add, isBefore, roundToNearestMinutes } from "date-fns"

export const ceilToNearestMinutes = (date: Date, minutes = 1): Date => {
  const rounded = roundToNearestMinutes(date, {
    nearestTo: minutes,
  })

  if (isBefore(date, rounded)) {
    return ceilToNearestMinutes(add(date, { minutes: 1 }), minutes)
  }

  return rounded
}
