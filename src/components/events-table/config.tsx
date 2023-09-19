import { Divider, Space, Typography } from "antd";
import type { ColumnType } from "antd/es/table";

import type { AlarmLevel, DeviceEvent } from "../../types/device-event";
import { getFormattedDateTime } from "../../utils/get-formatted-date-time";
import { AlertPriorityTag } from "../alert-priority-tag";

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
    dataIndex: "priority",
    width: 100,
    render: (level: AlarmLevel) => <AlertPriorityTag level={level} />,
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
    dataIndex: "id",
    sorter: false,
    width: 140,
    fixed: "right",
    render(_, event) {
      return (
        <Space size={2} split={<Divider type="vertical" />}>
          <Link onClick={onMark}>Mark</Link>
          <Link onClick={() => onProcess(event)}>Process</Link>
        </Space>
      );
    },
  },
];
