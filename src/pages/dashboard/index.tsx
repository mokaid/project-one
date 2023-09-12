import type { FC } from "react";
import { Col, Row } from "antd";

import { AlertsMap } from "../../components/alerts-map";
import { WeeklyAlerts } from "../../components/weekly-alerts";
import { Widget } from "../../components/widget";

import styles from "./index.module.css";

export const Dashboard: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AlertsMap dataTestId="alerts-map" />
      </Col>

      <Col span={6}>
        <WeeklyAlerts className={styles.widget} />
      </Col>
      <Col span={6}>
        <Widget className={styles.widget} title="Weekly Alert by Priority">
          Weekly Alert by Priority
        </Widget>
      </Col>
      <Col span={6}>
        <Widget className={styles.widget} title="Weekly Alerts by Vendor">
          Weekly Alerts by Vendor
        </Widget>
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
