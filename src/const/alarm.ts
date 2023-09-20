export enum AlarmLevelName {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export const ALARM_LEVEL_MAP = {
  [AlarmLevelName.Low]: [0, 1],
  [AlarmLevelName.Medium]: [2, 3],
  [AlarmLevelName.High]: [4, 5],
} as const;
