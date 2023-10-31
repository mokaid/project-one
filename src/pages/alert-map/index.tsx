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
      {/* <Col span={24}>
      <Table
        rowKey="eventId"
        // headerBg="#fff"
        className={className}
        scroll={{ x: 1200 }}
        // dataSource={event.find((item) => item.pageIndex === pageIndex)?.data}
        // headerBg={"#0000FF"}
        sticky={true}
        columns={columns}
        // rowSelection={rowSelection}
        showSorterTooltip={false}
        // loading={{
        //   indicator: <Spin indicator={antIcon} />,
        //   spinning: loading || isLoading,
        // }}
        // pagination={{
        //   pageSize,
        //   showQuickJumper: true,
        //   showSizeChanger: true,
        //   total: Math.ceil(totalAlerts / pageSize),
        //   current: pageIndex,
        //   onChange: handlePageChange,
        // }}
        // data-testid={dataTestId}
        // preserveSelectedRowKeys={true}
      />
      </Col> */}
    </Row>
  );
};
