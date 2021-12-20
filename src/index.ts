import "dotenv/config"
import { endOfWeek, startOfWeek } from "date-fns"
import { nb } from "date-fns/locale"
import { getVideos } from "./modules/core/helpers/getVideos"
import { fillPeriod } from "./modules/scheduling/helpers/fillPeriod"

async function main() {
  const startAt = startOfWeek(new Date(), { locale: nb })
  const endAt = endOfWeek(new Date(), { locale: nb })

  const videos = await getVideos()

  const entries = fillPeriod(startAt, endAt, {
    weightings: [
      { criteria: "notRecentlySeen", multiplier: 20 },
      { criteria: "notSeenThisWeek", multiplier: 10 },
      { criteria: "notSeenToday", multiplier: 5 },
      { criteria: "isRecent", multiplier: 2 },
      { criteria: "rand", multiplier: 2 },
    ],
    videos,
  })

  console.log(entries.map((e) => [e.video.title, e.startsAt]))
}

main().catch(console.error)
