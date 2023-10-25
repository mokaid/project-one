import { Divider, Space, Typography } from "antd";
import type { ColumnType } from "antd/es/table";

import type { AlarmLevel, DeviceEvent } from "../../types/device-event";
import { getFormattedDateTime } from "../../utils/get-formatted-date-time";
import { AlarmLevelTag } from "../alarm-level-tag";

const { Link } = Typography;

type ColumnParams = {
  onMark: () => void;
  onProcess: (event: DeviceEvent) => void;
};

export const generateColumns = ({
  onMark,
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
    width: 250,
    //  sorter: (a, b) => parseInt(a.site.name) - parseInt(b.site.name),
   
  },
  {
    title: "Time",
    dataIndex: "timeEvent",
    width: 192,
    render: (date: string) => getFormattedDateTime(date),
    sorter: (a, b) => {
      return a.timeEvent.localeCompare(b.timeEvent);
    },
  },
  // Data Needs to be Checked
  {
    title: "System",
    dataIndex: "vendor",
    width: 144,
    sorter: (a, b) => a.vendor.length - b.vendor.length,
  },
  {
    title: "Device",
    dataIndex: ["obj", "name"],
    width: 239,
  },
  {
    title: "Event Type",
    dataIndex: ["obj", "key"],
    width: 300,
  },
  {
    title: "Event Desc",
    dataIndex: ["obj", "value"],
    width: 300,
  },
  {
    title: "Actions",
    dataIndex: "eventId",
    sorter: false,
    width: 190,
    fixed: "right",
    render(_, event) {
      return (
        <Space size={2} split={<Divider type="vertical" />}>
          <Link onClick={onMark}>Clear</Link>
          <Link onClick={() => onProcess(event)}>Acknowledge</Link>
        </Space>
      );
    },
  },
];
