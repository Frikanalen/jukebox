import { log } from "../../../log"
import { api } from "../../core/api"
import { ScheduleEntry } from "../types"
import { AxiosError } from "axios"

export const createSchedule = async (
  from: Date,
  to: Date,
  entries: ScheduleEntry[]
) => {
  const mappedEntries = entries.map((e) => ({
    startsAt: e.startsAt.toISOString(),
    video: e.video.id,
  }))

  try {
    const response = await api.post("/scheduling/jukebox", {
      from: from.toISOString(),
      to: to.toISOString(),
      entries: mappedEntries,
    })

    return response.data
  } catch (error: any) {
    // Log the status code if it's an Axios error
    if (error.isAxiosError) {
      const axiosError = error as AxiosError
      log.error(`Error ${axiosError.response?.status}`, {
        response: axiosError.response?.data,
      })
    }
    throw error
  }
}
