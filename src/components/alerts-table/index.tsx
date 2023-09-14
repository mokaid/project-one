import { type FC } from "react";
import { Table, TableProps } from "antd";

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

export const AlertsTable: FC<Props> = ({ className, dataTestId }) => {
  const columns = generateColumns({ onAcknowledge() {}, onMark() {} });

  return (
    <Table
      className={className}
      scroll={{ x: 1200 }}
      dataSource={data}
      sticky={true}
      columns={columns}
      rowSelection={rowSelection}
      showSorterTooltip={false}
      rowKey="id"
      pagination={{ showQuickJumper: true, showSizeChanger: true }}
      data-testid={dataTestId}
    />
  );
};
