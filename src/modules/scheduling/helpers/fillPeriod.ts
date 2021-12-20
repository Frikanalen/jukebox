import { add, isBefore } from "date-fns"
import { ceilToNearestMinutes } from "../../core/helpers/ceilToNearestMinutes"
import { Video } from "../../core/types"
import { MINIMUM_PADDING_IN_MINUTES } from "../constants"
import { ScheduleEntry, Weighting } from "../types"
import { evaluateVideo } from "./evaluateVideo"

export type Context = {
  videos: Video[]
  weightings: Weighting[]
}

export const fillPeriod = (from: Date, to: Date, context: Context) => {
  const { videos, weightings } = context
  const result: ScheduleEntry[] = []

  const addVideo = (at: Date): void => {
    const scoredVideos = videos
      .map((video) => {
        const score = evaluateVideo(weightings, {
          schedule: result,
          at: from,
          video,
        })

        return { video, score }
      })
      .sort((a, b) => b.score - a.score)
      .map((x) => ({
        ...x.video,
        endsAt: add(at, { seconds: x.video.duration }),
      }))

    const suitableVideo = scoredVideos.find((video) => {
      return isBefore(video.endsAt, to)
    })

    if (suitableVideo) {
      result.push({ startsAt: at, video: suitableVideo })

      const newCurrentTime = add(suitableVideo.endsAt, {
        minutes: MINIMUM_PADDING_IN_MINUTES,
      })

      const ceiledNewCurrentTime = ceilToNearestMinutes(newCurrentTime, 5)

      // Add another video at the new current time
      return addVideo(ceiledNewCurrentTime)
    }
  }

  addVideo(from)
  return result
}
