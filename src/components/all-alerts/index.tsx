import { type FC, useState, useEffect, useMemo, useContext } from "react";

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
  setTotalAlertsGlobal,
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
  getTotalAlerts,
} from "../../store/selectors/events";
import { ThemeContext } from "../../theme";

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
  const [handleProcessEvents, {}] = useProcessEventMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [filter, setFilter] = useState<string | "">(""); //search handler state
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
  const { appTheme } = useContext(ThemeContext);
  const darkTheme = appTheme === "dark";
  const [itemLevels, setItemLevels] = useState<any[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const events = useAppSelector(getEvents);
  const storePageSize = useAppSelector(getGlobalPageSize);
  const selectedIds = useAppSelector(getSelectedRowIds);
  const total = useAppSelector(getTotalAlerts);

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
      itemLevels: itemLevels,
      keyword: filter,
      orderBy: 1,
      pageIndex: pageIndex,
    };
    setTotalAlerts(total);
    let pageSizeChange = false;

    if (storePageSize !== pageSize || render) {
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
        if (data?.error) {
          messageApi.open({
            type: "error",
            content: "Request Timeout",
          });
        }
        dispatch(
          setEvents({
            pageIndex: pageIndex,
            data: data.data.data.event,
          }),
        );
        dispatch(setGlobalPageSize(pageSize));
        dispatch(setTotalAlertsGlobal(data.data.data.totalCount));
        setRender(false);
      }
    })();
  }, [
    pageIndex,
    pageSize,
    filter,
    render,
    total,
    itemLevels,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    if (selectedIds.length !== 0) {
      setClearAll(true);
    } else {
      setClearAll(false);
    }
  }, [selectedIds]);

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

  const handlePageFilterDate = (
    startD: string,
    endD: string,
    data: number[],
  ) => {
    setRender(true);
    console.log("data in filter", data);
    if (startD !== undefined) {
      setStartDate(startD);
    }
    if (endD !== undefined) {
      setEndDate(endD);
    }
    if (data.length !== 0 && data !== undefined) {
      const finalResult = {
        ...itemLevels,
        ...data,
      };
      const FilteredData = finalResult;
      const allSelectedItems = [].concat(...Object.values(FilteredData));
      setItemLevels(allSelectedItems);
      console.log("allSelectedItems", allSelectedItems);
    } else {
      setItemLevels([]);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPageIndex(page);
    setPageSize(pageSize);
  };
  const handleChange = (e: any) => {
    setRender(true);
    if (
      e.target.value !== null ||
      e.target.value !== undefined ||
      e.target.value !== ""
    ) {
      setFilter(e.target.value);
    } else {
      setFilter("");
    }
  };
  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  const ClearAllEvents = async () => {
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
                    className={`${
                      darkTheme ? "search_input" : "search_input_light"
                    }`}
                  />
                </Item>
              </Form>

              <Button
                className={`filter_btn ${darkTheme ? "filter_btn_bg":""}`}
                icon={<FilterOutlined />}
                onClick={handleFilterClick}
              >
                Filter
              </Button>
              <Button
                className={`filter_btn ${darkTheme ? "filter_btn_bg":""}`}

                
                icon={<CheckCircleOutlined />}
                disabled={!clearAll || isLoading}
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
            className={`${darkTheme ? "alerts_table" :"" }`}

            // data={AllEventsData}
          />
        </Col>
      </Row>

      <AlertsSearchFilterDrawer
        dataTestId="all-alerts-search-filter"
        handlePageFilterDate={handlePageFilterDate}
      />
    </>
  );
};
