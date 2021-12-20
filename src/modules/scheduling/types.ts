import { Video } from "../core/types"

import * as criteria from "./criteria"
export type CriteriaName = keyof typeof criteria

/**
 * Must be a number between -1 and 1
 */
export type Score = number & { __brand: "Score" }

/**
 * Represents a scheduled video
 */
export type ScheduleEntry = {
  startsAt: Date
  video: Video
}

/**
 * A function that returns a score based on a criteria for a given video
 */
export type Criteria = (
  video: Video,
  at: Date,
  schedule: ScheduleEntry[]
) => Score

/**
 * Represents a criteria and a multiplier for the Score
 */
export type Weighting = {
  criteria: CriteriaName
  multiplier: number
}
