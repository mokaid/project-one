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
import {
  formatDate,
  getLastWeekDate,
  getTodayDate,
} from "../../utils/general-helpers";

import styles from "./index.module.css";

import { DeviceEvent, ReqDeviceEvent } from "../../types/device-event";

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
  const [getAllEvents, { isLoading }] = useGetAllEventsMutation();
  const [queryEventData, setQueryEventData] = useState<DeviceEvent | null>(
    null,
  );
  const [filter, setFilter] = useState<string | "">("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const date = new Date();
  const [startDate, setStartDate] = useState<string>(
    formatDate(getLastWeekDate(date)),
  );
  const [endDate, setEndDate] = useState<string>(
    formatDate(getTodayDate(date)),
  );
  
  useEffect(() => {
    const body: ReqDeviceEvent = {
      pageSize,
      startTime: startDate,
      endTime: endDate,
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
      setQueryEventData(data.data.data.event);
      setTotalAlerts(data.data.data.totalCount);
    })();
  }, [pageIndex, pageSize, filter,startDate,endDate]);

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

 
  const handlePageFilter = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setPageIndex(page);
    setPageSize(pageSize);
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

              <Button
                className="filter_btn"
                icon={<FilterOutlined />}
                onClick={handleFilterClick}
              >
                Filter
              </Button>
              <Button
                className="filter_btn"
                style={{ background: "#1B3687 !important" }}
                icon={<CheckCircleOutlined />}
                disabled={true}
              >
                Clear All
              </Button>
            </Space>
          </header>
        </Col>

        <Col span={24}>
          <AllAlertsTable
            dataTestId="all-alerts-table"
            data={queryEventData}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalAlerts={totalAlerts}
            handlePageChange={handlePageChange}
            loading={isLoading}
            className={"alerts_table"}
          />
        </Col>
      </Row>

      <AlertsSearchFilterDrawer dataTestId="all-alerts-search-filter" handlePageFilter={handlePageFilter}  />
    </>
  );
};
