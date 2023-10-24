import { type FC, useCallback, useState, useEffect } from "react";
import { Table, type TableProps } from "antd";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { ProcessAlarmModal } from "../../modals/process-alarm-modal";
import {
  setSelectedEvents,
  setShowProcesslarmModal,
} from "../../store/slices/events";

import { generateColumns } from "./config";
import { DeviceEvent } from "../../types/device-event";
import { useSelector } from 'react-redux';

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
}: {
  data: DeviceEvent;
}) => {
  const dispatch = useAppDispatch();

 const state = useSelector((state:any) => state)
 console.log("state",state)
  const [sourceData, setSourceData] = useState<DeviceEvent | null>(null);
  useEffect(() => {
    setSourceData(data);
  }, [data]);

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
  const handlePageChange = (page) => {
    if (page === 10) {
      // Modify the pageSize and other parameters for the API request
    //   const modifiedBody = {
    //     ...body,
    //     pageSize: 100,
    //     pageIndex: page,
    //     // Other modifications as needed
    //   };
    //   // Make your API request with the modifiedBody
    //   // Example: makeApiRequest(modifiedBody);
    // }
    // setPageIndex(page);
  };
  // console.log("Page:",page % 5 === 0 && page % === )
}

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
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          // current: pageInde,
        onChange: handlePageChange,
        }}
        data-testid={dataTestId}
      />
      <ProcessAlarmModal dataTestId="process-alarm" />
    </>
  );
};
