export type Site = {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  contactPhoneNum: string;
  contactEmail: string;
  contactPerson2: string;
  contactPhoneNum2: string;
  contactEmail2: string;
  remark: string;
  longitude: number;
  latitude: number;
  groupId: string;
  connectionState: boolean;
  /**
   * yyyy-MM-dd
   */
  simExpirationTime: string;
  /**
   * yyyy-MM-dd
   */
  activate: string;
  /**
   * yyyy-MM-dd
   */
  deactivate: string;
  /**
   * YYYY-MM-DD HH:MM:SS
   */
  createTimeUTC: string;
  /**
   * YYYY-MM-DD HH:MM:SS
   */
  lastChangedUTC: string;
  /**
   * YYYY-MM-DD HH:MM:SS
   */
  lastHeartbeatUTC: string;
  /**
   * 0 - Windows
   * 1 - Linux
   */
  boxType: number;
};
