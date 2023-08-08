import { Logger } from "tslog"

export const log: Logger =
  process.env.NODE_ENV === "development"
    ? new Logger({ type: "pretty" })
    : new Logger({ type: "json" })
