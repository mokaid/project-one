import { type FC, useCallback, useState, useEffect } from "react";
import { Spin, Table, type TableProps } from "antd";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { ProcessAlarmModal } from "../../modals/process-alarm-modal";
import {
  setSelectedEvents,
  setShowProcesslarmModal,
} from "../../store/slices/events";

import { generateColumns } from "./config";
import { DeviceEvent } from "../../types/device-event";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
  className?: string;
  dataTestId?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowSelection: TableProps<any>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: unknown[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

export const AllAlertsTable: FC<Props> = ({
  className,
  dataTestId,
  data,
  pageIndex,
  pageSize,
  totalAlerts,
  handlePageChange,
  isLoading,
}: {
  data: DeviceEvent;
  pageIndex: number;
  pageSize: number;
  totalAlerts: number;
  handlePageChange: ()=> void;
  isLoading: boolean;
}) => {
  const dispatch = useAppDispatch();

  const [sourceData, setSourceData] = useState<DeviceEvent | null>(null);
  useEffect(() => {
    setSourceData(data);
  }, [data]);
  console.log("isLoading", isLoading);
  const handleProcessAlarm = useCallback(
    (selectedEvent: DeviceEvent) => {
      dispatch(setSelectedEvents([selectedEvent]));
      dispatch(setShowProcesslarmModal(true));
    },
    [dispatch],
  );

  const columns = generateColumns({
    onProcess: handleProcessAlarm,
    onMark() {},
  });
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Table
        rowKey="eventId"
        className={className}
        scroll={{ x: 1200 }}
        dataSource={sourceData}
        sticky={true}
        columns={columns}
        rowSelection={rowSelection}
        showSorterTooltip={false}
        loading={{
          indicator: <Spin indicator={antIcon}/>,
          spinning: isLoading,
        }}
        pagination={{
          pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          total: Math.ceil(totalAlerts / pageSize),
          current: pageIndex,
          onChange: handlePageChange,
        }}
        data-testid={dataTestId}
       
      />
      <ProcessAlarmModal dataTestId="process-alarm" />
    </>
  );
};
