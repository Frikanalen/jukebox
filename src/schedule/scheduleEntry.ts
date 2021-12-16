import { add } from "date-fns";

export interface Video {
  id: number;
  name: string;
  duration: number;
}

export class MockVideo implements Video {
  id: number;
  name: string;
  duration: number;

  constructor(videoId: number, name: string, duration: number) {
    this.id = videoId;
    this.name = name;
    this.duration = duration;
  }
}

export class ScheduleEntry {
  startTime: Date;
  video: Video;

  constructor(video: Video, startTime: Date) {
    this.video = video;
    this.startTime = startTime;
  }

  public get endTime() {
    return add(this.startTime, { seconds: this.video.duration });
  }
}
