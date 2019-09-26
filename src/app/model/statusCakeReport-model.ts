export class StatusCakeReport {
  constructor(
      public Status: Status,
      public StatusID: string,
      public Start: string,
      public End: string,
      public StartUnix: number,
      public EndUnix: number,
      public Additional: string,
      public Period: string) {

  }
}

export enum Status {
  Down = "Down",
  Up = "Up",
}
