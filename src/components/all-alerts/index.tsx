import { type FC, useState, useEffect, useMemo } from "react";

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

import { useGetAllEventsMutation } from "../../services";
import debouce from "lodash.debounce";

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
  const [filter, setFilter] = useState<string | "">("");
  const [getAllEvents, { isLoading }] = useGetAllEventsMutation();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Start with a page size of 10
  const [totalAlerts, setTotalAlerts] = useState(0); // Start with a page size of 10

  useEffect(() => {
    const body = {
      pageSize,
      startTime: "",
      endTime: "",
      startNum: (pageIndex - 1) * pageSize,
      processed: -1,
      sites: [],
      vendors: [],
      itemKeys: [],
      itemLevels: [],
      keyword: filter,
      orderBy: 1,
      pageIndex: pageIndex,
    };
    (async () => {
      const data = await getAllEvents(body);
      console.log("getAllEvents", data);
      setSearchData(data.data.data.event);
      setTotalAlerts(data.data.data.totalCount);
    })();
  }, [pageIndex, pageSize, filter]);

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

  const filteredData = () => {
    return searchData;
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setPageIndex(page);
    setPageSize(pageSize);
    console.log("page", page, pageSize);
  };
  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };
  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <header className={styles.header}>
            <Title level={4}>All Alerts — {totalAlerts}</Title>

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
                    onChange={debouncedResults}
                    className="search_input"
                   
                  />
                </Item>
              </Form>

              <Button className="filter_btn" icon={<FilterOutlined />} onClick={handleFilterClick}>
                Filter
              </Button>
              <Button className="filter_btn" style={{background:"#1B3687 !important"}} icon={<CheckCircleOutlined />} disabled={true}>
                Mark All
              </Button>
            </Space>
          </header>
        </Col>

        <Col span={24}>
          <AllAlertsTable
            dataTestId="all-alerts-table"
            data={filteredData}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalAlerts={totalAlerts}
            handlePageChange={handlePageChange}
            isLoading={isLoading}
            className={"alerts_table"}
          />
        </Col>
      </Row>

      <AlertsSearchFilterDrawer dataTestId="all-alerts-search-filter" />
    </>
  );
};
