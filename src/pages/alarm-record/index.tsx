import { type FC, useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState("grid");

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
  };
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Breadcrumbs />
      </Col>

      <Col span={24}>
        <Tabs
          type="card"
          className="tabs"
          items={items}
          activeKey={selectedTab}
          onChange={handleTabChange}
          tabBarExtraContent={
            selectedTab === "chart"
              ? {
                  right: (
                    <Button className="filter_btn" icon={<FilterOutlined />}>
                      Filter
                    </Button>
                  ),
                }
              : null
          }
        />
      </Col>
    </Row>
  );
};
