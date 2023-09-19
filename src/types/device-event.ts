import type { OrganisationSite } from "./organisation";

export type DeviceEvent = {
  eventId: number;
  site: Pick<OrganisationSite, "id" | "name">;
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
  timeZone: number;
  problem: number;
  level: AlarmLevel;
  process: {
    status: ProcessStatus;
    /**
     * YYYY-MM-DD HH:MM:SS
     */
    time: string;
    caseNum?: string;
    remark?: string;
  };
};

type DeviceEventObject = {
  id: string;
  name: string;
  keyId?: number;
  key: string;
  value: string;
  desc?: string;
};

export enum ProcessStatus {
  Pending = 0,
  Dispatched = 1,
  Accomplished = 2,
}

export type AlarmLevel = 1 | 2 | 3 | 4 | 5;
