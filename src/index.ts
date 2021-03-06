import "dotenv/config"
import { endOfWeek, startOfWeek } from "date-fns"
import { nb } from "date-fns/locale"
import { getVideos } from "./modules/core/helpers/getVideos"
import { fillPeriod } from "./modules/scheduling/helpers/fillPeriod"
import { createSchedule } from "./modules/scheduling/helpers/createSchedule"
import { Logger } from "tslog";
export const log: Logger = new Logger();

async function main() {
  const startAt = startOfWeek(new Date(), { locale: nb })
  const endAt = endOfWeek(new Date(), { locale: nb })

  const videos = await getVideos()

  if (videos.length === 0) {
    throw new Error("No jukeboxable videos!")
  }

  const entries = fillPeriod(startAt, endAt, {
    weightings: [
      // We don't want the same organization getting multiple videos in at once
      { criteria: "notRecentlySeenFromSameOrganization", multiplier: 100 },
      { criteria: "notScheduled", multiplier: 30 },
      { criteria: "notRecentlySeen", multiplier: 20 },
      { criteria: "notSeenThisWeek", multiplier: 10 },
      { criteria: "notSeenToday", multiplier: 10 },
      { criteria: "isRecent", multiplier: 2 },
      { criteria: "rand", multiplier: 1 },
    ],
    videos,
  })

  const result = await createSchedule(startAt, endAt, entries)
  log.info(result)
}

main().catch((e) => log.error(e))
