import { type FC, useState, useEffect, useMemo } from "react";

import { useDispatch } from "react-redux";
import {
  CheckCircleOutlined,
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from "antd";

import { AlertsSearchFilterDrawer } from "../../modals/alerts-search-filter-drawer";
import {
  clearAllEvents,
  setEvents,
  setGlobalPageSize,
  setSelectedEventsId,
  setShowEventsFilterModal,
} from "../../store/slices/events";

import { AllAlertsTable } from "../all-alerts-table";
import {
  formatDate,
  getLastWeekDate,
  getTodayDate,
} from "../../utils/general-helpers";

import styles from "./index.module.css";

import { DeviceEvent, ReqDeviceEvent } from "../../types/device-event";

import {
  useGetAllEventsMutation,
  useProcessEventMutation,
} from "../../services";
import debouce from "lodash.debounce";
import { useAppSelector } from "../../hooks/use-app-selector";
import {
  getEvents,
  getGlobalPageSize,
  getSelectedRowIds,
} from "../../store/selectors/events";

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
  const [filter, setFilter] = useState<string | "">("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [clearAll, setClearAll] = useState<boolean>(false);
  const date = new Date();
  const [startDate, setStartDate] = useState<string>(
    formatDate(getLastWeekDate(date)),
  );
  const [endDate, setEndDate] = useState<string>(
    formatDate(getTodayDate(date)),
  );
  const events = useAppSelector(getEvents);
  const storePageSize = useAppSelector(getGlobalPageSize);
  const selectedRow = useAppSelector(getSelectedRowIds);
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
    let pageSizeChange = false;
    if (selectedRow.length > 0 && selectedRow.length === 0) {
      setClearAll(true);
    } else {
      setClearAll(false);
    }
    if (storePageSize !== pageSize) {
      setPageIndex(1);
      dispatch(clearAllEvents());
      pageSizeChange = true;
    }
    const doExist = !pageSizeChange
      ? events.find((item) => item.pageIndex === pageIndex)
      : undefined;

    (async () => {
      if (!doExist) {
        const data = await getAllEvents(body);
        dispatch(
          setEvents({
            pageIndex: pageIndex,
            data: data.data.data.event,
          }),
        );
        dispatch(setGlobalPageSize(pageSize));
        setTotalAlerts(data.data.data.totalCount);
      }
    })();
  }, [pageIndex, pageSize, filter, startDate, endDate]);

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
  const [handleProcessEvents, {}] = useProcessEventMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const ClearAllEvents = async () => {
    // setIsLoading(true);
    const event: Array<number> = selectedRow;
    const body: any = {
      event,
      processStatus: 2,
    };
    const res = await handleProcessEvents(body);
    if (res) {
      if (res.data) {
        messageApi.open({
          type: "success",
          content: "Process status updated",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Process status update failed",
        });
      }
    }
  };
  return (
    <>
      {contextHolder}
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
                disabled={clearAll}
                onClick={() => ClearAllEvents()}
              >
                Clear All
              </Button>
            </Space>
          </header>
        </Col>

        <Col span={24}>
          <AllAlertsTable
            dataTestId="all-alerts-table"
            // data={queryEventData}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalAlerts={totalAlerts}
            handlePageChange={handlePageChange}
            loading={isLoading}
            className={"alerts_table"}
          />
        </Col>
      </Row>

      <AlertsSearchFilterDrawer
        dataTestId="all-alerts-search-filter"
        handlePageFilter={handlePageFilter}
      />
    </>
  );
};
