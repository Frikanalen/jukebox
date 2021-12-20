import { ScheduleEntry, Weighting } from "../types"
import * as criteria from "../criteria"
import { Video } from "../../core/types"

export type Context = {
  video: Video
  at: Date
  schedule: ScheduleEntry[]
}

export const evaluateVideo = (weightings: Weighting[], context: Context) => {
  return weightings
    .map((weighting) => {
      const { criteria: name, multiplier } = weighting
      const { video, at, schedule } = context

      return criteria[name](video, at, schedule) * multiplier
    })
    .reduce((a, b) => a + b, 0)
}
