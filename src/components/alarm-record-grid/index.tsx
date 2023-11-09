import { useEffect, type FC, useState } from "react";
import { Col, Row } from "antd";
import { AlarmRecordTable } from "../alarm-record-table";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import type { SearchProps } from "antd/es/input";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useSearch } from "../../hooks/use-search";
import { AlertsSearchFilterDrawer } from "../../modals/alerts-search-filter-drawer";
import {
  clearAlarmRecordEvents,
  setAlarmRecordEvents,
  setGlobalPageSize,
  setShowEventsFilterModal,
  setTotalAlarmRecord,
} from "../../store/slices/events";

import styles from "./index.module.css";
import { useGetAllEventsMutation } from "../../services";
import { ReqDeviceEvent } from "../../types/device-event";
import {
  formatDate,
  getLastWeekDate,
  getTodayDate,
} from "../../utils/general-helpers";
import { useAppSelector } from "../../hooks/use-app-selector";
import {
  getAlarmRecordEvents,
  getGlobalPageSize,
  getSelectedRowIds,
  getTotalAlarmRecords,
} from "../../store/selectors/events";

const { Search } = Input;

export const AlarmRecordGrid: FC = () => {
  const dispatch = useAppDispatch();
  const { initialValue, onClear, onSearch } = useSearch();
  const [getAllEvents, { isLoading }] = useGetAllEventsMutation();
  const [filter, setFilter] = useState<string | "">(""); //search handler state
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
  const [itemLevels, setItemLevels] = useState<any[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const events = useAppSelector(getAlarmRecordEvents);
  const storePageSize = useAppSelector(getGlobalPageSize);
  const selectedIds = useAppSelector(getSelectedRowIds);
  const total = useAppSelector(getTotalAlarmRecords);
  const handleSearch: SearchProps["onSearch"] = (value, _event, info) => {
    if (info?.source === "clear") {
      onClear();
    } else if (info?.source === "input") {
      onSearch(value);
    }
  };

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

  useEffect(() => {
    console.log("Alarm Record Grid")
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
      dispatch(clearAlarmRecordEvents());
      pageSizeChange = true;
    }
    const doExist = !pageSizeChange
      ? events.find((item) => item.pageIndex === pageIndex)
      : undefined;

    async () => {
      if (!doExist) {
        const data = await getAllEvents(body);
        dispatch(
          setAlarmRecordEvents({
            pageIndex: pageIndex,
            data: data.data.data.event,
          }),
        );
        dispatch(setGlobalPageSize(pageSize));
        dispatch(setTotalAlarmRecord(data.data.data.totalCount));
        setRender(false)
      }
    };
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
  const handlePageChange = (page: number, pageSize: number) => {
    setPageIndex(page);
    setPageSize(pageSize);
  };
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            className={styles.container}
            data-testid="alarm-record-grid-search"
          >
            <Search
              role="search"
              size="large"
              placeholder="Enter Keyword"
              allowClear={true}
              title="Enter the keyword and press Enter"
              maxLength={255}
              onSearch={handleSearch}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              defaultValue={initialValue}
              className="search_input"
            />

            <Button
              size="large"
              className="filter_btn"
              icon={<FilterOutlined />}
              onClick={handleFilterClick}
            >
              Filter
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <AlarmRecordTable
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalAlerts={totalAlerts}
            handlePageChange={handlePageChange}
            loading={isLoading}
            className={"alerts_table"}
          />
        </Col>
      </Row>
      <AlertsSearchFilterDrawer alarmRecord={true} />
    </>
  );
};
