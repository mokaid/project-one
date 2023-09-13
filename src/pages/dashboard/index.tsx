import type { FC } from "react";
import { Col, Row } from "antd";

import { Widget } from "../../components/widget";
import { AlertsByType } from "../../widgets/alerts-by-type";
import { AlertsByVendor } from "../../widgets/alerts-by-vendor";
import { AlertsMap } from "../../widgets/alerts-map";

import styles from "./index.module.css";

export const Dashboard: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AlertsMap dataTestId="alerts-map" />
      </Col>

      <Col span={6}>
        <AlertsByType
          title="This Week Alerts"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="weekly-alerts"
        />
      </Col>
      <Col span={6}>
        <Widget className={styles.widget} title="Weekly Alert by Priority">
          Weekly Alert by Priority
        </Widget>
      </Col>
      <Col span={6}>
        <AlertsByVendor
          title="Weekly Alerts by Vendor"
          tooltipText="TODO: Add tooltip text"
          className={styles.widget}
          dataTestId="alerts-by-vendor"
        />
      </Col>
      <Col span={6}>
        <Widget className={styles.widget} title="Weekly Alerts by Sites">
          Weekly Alerts by Sites
        </Widget>
      </Col>

      <Col span={24}>Tabs and table</Col>
    </Row>
  );
};
