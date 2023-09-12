import type { FC } from "react";
import { Col, Row } from "antd";

import { AlertsMap } from "../../components/alerts-map";
import { Widget } from "../../components/widget";

export const Dashboard: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AlertsMap dataTestId="alerts-map" />
      </Col>

      <Col span={6}>
        <Widget>This Week Alerts</Widget>
      </Col>
      <Col span={6}>
        <Widget>Weekly Alert by Priority</Widget>
      </Col>
      <Col span={6}>
        <Widget>Weekly Alerts by Vendor</Widget>
      </Col>
      <Col span={6}>
        <Widget>Weekly Alerts by Sites</Widget>
      </Col>

      <Col span={24}>Tabs and table</Col>
    </Row>
  );
};
