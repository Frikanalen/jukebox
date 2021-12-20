import { api } from "../api"
import { Video } from "../types"

export const getVideos = async () => {
  const { data } = await api.get<Video[]>("/scheduling/jukeboxable")
  return data
}
