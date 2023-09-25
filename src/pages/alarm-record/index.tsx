import type { FC } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tabs, type TabsProps } from "antd";

import { Breadcrumbs } from "../../breadcrumbs";
import { AlarmRecordCharts } from "../../components/alarm-record-charts";
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
    children: <AlarmRecordCharts />,
  },
];

export const AlarmRecord: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Breadcrumbs />
      </Col>

      <Col span={24}>
        <Tabs
          type="card"
          items={items}
          tabBarExtraContent={{
            right: <Button icon={<FilterOutlined />}>Filter</Button>,
          }}
        />
      </Col>
    </Row>
  );
};
