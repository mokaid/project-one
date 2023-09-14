import type { FC } from "react";
import { Col, Row } from "antd";

import { AlertsByPriopity } from "../../widgets/alerts-by-priority";
import { AlertsByType } from "../../widgets/alerts-by-type";
import { AlertsByVendor } from "../../widgets/alerts-by-vendor";
import { AlertsMap } from "../../widgets/alerts-map";
import { TopAlertsBySite } from "../../widgets/top-alerts-by-site";

import styles from "./index.module.css";

export const Dashboard: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AlertsMap dataTestId="alerts-map" />
      </Col>

      <Col span={6}>
        <AlertsByType
          title="All Weekly Alerts"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="all-weekly-alerts"
        />
      </Col>
      <Col span={6}>
        <AlertsByPriopity
          title="Weekly Alerts by Priority"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-priority-alerts-chart"
        />
      </Col>
      <Col span={6}>
        <AlertsByVendor
          title="Weekly Alerts by Vendor"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-alerts-by-vendor"
        />
      </Col>
      <Col span={6}>
        <TopAlertsBySite
          title="Top 10 Weekly Alerts by Site"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="top-10-alerts-by-site-chart"
        />
      </Col>

      <Col span={24}>Tabs and table</Col>
    </Row>
  );
};
