import * as dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })
import { getVideos } from "./modules/core/helpers/getVideos"
import { fillPeriod } from "./modules/scheduling/helpers/fillPeriod"
import { createSchedule } from "./modules/scheduling/helpers/createSchedule"
import { getDateRange } from "./args"
import { log } from "./log"
import { exit } from "process"

const main = async () => {
  try {
    const [startAt, endAt] = getDateRange()

    log.debug(
      `Generating schedule from ${startAt.toISOString()} to ${endAt.toISOString()}`
    )

    const videos = await getVideos()

    if (!videos.length) throw new Error("No jukeboxable videos!")

    const entries = fillPeriod(startAt, endAt, {
      weightings: [
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
  } catch (error: any) {
    log.error(error.message)
    exit(1)
  }
}

main()
