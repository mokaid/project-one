import { type FC, useCallback, useState, useEffect } from "react";
import { Spin, Table, message, type TableProps } from "antd";

import { ProcessAlarmModal } from "../../modals/process-alarm-modal";
import {
  setSelectedEvents,
  setSelectedEventsId,
  setShowProcesslarmModal,
} from "../../store/slices/events";
import { useDispatch } from "react-redux";
import { generateColumns } from "./config";
import { DeviceEvent } from "../../types/device-event";
import { LoadingOutlined } from "@ant-design/icons";
import { useProcessEventMutation } from "../../services";
import { ReqProcessEvent } from "../../types/process-event";
import { useAppSelector } from "../../hooks/use-app-selector";
import { getEvents, getSelectedRowIds } from "../../store/selectors/events";
type Props = {
  className: string;
  dataTestId: string;
  data: DeviceEvent | null;
  pageIndex: number;
  pageSize: number;
  totalAlerts: number;
  handlePageChange: () => void;
  loading: boolean;
};

export const AllAlertsTable: FC<Props> = ({
  className,
  dataTestId,
  data,
  pageIndex,
  pageSize,
  totalAlerts,
  handlePageChange,
  loading,
}: Props) => {
  const dispatch = useDispatch();
  const event = useAppSelector(getEvents); //needs to be passed from parents
  const rowKey = useAppSelector(getSelectedRowIds);
  const [handleProcessEvents, {}] = useProcessEventMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const rowSelection: TableProps<any>["rowSelection"] = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: unknown[]) => {
  //     dispatch(setSelectedEventsId(selectedRowKeys));
  //     console.log("Selected Row Keys",selectedRowKeys)

  //   },
  //   // selectedRowKeys: rowKey,

  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   getCheckboxProps: (record: any) => ({
  //     disabled: record.name === "Disabled User", // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    dispatch(setSelectedEventsId({ selectedRowKeys, pageIndex }));
  };

  const rowSelection = {
    selectedRowKeys: rowKey,
    onChange: onSelectChange,
  };

  const handleProcessAlarm = useCallback(
    (selectedEvent: DeviceEvent) => {
      dispatch(setSelectedEvents([selectedEvent]));
      dispatch(setShowProcesslarmModal(true));
    },
    [dispatch],
  );
  const handleMark = async (selectedEvent: DeviceEvent) => {
    setIsLoading(true);
    const event: Array<number> = [];
    event.push(...event, selectedEvent.eventId);
    const body: ReqProcessEvent = {
      event,
      processStatus: 2,
    };
    const res = await handleProcessEvents(body);
    if (res) {
      setIsLoading(false);
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

  const columns = generateColumns({
    onProcess: handleProcessAlarm,
    onMark: handleMark,
  });
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      {contextHolder}
      <Table
        rowKey="eventId"
        // headerBg="#fff"
        className={className}
        scroll={{ x: 1200 }}
        dataSource={event.find((item) => item.pageIndex === pageIndex)?.data}
        // headerBg={"#0000FF"}
        sticky={true}
        columns={columns}
        rowSelection={rowSelection}
        showSorterTooltip={false}
        loading={{
          indicator: <Spin indicator={antIcon} />,
          spinning: loading || isLoading,
        }}
        pagination={{
          pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          // total: Math.ceil(totalAlerts / pageSize),
          total: totalAlerts,
          current: pageIndex,
          onChange: handlePageChange,
        }}
        data-testid={dataTestId}
        // preserveSelectedRowKeys={true}
      />

      <ProcessAlarmModal dataTestId="process-alarm" />
    </>
  );
};
