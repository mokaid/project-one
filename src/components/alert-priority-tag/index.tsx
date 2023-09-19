import type { FC } from "react";
import { Tag } from "antd";

import { AlarmLevel } from "../../types/device-event";
import { getAlarmLevelName } from "../../utils/get-alarm-level-name";

type Props = {
  level: AlarmLevel;
};

const ALERT_LABEL_MAP = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const ALERT_LEVEL_COLOR_MAP = {
  low: "success",
  medium: "warning",
  high: "error",
};

export const AlertPriorityTag: FC<Props> = ({ level }) => {
  const alarmLevel = getAlarmLevelName(level);

  return (
    <Tag color={ALERT_LEVEL_COLOR_MAP[alarmLevel]}>
      {ALERT_LABEL_MAP[alarmLevel]}
    </Tag>
  );
};
