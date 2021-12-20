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
      { criteria: "isRecent", multiplier: 200 },
      { criteria: "notSeenToday", multiplier: 100 },
      { criteria: "notSeenThisWeek", multiplier: 50 },
    ],
    videos,
  })

  console.log(entries)
}

main().catch(console.error)
