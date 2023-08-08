import { startOfISOWeek, endOfISOWeek, parseISO, isValid } from "date-fns"
import { program } from "commander"

program
  .description("Schedule videos based on provided date range.")
  .option(
    "--week <week>",
    "Specify an ISO week number. Example: --week 2023-W15"
  )
  .option(
    "--start <start>",
    "Specify the start date in ISO format. Example: --start 2023-04-10"
  )
  .option(
    "--end <end>",
    "Specify the end date in ISO format. Example: --end 2023-04-16"
  )
  .parse(process.argv)

/**
 * Returns the start and end dates for scheduling based on provided command-line options.
 * Defaults to the current ISO week if no options are provided.
 *
 * @returns {[Date, Date]} An array containing the start and end dates.
 * @throws {Error} Throws an error if both an ISO week number and start/end dates are provided or if the provided dates are invalid.
 */
export const getDateRange = (): [Date, Date] => {
  const options = program.opts()

  if (options.week && (options.start || options.end)) {
    throw new Error(
      "You cannot provide both an ISO week number and start/end dates."
    )
  }

  if (options.week) {
    const startDate = startOfISOWeek(parseISO(`${options.week}-1`))
    const endDate = endOfISOWeek(parseISO(`${options.week}-1`))

    if (!isValid(startDate) || !isValid(endDate)) {
      throw new Error(
        "Invalid ISO week provided. Please use the format 'YYYY-Www', e.g., '2023-W15'."
      )
    }

    return [startDate, endDate]
  } else if (options.start && options.end) {
    const startDate = parseISO(options.start)
    const endDate = parseISO(options.end)

    if (!isValid(startDate) || !isValid(endDate)) {
      throw new Error(
        "Invalid start or end date provided. Please use the ISO format 'YYYY-MM-DD'."
      )
    }

    return [startDate, endDate]
  } else {
    // Default to the current ISO week
    return [startOfISOWeek(new Date()), endOfISOWeek(new Date())]
  }
}
