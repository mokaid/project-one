import { type FC, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  CheckCircleOutlined,
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";

import { AlertsSearchFilterDrawer } from "../../modals/alerts-search-filter-drawer";
import { setShowEventsFilterModal } from "../../store/slices/events";
import { AllAlertsTable } from "../all-alerts-table";

import styles from "./index.module.css";

import { DeviceEvent } from "../../types/device-event";

import { Spin } from "antd";
import { useGetAllEventsMutation } from "../../services";

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
  // set Search Data and initially all Data
  const [searchData, setSearchData] = useState<DeviceEvent | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [getAllEvents, { isLoading }] = useGetAllEventsMutation();
  const [pageIndex, setPageIndex] = useState(1); // You can set it to your desired initial value



  const body = {
    // pageSize: 100,
    startTime:"",
    endTime:"",
    startNum:0,
    processed:-1,
    sites:[],
    vendors:[],
    itemKeys:[],
    itemLevels:[],
    keyword:"",
    orderBy:1,
    pageIndex:pageIndex,
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    (async () => {
      const data = await getAllEvents(body);
      console.log("getAllEvents", data.data.data.event);
      setSearchData(data.data.data.event);
    })();
  }, []);

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

  const filteredData = () => {
    console.log("searchString", filter);
    if (filter !== "" && filter !== null) {
      return searchData.filter((event: DeviceEvent) =>
        event.vendor.includes(filter),
      );
    }
    return searchData;
  };

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <header className={styles.header}>
            <Title level={4}>
              All Alerts — {searchData ? searchData.length : "0"}
            </Title>

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
                  <Search
                    placeholder="Search"
                    allowClear={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilter(e.target.value)
                    }
                  />
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
          {/* {filteredData && (
         
          )} */}
          {filteredData() && !isLoading ? (
            <AllAlertsTable dataTestId="all-alerts-table" data={filteredData}  />
          ) : (
            <Spin indicator={antIcon} />
          )}
        </Col>
      </Row>

      <AlertsSearchFilterDrawer dataTestId="all-alerts-search-filter" />
    </>
  );
};
