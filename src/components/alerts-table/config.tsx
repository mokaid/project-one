import { Divider, Space, Typography } from "antd";
import type { ColumnType } from "antd/es/table";

import { getFormattedDateTime } from "../../utils/get-formatted-date-time";
import { AlertPriorityTag } from "../alert-priority-tag";

const { Link } = Typography;

type ColumnParams = {
  onMark: () => void;
  onAcknowledge: () => void;
};

export const generateColumns = ({
  onMark,
  onAcknowledge, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: ColumnParams): ColumnType<any>[] => [
  {
    title: "Priority",
    dataIndex: "priority",
    width: 100,
    sorter: true,
    render: (level: "low" | "medium" | "high") => (
      <AlertPriorityTag level={level} />
    ),
  },
  {
    title: "Site",
    dataIndex: "site",
    sorter: true,
  },
  {
    title: "Time",
    dataIndex: "dateTime",
    sorter: true,
    width: 192,
    render: (date: string) => getFormattedDateTime(date),
  },
  {
    title: "Vendor",
    dataIndex: "vendor",
    sorter: true,
  },
  {
    title: "Object",
    dataIndex: "object",
    sorter: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: true,
  },
  {
    title: "Value",
    dataIndex: "value",
    sorter: true,
  },
  {
    title: "Actions",
    dataIndex: "id",
    sorter: false,
    width: 170,
    fixed: "right",
    render() {
      return (
        <Space size={2} split={<Divider type="vertical" />}>
          <Link onClick={onMark}>Mark</Link>
          <Link onClick={onAcknowledge}>Acknowledge</Link>
        </Space>
      );
    },
  },
];
