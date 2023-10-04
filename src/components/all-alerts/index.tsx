import type { FC } from "react";
import { useDispatch } from "react-redux";
import { CheckCircleOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";

import { AlertsSearchFilterDrawer } from "../../modals/alerts-search-filter-drawer";
import { setShowEventsFilterModal } from "../../store/slices/events";
import { AllAlertsTable } from "../all-alerts-table";

import styles from "./index.module.css";

type Fields = {
  search: string;
};

const initialValues: Fields = {
  search: "",
};

const { Title } = Typography;
const { Item } = Form;
const { Search } = Input;

export const AllAlerts: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<Fields>();

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <header className={styles.header}>
            <Title level={4}>All Alerts — 1173</Title>

            <Space size="middle" align="center">
              <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                name="all-alerts-search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-testid="all-alerts-search-form"
              >
                <Item<Fields> name="search" noStyle={true}>
                  <Search placeholder="Search" allowClear={true} />
                </Item>
              </Form>

              <Button icon={<FilterOutlined />} onClick={handleFilterClick}>
                Filter
              </Button>
              <Button icon={<CheckCircleOutlined />} disabled={true}>
                Mark All
              </Button>
            </Space>
          </header>
        </Col>

        <Col span={24}>
          <AllAlertsTable dataTestId="all-alerts-table" />
        </Col>
      </Row>

      <AlertsSearchFilterDrawer dataTestId="all-alerts-search-filter" />
    </>
  );
};
