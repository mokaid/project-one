import type { FC } from "react";
import { Col, Row } from "antd";

import { AlertsByMonth } from "../../widgets/alerts-by-month";
import { AlertsByPriority } from "../../widgets/alerts-by-priority";
import { AlertsByType } from "../../widgets/alerts-by-type";
import { TopAlertsBySite } from "../../widgets/top-alerts-by-site";

import styles from "./index.module.css";

export const AlarmRecordCharts: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <AlertsByType
          title="Alerts by Type"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="alerts-by-type"
        />
      </Col>
      <Col span={8}>
        <AlertsByPriority
          title="Alerts by Priority"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="alerts-by-priority"
        />
      </Col>
      <Col span={8}>
        <AlertsByMonth />
      </Col>
      <Col span={8}>Alerts by System</Col>
      <Col span={8}>
        <TopAlertsBySite
          title="Top 10 Weekly Alerts by Site"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="top-10-alerts-by-site-chart"
        />
      </Col>
      <Col span={8}>Alerts by Devices</Col>
    </Row>
  );
};
