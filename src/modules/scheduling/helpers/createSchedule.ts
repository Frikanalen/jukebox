import { api } from "../../core/api"
import { ScheduleEntry } from "../types"

export const createSchedule = async (
  from: Date,
  to: Date,
  entries: ScheduleEntry[]
) => {
  const mappedEntries = entries.map((e) => ({
    startsAt: e.startsAt.toISOString(),
    video: e.video.id,
  }))

  const response = await api.post("/scheduling/jukebox", {
    from: from.toISOString(),
    to: to.toISOString(),
    entries: mappedEntries,
  })

  return response.data
}
