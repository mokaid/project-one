import { AlarmLevel } from "../types/device-event";

export function getAlarmLevelName(level: AlarmLevel) {
  switch (true) {
    case level >= 2:
      return "low" as const;
    case level >= 4:
      return "medium" as const;
    default:
      return "high" as const;
  }
}
