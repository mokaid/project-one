import type { FC } from "react";
import { Col, Row } from "antd";

import { AlarmRecordGridSearch } from "../alarm-record-grid-search";
import { AlarmRecordTable } from "../alarm-record-table";

export const AlarmRecordGrid: FC = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <AlarmRecordGridSearch />
      </Col>
      <Col span={24}>
        <AlarmRecordTable className={"alerts_table"} />
      </Col>
    </Row>
  );
};
