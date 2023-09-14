import type { FC } from "react";
import { Tag } from "antd";

type Props = {
  level: "low" | "medium" | "high";
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
  return (
    <Tag color={ALERT_LEVEL_COLOR_MAP[level]}>{ALERT_LABEL_MAP[level]}</Tag>
  );
};
