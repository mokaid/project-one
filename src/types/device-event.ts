import { Site } from "./site";

export type DeviceEvent = {
  eventId: number;
  site: Pick<Site, "id" | "name">;
  vendor: string;
  obj: DeviceEventObject;
  /**
   * YYYY-MM-DD HH:MM:SS
   */
  timeEvent: string;
  /**
   * YYYY-MM-DD HH:MM:SS
   */
  timeServer: string;
  timeZoneOffset: number;
  problem: boolean;
  level: number;
  process: {
    status: ProcessStatus;
    /**
     * YYYY-MM-DD HH:MM:SS
     */
    time: string;
    caseNum: string;
    remark: string;
  };
};

type DeviceEventObject = {
  id: string;
  name: string;
  keyId: number;
  key: string;
  value: string;
  desc: string;
};

export enum ProcessStatus {
  Pending = 0,
  Dispatched = 1,
  Accomplished = 2,
}
