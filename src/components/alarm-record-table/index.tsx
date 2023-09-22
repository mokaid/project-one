import { type FC, useCallback } from "react";
import { Table } from "antd";

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

export const AlarmRecordTable: FC<Props> = ({ className, dataTestId }) => {
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
        showSorterTooltip={false}
        pagination={{ showQuickJumper: true, showSizeChanger: true }}
        data-testid={dataTestId}
      />

      <ProcessAlarmModal />
    </>
  );
};
