export type Video = {
  id: number
  title: string
  duration: number
  createdAt: string
  organization: {
    id: number
    name: string
  }
  categories: number[]
}
