import { Typography } from "antd";
import type { ColumnType } from "antd/es/table";

import type { AlarmLevel, DeviceEvent } from "../../types/device-event";
import { getFormattedDateTime } from "../../utils/get-formatted-date-time";
import { AlarmLevelTag } from "../alarm-level-tag";

const { Link } = Typography;

type ColumnParams = {
  onProcess: (event: DeviceEvent) => void;
};

export const generateColumns = ({
  onProcess,
}: ColumnParams): ColumnType<DeviceEvent>[] => [
  {
    title: "Priority",
    dataIndex: "level",
    width: 100,
    render: (level: AlarmLevel) => <AlarmLevelTag level={level} />,
  },
  {
    title: "Site",
    dataIndex: ["site", "name"],
  },
  {
    title: "Time",
    dataIndex: "timeEvent",
    sorter: true,
    width: 192,
    render: (date: string) => getFormattedDateTime(date),
  },
  {
    title: "Vendor",
    dataIndex: "vendor",
  },
  {
    title: "Object",
    dataIndex: ["obj", "name"],
  },
  {
    title: "Type",
    dataIndex: ["obj", "key"],
  },
  {
    title: "Value",
    dataIndex: ["obj", "value"],
  },
  {
    title: "Actions",
    dataIndex: "eventId",
    sorter: false,
    width: 85,
    fixed: "right",
    render(_, event) {
      return <Link onClick={() => onProcess(event)}>Process</Link>;
    },
  },
];
