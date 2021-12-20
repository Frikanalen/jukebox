import axios from "axios"

const FK_API = process.env.FK_API
const SECRET_KEY = process.env.FK_API_KEY

if (!FK_API || !SECRET_KEY) {
  throw new Error("Missing FK_API and/or FK_API_KEY!")
}

export const api = axios.create({
  baseURL: FK_API,
  headers: {
    "X-Api-Key": SECRET_KEY,
  },
})
