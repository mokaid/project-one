import type { FC } from "react";
import { Col, Row, Tabs, type TabsProps } from "antd";

import { Breadcrumbs } from "../../breadcrumbs";
import { AlarmRecordGrid } from "../../components/alarm-record-grid";

const items: TabsProps["items"] = [
  {
    key: "grid",
    label: "Grid",
    children: <AlarmRecordGrid />,
  },
  {
    key: "chart",
    label: "Chart",
    children: "Content of Tab Pane 2",
  },
];

export const AlarmRecord: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Breadcrumbs />
      </Col>

      <Col span={24}>
        <Tabs type="card" items={items} />
      </Col>
    </Row>
  );
};
