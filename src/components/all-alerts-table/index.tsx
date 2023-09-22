import { type FC, useCallback } from "react";
import { Table, type TableProps } from "antd";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { ProcessAlarmModal } from "../../modals/process-alarm-modal";
import {
  setSelectedEvents,
  setShowProcesslarmModal,
} from "../../store/slices/events";
import type { DeviceEvent } from "../../types/device-event";

import { generateColumns } from "./config";
import { data } from "./mock";

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

export const AllAlertsTable: FC<Props> = ({ className, dataTestId }) => {
  const dispatch = useAppDispatch();

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

  return (
    <>
      <Table<DeviceEvent>
        rowKey="eventId"
        className={className}
        scroll={{ x: 1200 }}
        dataSource={data}
        sticky={true}
        columns={columns}
        rowSelection={rowSelection}
        showSorterTooltip={false}
        pagination={{ showQuickJumper: true, showSizeChanger: true }}
        data-testid={dataTestId}
      />
      <ProcessAlarmModal dataTestId="process-alarm" />
    </>
  );
};
