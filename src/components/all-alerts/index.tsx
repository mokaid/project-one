import type { FC } from "react";
import { CheckCircleOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";

import { AlertsTable } from "../alerts-table";

import styles from "./index.module.css";

const { Title } = Typography;
const { Item } = Form;
const { Search } = Input;

export const AllAlerts: FC = () => {
  const [form] = Form.useForm();

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <header className={styles.header}>
          <Title level={4}>All Alerts — 1173</Title>

          <Space size="middle" align="center">
            <Form
              form={form}
              layout="vertical"
              name="all-alerts-search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-testid="all-alerts-search-form"
            >
              <Item name="search" noStyle={true}>
                <Search placeholder="Search" allowClear={true} />
              </Item>
            </Form>

            <Button icon={<FilterOutlined />}>Filter</Button>
            <Button icon={<CheckCircleOutlined />} disabled={true}>
              Mark All
            </Button>
          </Space>
        </header>
      </Col>

      <Col span={24}>
        <AlertsTable dataTestId="all-alerts-table" />
      </Col>
    </Row>
  );
};
