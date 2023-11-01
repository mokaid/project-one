import { useEffect, useMemo, useState, type FC } from "react";

import {
  CheckCircleOutlined,
  FilterOutlined,
  InfoCircleOutlined
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
import { useDispatch } from "react-redux";

import { AlertsSearchFilterDrawer } from "../../modals/alerts-search-filter-drawer";
import {
  clearAllMapAlerts,
  setAlertMapEvents,
  setAlertMapId,
  setGlobalPageSize,
  setShowEventsFilterModal,
  setShowSiteInfoModal,
  setTotalAlertsSiteGlobal
} from "../../store/slices/events";

import {
  formatDate,
  getLastWeekDate,
  getTodayDate,
} from "../../utils/general-helpers";

import styles from "./index.module.css";

import { ReqDeviceEvent } from "../../types/device-event";

import debouce from "lodash.debounce";
import { useAppSelector } from "../../hooks/use-app-selector";
import { SiteInfoModal } from "../../modals/site-info-modal";
import {
  useGetAllEventsMutation,
  useProcessEventMutation,
} from "../../services";
import {
  getAlertMapEvents,
  getAlertMapId,
  getGlobalPageSize,
  getTotalAlertsSite
} from "../../store/selectors/events";
import { AllAlertsMapTable } from "../alert-map-table";
import { useLocation } from "react-router-dom";
type Fields = {
  search: string;
};

const initialValues: Fields = {
  search: "",
};

const { Title } = Typography;
const { Item } = Form;
const { Search } = Input;

export const AllAlertsMap: FC = () => {
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
  const events = useAppSelector(getAlertMapEvents);
  const storePageSize = useAppSelector(getGlobalPageSize);
  const location=useLocation()
  const queryParams= new URLSearchParams(location.search);
  const getSiteId=queryParams.get('siteId')
  const siteId = useAppSelector(getAlertMapId)
const total=useAppSelector(getTotalAlertsSite)

  useEffect(() => {
    const body: ReqDeviceEvent = {
      pageSize,
      startTime: startDate,
      endTime: endDate,
      startNum: (pageIndex - 1) * pageSize,
      processed: -1,
      sites: [getSiteId?.toString()],
      vendors: [],
      itemKeys: [],
      itemLevels: [],
      keyword: filter,
      orderBy: 1,
      pageIndex: pageIndex,
    };
    let pageSizeChange = false;
    setTotalAlerts(total)
    dispatch(setAlertMapId(getSiteId));

    if (storePageSize !== pageSize || getSiteId !== siteId.toString() ) {
      setPageIndex(1);
      dispatch(clearAllMapAlerts());
      pageSizeChange = true;
    }
    const doExist = !pageSizeChange
      ? events.find((item) => item.pageIndex === pageIndex)
      : undefined;

    (async () => {
      if (!doExist) {
        const data = await getAllEvents(body);
        console.log("data in alerts map", data);
        dispatch(
          setAlertMapEvents({
            pageIndex: pageIndex,
            data: data.data.data.event,
          }),
        );
        dispatch(setTotalAlertsSiteGlobal(data.data.data.totalCount))
        dispatch(setGlobalPageSize(pageSize));
      }
    })();
  }, [pageIndex, pageSize, filter, startDate, endDate]);

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };
  const handleSiteInfo = () => {
    dispatch(setShowSiteInfoModal(true));
    console.log("Site info Clicked");
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
            <Space size="middle" align="center" className="alert-map-header">
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
                style={{ flex: 1 }}
              >
                <Item<Fields> name="search" noStyle={true}>
                  <Search
                    placeholder="Search..."
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
                onClick={() => ClearAllEvents()}
              >
                Clear All
              </Button>
              <Button
                className="filter_btn"
                icon={<InfoCircleOutlined />}
                onClick={() => handleSiteInfo()}
              >
                Info
              </Button>
            </Space>
          </header>
        </Col>

        <Col span={24}>
          <AllAlertsMapTable
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
      <SiteInfoModal handlePageFilter={handleSiteInfo} />
    </>
  );
};
