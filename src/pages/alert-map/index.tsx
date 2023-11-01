import { Col, Row, type TabsProps } from "antd";
import type { FC } from "react";

import { Breadcrumbs } from "../../breadcrumbs";
import { AlarmRecordCharts } from "../../components/alarm-record-charts";
import { AlarmRecordGrid } from "../../components/alarm-record-grid";
import { AllAlertsMap } from "../../components/all-alert-map";

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

export const AlertMap: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Breadcrumbs />
      </Col>
      <Col span={24}>
        <AllAlertsMap />
      </Col>
    </Row>
  );
};
