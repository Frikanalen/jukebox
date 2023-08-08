import { log } from "../../../log"
import { api } from "../api"
import { Video } from "../types"

export const getVideos = async () => {
  const { data } = await api.get<Video[]>("/scheduling/jukeboxable")
  log.info(`Found ${data.length} jukeboxable videos.`)
  return data
}
