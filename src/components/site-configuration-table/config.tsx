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
    title: "Name",
    dataIndex: "level",
    width: 130,
    render: (level: AlarmLevel) => <AlarmLevelTag level={level} />,
  },
  {
    title: "Id",
    width: 240,
    dataIndex: ["site", "name"],
  },
  {
    title: "Status",
    width: 240,
    dataIndex: "timeEvent",
    render: (date: string) => getFormattedDateTime(date),
  },
  {
    title: "Box Type",
    width: 192,
    dataIndex: "vendor",
  },
  {
    title: "Actions",
    dataIndex: "eventId",
    width: 192,
    fixed: "right",
    render(_, event) {
      return <Link onClick={() => onProcess(event)}>Process</Link>;
    },
  },
];
