import { Divider, Space, Typography } from "antd";
import type { ColumnType } from "antd/es/table";

import type { AlarmLevel, DeviceEvent } from "../../types/device-event";
import { getFormattedDateTime } from "../../utils/get-formatted-date-time";
import { AlarmLevelTag } from "../alarm-level-tag";

const { Link } = Typography;

type ColumnParams = {
  onProcess: (event: DeviceEvent) => void;
  onDelete:(event: DeviceEvent)=>void;
};

export const generateColumns = ({
  onProcess,
  onDelete
}: ColumnParams): ColumnType<DeviceEvent>[] => [
  {
    title: "Name",
    dataIndex: ["site", "name"],
    width: 130,
  },
  {
    title: "Id",
    width: 240,
    dataIndex: ["site", "id"],
  },
  {
    title: "Status",
    width: 240,
    dataIndex: "status",
  },
  {
    title: "Box Type",
    width: 192,
    dataIndex: "boxType",
  },
  {
    title: "Actions",
    dataIndex: "",
    width: 192,
    fixed: "right",
    render(_, event) {
      return (
        <Space size={2} split={<Divider type="vertical" />}>
          <Link onClick={() => onProcess(event)}>Edit</Link>
          <Link onClick={() => onDelete(event)}>Delete</Link>
          <Link onClick={() => onProcess(event)}>Download</Link>
        </Space>
      );
    },
  },
];
